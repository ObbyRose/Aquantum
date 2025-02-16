import express from 'express';
import  protectRoute  from '../middleware/ProtectRoute.js';
import {
    signupUser,
    loginUser,
    logoutUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', protectRoute, logoutUser);

export default router;