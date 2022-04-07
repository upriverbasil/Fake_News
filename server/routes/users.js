import express from 'express';
import {signin,signup,adminStatus,newadmin} from '../controllers/user.js';

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.get('/adminStatus',adminStatus);
router.post('/new-admin',newadmin);
export default router;