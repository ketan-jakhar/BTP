import express from 'express';
const router = express.Router();
import { requireUser, deserializeUser } from '../middlewares';

// GET /recycle/all
router.get('/all', requireUser, deserializeUser);

export default router;
