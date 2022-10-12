const express = require("express");
const router = express.Router();
const userController = require("../controller/User");
const { validateUser } = require("../middlewares/Auth");
const { validateOwner } = require("../middlewares/User");

// GET /profile/:id
router.get("/:id", validateUser, validateOwner, userController.getProfile);

// // PUT /profile/:id/update
// router.put("/:id/update", validateUser, userController.updateProfile);

// //DELETE /profile/:id/delete
// router.delete(
// 	"/:id/delete",
// 	validateUser,
// 	validateOwner,
// 	userController.deleteProfile
// );

module.exports = router;
