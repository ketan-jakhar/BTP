import express from 'express';
const router = express.Router();
import {
  getAllCarpools,
  getCarpoolById,
  createCarpool,
  updateCarpool,
  deleteCarpool,
  joinCarpool,
  leaveCarpool,
} from '../controllers';
import { requireUser, deserializeUser } from '../middlewares';
import { updateCarpoolSchema, createCarpoolSchema } from '../schemas';
import { validate } from '../utils';

// GET /api/carpool
router.get('/all', deserializeUser, requireUser, getAllCarpools);

// GET /api/carpool/:id
router.get('/:id', deserializeUser, requireUser, getCarpoolById);

// POST /api/carpool/create
router.post(
  '/create',
  deserializeUser,
  requireUser,
  validate(createCarpoolSchema),
  createCarpool
);

// PUT /api/carpool/:id/update
router.put(
  '/:id/update',
  deserializeUser,
  requireUser,
  validate(updateCarpoolSchema),
  updateCarpool
);

//DELETE /api/carpool/:id/delete
router.delete('/:id/delete', deserializeUser, requireUser, deleteCarpool);

// PUT /api/carpool/:id/book
router.put('/:id/book', deserializeUser, requireUser, joinCarpool);

// PUT /api/carpool/:id/leave
router.put('/:id/leave', deserializeUser, requireUser, leaveCarpool);

export default router;
