import express from 'express';
const router = express.Router();
import {
  getAllCarpools,
  getCarpoolById,
  createCarpool,
  updateCarpool,
  deleteCarpool,
} from '../controllers';
import { requireUser, deserializeUser } from '../middlewares';

// GET /carpool
router.get('/all', deserializeUser, requireUser, getAllCarpools);

// GET /carpool/:id
router.get('/:id', deserializeUser, requireUser, getCarpoolById);

// POST /carpool/create
router.post('/create', deserializeUser, requireUser, createCarpool);

// PUT /carpool/:id/update
router.put('/:id/update', deserializeUser, requireUser, updateCarpool);

//DELETE /carpool/:id/delete
router.delete('/:id/delete', deserializeUser, requireUser, deleteCarpool);

export default router;
