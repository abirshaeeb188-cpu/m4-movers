import express from 'express';
import { getComments, addComment } from '../controllers/comments.controller.js';
import protect from '../middleware/user-auth.js';

const router = express.Router();

router.get('/', getComments);
router.post('/', protect, addComment);

export default router;
