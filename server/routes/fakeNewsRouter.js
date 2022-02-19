import express from 'express';
import { getFakeNews, likeNews, dislikeNews } from '../controllers/fakeNews.js';

const router = express.Router();

router.get('/',getFakeNews);
router.patch('/:id/likeNews', likeNews);
router.patch('/:id/dislikeNews', dislikeNews);

export default router;