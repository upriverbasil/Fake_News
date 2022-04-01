import express from 'express';
import { getFakeNewsBySearch, getFakeNewsItem, getFakeNews, likeNews, dislikeNews, trending } from '../controllers/fakeNews.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getFakeNewsBySearch);
router.get('/', getFakeNews);
router.get('/:id', getFakeNewsItem);
router.patch('/:id/likeNews', auth, likeNews);
router.patch('/:id/dislikeNews', auth, dislikeNews);
router.get('/trending',trending)
export default router;