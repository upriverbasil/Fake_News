import fakeNews from "../models/fakeNews.js";
import mongoose from 'mongoose';

export const getFakeNews = async(req,res) => {
    try {
        const FakeNews = await fakeNews.find().sort({_id:1}).limit(100);
        // const FakeNews = await fakeNews.find().sort((a, b) => new moment(a.publishDate, "DD-MM-YYYY HH:mm:ss") - new moment(b.publishDate, "DD-MM-YYYY HH:mm:ss")).limit(100);

        res.status(200).json(FakeNews)
    } catch (error) {
        res.status(404).json(FakeNews)
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