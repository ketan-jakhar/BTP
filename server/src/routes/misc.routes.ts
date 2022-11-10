import express from 'express';
const router = express.Router();
import { requireUser, deserializeUser } from '../middlewares';

// GET /misc
router.get('/misc', requireUser, deserializeUser);

export default router;
