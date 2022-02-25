import express from 'express';
import { getFakeNews, likeNews, dislikeNews } from '../controllers/fakeNews.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/',getFakeNews);
router.patch('/:id/likeNews',auth, likeNews);
router.patch('/:id/dislikeNews',auth, dislikeNews);

export default router;