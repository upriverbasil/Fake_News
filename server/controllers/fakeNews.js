import fakeNews from "../models/fakeNews.js";
import user from "../models/user.js"
import mongoose from 'mongoose';
import jsonData from "../DirtyWords.js"
export const getFakeNews = async(req,res) => {
  const { page } = req.query

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;    // starting fake news index
    const total = await fakeNews.countDocuments({});

    const news = await fakeNews.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: news, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
  
}

export const getFakeNewsItem = async(req, res) => {
  const { id } = req.params

  try {
    const news = await fakeNews.findById(id);

    res.status(200).json(news);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getFakeNewsBySearch = async(req, res) => {
  const { searchQuery, page, lang} = req.query
  
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;    // starting fake news index

    const title = new RegExp(searchQuery, 'i');
      fakeNews.distinct("language", function(error, results){
      });
      
      let total = await fakeNews.countDocuments({title});
      let news = {}
      if(lang=="null"){        
        news = await fakeNews.find( { title }).sort({_id: -1}).limit(LIMIT).skip(startIndex);
      }
      else{
        total = await fakeNews.countDocuments({ $and: [ { title }, { language:lang  }]} ) ;
        news = await fakeNews.find({ $and: [ { title }, { language:lang  } ]}).sort({_id: -1}).limit(LIMIT).skip(startIndex);     
      }
      
      res.status(200).json({ data: news, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const trending = async(req, res) => {
  try {
    const news = await fakeNews.find().sort({"upvotes":-1}).limit(5)
    res.json({ data: news });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
 
}

export const likeNews = async(req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const news = await fakeNews.findById(id);

    const index = news.upvotes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      news.upvotes.push(req.userId);
    } else {
      news.upvotes = news.upvotes.filter((id) => id !== String(req.userId));
    }
    
    const updatedNews = await fakeNews.findByIdAndUpdate(id,news, { new: true });
    
    res.status(200).json(updatedNews);
}

export const dislikeNews = async(req, res) => {
    const { id } = req.params;
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const news = await fakeNews.findById(id);

    const index = news.downvotes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      news.downvotes.push(req.userId);
    } else {
      news.downvotes = news.downvotes.filter((id) => id !== String(req.userId));
    }
    
    const updatedNews = await fakeNews.findByIdAndUpdate(id,news, { new: true });
    
    res.status(200).json(updatedNews);
}

export const commentNews = async(req, res) => {
  const { id } = req.params;
  let { value } = req.body;

  const news = await fakeNews.findById(id);
  // var json = []
  // fetch('../DirtyWords.json').then(response => json = response.json())
  for(let i=0;i<jsonData.length;i++){
    value = value.replaceAll(jsonData[i].word,"*".repeat(jsonData[i].word.length))
  }
  // if(jsonData.find(({word})=>word===value))
  news.comments.push(value);

  const updatedNews = await fakeNews.findByIdAndUpdate(id, news, { new: true});

  res.json(updatedNews);
}

export const deleteNews = async(req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No fake news with id: ${id}`);
  await fakeNews.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}


export const recommendedPosts = async(req, res) => {
  const { searchQuery,tags} = req.query

  try {
    const title = new RegExp(searchQuery, 'i');

    const news = await fakeNews.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]}).sort({_id: -1}).limit(6);

    res.json({ data: news });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}