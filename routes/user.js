const express = require("express");
const router = express.Router();
const userController = require("../controller/User");
const { validateUser } = require("../middlewares/Auth");

// GET /user/:id
router.get("/:id", validateUser, userController.getProfile);

// PUT /profile/:id/update
router.put("/:id/update", validateUser, userController.updateProfile);

//DELETE /user/:id/delete
router.delete("/:id/delete", validateUser, userController.deleteProfile);

module.exports = router;
