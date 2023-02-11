import express from 'express';

import { requireUser, deserializeUser, requireAdmin } from '../middlewares';
import { getAllUsers } from '../controllers';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/all', deserializeUser, requireUser, requireAdmin, getAllUsers);

export default router;
