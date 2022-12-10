import express from 'express';

import { requireUser, deserializeUser } from '../middlewares';

const router = express.Router();

router.use(deserializeUser, requireUser);

export default router;
