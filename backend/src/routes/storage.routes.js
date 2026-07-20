import express from 'express';
import { createStorageItem, getMyStorageItems } from '../controllers/storage.controller.js';
import protect from '../middleware/user-auth.js';

const router = express.Router();

router.post('/', protect, createStorageItem);
router.get('/my', protect, getMyStorageItems);

export default router;
