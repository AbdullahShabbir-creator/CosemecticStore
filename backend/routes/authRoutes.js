import express from 'express';
import { login, signup, getUserProfile, updateUserProfile, setUserAsAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/set-admin', setUserAsAdmin); // Direct admin access route

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
