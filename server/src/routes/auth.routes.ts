import express from 'express';
import {
  getRegisterHandler,
  registerHandler,
  getLoginHandler,
  loginHandler,
  logoutHandler,
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
// GET /api/auth/register
router.get('/register', getRegisterHandler);

// POST Register user
// POST /api/auth/register
router.post('/register', validate(createUserSchema), registerHandler);

// GET Login user
// GET /api/auth/login
router.get('/login', getLoginHandler);

// POST Login user
// POST /api/auth/login
router.post('/login', validate(loginUserSchema), loginHandler);

// GET Logout user
// GET /api/auth/logout
router.get('/logout', deserializeUser, requireUser, logoutHandler);

// GET Refresh access token
// GET /api/auth/refresh
router.get('/refresh', refreshAccessTokenHandler);

// TODO: Add validate(forgotPasswordSchema)
// GET Change password
// GET /api/auth/change-password
router.get('/change-password', verifyTokenUrl, getForgotPasswordHandler);

// POST Forgot password (Send Email for Verification)
// POST /api/auth/forgot-password
router.post(
  '/forgot-password',

  validate(forgotPasswordSchema),
  forgotPasswordHandler
);

export default router;
