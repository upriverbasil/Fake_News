import fakeNews from "../models/fakeNews.js";
import mongoose from 'mongoose';

export const getFakeNews = async(req,res) => {
    try {
        const FakeNews = await fakeNews.find().sort({_id:1}).limit(100);
        
        res.status(200).json(FakeNews)
    } catch (error) {
        res.status(404).json(FakeNews)
    }
}

export const likeNews = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const news = await fakeNews.findById(id);

    const updatedNews = await fakeNews.findByIdAndUpdate(id, { upvoteCount: news.upvoteCount + 1 }, { new: true });
    
    res.json(updatedNews);
}

export const dislikeNews = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const news = await fakeNews.findById(id);

    const updatedNews = await fakeNews.findByIdAndUpdate(id, { downvoteCount: news.downvoteCount + 1 }, { new: true });
    
    res.json(updatedNews);
}