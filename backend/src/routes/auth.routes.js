import express from 'express';
import { register, login, getMe, updateAvatar } from '../controllers/auth.controller.js';
import protect from '../middleware/user-auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/avatar', protect, updateAvatar);

export default router;
