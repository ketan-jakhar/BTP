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
import { createProductSchema, updateProductSchema } from '../schemas';
import { validate } from '../utils';

router.use(deserializeUser, requireUser);

// GET /shop
router.get('/all', deserializeUser, requireUser, getAllProducts);

// GET /shop/:id
router.get('/:id', deserializeUser, requireUser, getProductById);

// POST /shop/create
router.post(
  '/create',
  deserializeUser,
  requireUser,
  validate(createProductSchema),
  createProduct
);

// PUT /shop/:id/update
router.put(
  '/:id/update',
  deserializeUser,
  requireUser,
  // validate(updateProductSchema),
  updateProduct
);

//DELETE /shop/:id/delete
router.delete('/:id/delete', deserializeUser, requireUser, deleteProduct);

// GET /shop/cart
router.get(':id/cart', deserializeUser, requireUser, getCart);

// POST /shop/:id/add-to-cart
router.post('/:id/add-to-cart', deserializeUser, requireUser, addToCart);

// DELETE /shop/:id/remove-from-cart
router.delete(
  '/:id/remove-from-cart',
  deserializeUser,
  requireUser,
  removeFromCart
);

// POST /shop/buy
router.get(':id/buy', deserializeUser, requireUser, buyProduct);

export default router;
