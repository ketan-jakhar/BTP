import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addToCart,
  removeFromCart,
  getCart,
  buyProduct,
} from '../controllers';
import { requireUser, deserializeUser } from '../middlewares';

// router.use(deserializeUser, requireUser);

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

// POST /shop/:id/add-to-cart
router.post('/:id/add-to-cart', addToCart);

// DELETE /shop/:id/remove-from-cart
router.delete('/:id/remove-from-cart', removeFromCart);

// GET /shop/cart
router.get(':id/cart', getCart);

// POST /shop/buy
router.get(':id/buy', buyProduct);

export default router;
