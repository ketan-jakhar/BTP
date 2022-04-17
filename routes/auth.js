const express = require("express");
const router = express.Router();
const authController = require("../controller/Auth");
const { validateEmail, validateRegister } = require("../middlewares/Auth");

// GET /register
router.get(
	"/register",

	authController.getRegister
);

// POST /register
router.post(
	"/register",
	validateEmail,
	validateRegister,
	authController.register
);

// GET /login
router.get("/login", authController.getLogin);

// POST /login
router.post("/login", validateEmail, authController.login);

// GET /logout
router.get("/logout", authController.logout);

module.exports = router;
