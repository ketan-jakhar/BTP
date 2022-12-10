import express from 'express';
import { updateProfile, getProfile, getAllUsers } from '../controllers';
import { requireUser, deserializeUser } from '../middlewares';
import { updateUserSchema } from '../schemas';
import { validate } from '../utils';
const router = express.Router();
router.use(deserializeUser, requireUser);

// GET /api/user/profile (self profile)
router.get('/profile', deserializeUser, requireUser, getProfile);

// PUT /api/user/profile/update (update self profile)
router.put(
  '/profile/update',
  deserializeUser,
  requireUser,
  // validate(updateUserSchema),
  updateProfile
);

// GET /api/user/all (get all users)
router.get('/all', deserializeUser, requireUser, getAllUsers);

export default router;
