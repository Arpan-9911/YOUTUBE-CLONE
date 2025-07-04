import express from 'express'
import { signUp, login, googleLogin, currentUser, createChannel } from '../controllers/userController.js'
import auth from '../middlewares/auth.js'

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.get('/current-user', auth, currentUser);
router.put('/create-channel', auth, createChannel);

export default router