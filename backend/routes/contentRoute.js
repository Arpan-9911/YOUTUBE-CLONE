import express from 'express'
import { uploadContent, getMyContents, deleteContent, getAllContents, viewVideo, likeVideo, watchLater, deleteHistory, addComment } from '../controllers/contentController.js';
import auth from '../middlewares/auth.js'

const router = express.Router();

router.post('/create', auth, uploadContent);
router.get('/my-contents', auth, getMyContents);
router.delete('/delete/:id', auth, deleteContent);
router.get('/all-contents', auth, getAllContents);
router.put('/watch/:id', auth, viewVideo);
router.put('/like/:id', auth, likeVideo);
router.put('/watch-later/:id', auth, watchLater);
router.delete('/delete-history/:id', auth, deleteHistory);
router.put('/comment/:id', auth, addComment);

export default router