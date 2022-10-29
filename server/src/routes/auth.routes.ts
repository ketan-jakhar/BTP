import express from 'express';
import { getRegister, register, getLogin, login, logout } from '../controllers';
const router = express.Router();

// GET /register
router.get('/register', getRegister);

// POST /register
router.post('/register', register);

// GET /login
router.get('/login', getLogin);

// POST /login
router.post('/login', login);

// GET /logout
router.get('/logout', logout);

export default router;
