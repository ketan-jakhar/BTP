import express from 'express';
import { updateProfile, getProfile, getAllUsers } from '../controllers';
import { requireUser, deserializeUser } from '../middlewares';
import { validate } from '../utils';
const router = express.Router();

router.get('/profile', deserializeUser, requireUser, getProfile);

router.put('/profile', deserializeUser, requireUser, updateProfile);

router.get('/all', deserializeUser, requireUser, getAllUsers);

export default router;
