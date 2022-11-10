import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers';
import { requireUser, deserializeUser } from '../middlewares';
// GET /shop
router.get('/all', getAllProducts);

// GET /shop/:id
router.get('/:id', getProductById);

// POST /shop/create
router.post('/create', createProduct);

// PUT /shop/:id/update
router.put('/:id/update', updateProduct);

//DELETE /shop/:id/delete
router.delete('/:id/delete', deleteProduct);

export default router;
