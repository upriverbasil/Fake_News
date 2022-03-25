import fakeNews from "../models/fakeNews.js";
import mongoose from 'mongoose';

export const getFakeNews = async(req,res) => {
  const { page } = req.query

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;    // starting fake news index
    const total = await fakeNews.countDocuments({});

    const news = await fakeNews.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: news, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json(FakeNews)
  }
}

export const getFakeNewsBySearch = async(req, res) => {
  const { searchQuery } = req.query

  try {
    const title = new RegExp(searchQuery, 'i');

    const news = await fakeNews.find({ title }).sort({_id: -1});

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