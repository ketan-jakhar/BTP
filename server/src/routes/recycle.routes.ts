import express from 'express';
import {
  createRecycleHandler,
  deleteRecycleHandler,
  getAllRecycleHandler,
  getOneRecycleHandler,
  updateRecycleHandler,
} from '../controllers';
const router = express.Router();
import { requireUser, deserializeUser } from '../middlewares';
import { createRecycleSchema, updateRecycleSchema } from '../schemas';
import { validate } from '../utils';

// GET api/recycle/all
router.get('/all', requireUser, deserializeUser, getAllRecycleHandler);

// GET api/recycle/:id
router.get('/:id', requireUser, deserializeUser, getOneRecycleHandler);

// POST api/recycle/create
router.post(
  '/create',
  requireUser,
  deserializeUser,
  validate(createRecycleSchema),
  createRecycleHandler
);

// PUT api/recycle/:id/update
router.put(
  '/:id/update',
  requireUser,
  deserializeUser,
  // validate(updateRecycleSchema),
  updateRecycleHandler
);

// DELETE api/recycle/:id/delete
router.delete(
  '/:id/delete',
  requireUser,
  deserializeUser,
  deleteRecycleHandler
);

export default router;
