import express from 'express';
import {
  getRegister,
  register,
  getLogin,
  login,
  logout,
  refreshAccessTokenHandler,
  getForgotPasswordHandler,
  forgotPasswordHandler,
} from '../controllers';
import { requireUser, deserializeUser, verifyTokenUrl } from '../middlewares';
import {
  forgotPasswordSchema,
  loginUserSchema,
  createUserSchema,
} from '../schemas';
import { validate } from '../utils';
const router = express.Router();

// GET Register user
router.get('/register', getRegister);

// POST Register user
router.post('/register', validate(createUserSchema), register);

// GET Login user
router.get('/login', getLogin);

// POST Login user
router.post('/login', validate(loginUserSchema), login);

// GET Logout user
router.get('/logout', deserializeUser, requireUser, logout);

// GET Refresh access token
router.get('/refresh', refreshAccessTokenHandler);

// TODO: Add validate(forgotPasswordSchema)
// GET Change password
router.get('/change-password', verifyTokenUrl, getForgotPasswordHandler);

// POST Forgot password (Send Email for Verification)
router.post(
  '/forgot-password',
  deserializeUser,
  requireUser,
  validate(forgotPasswordSchema),
  forgotPasswordHandler
);

export default router;
