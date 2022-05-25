const express = require("express");
const router = express.Router();
const shopController = require("../controller/Shop");
const { categoryBypassCheck, validateOwner } = require("../middlewares/Shop");
const { validateUser } = require("../middlewares/Auth");

// GET /shop
router.get("/", validateUser, shopController.getShop);

// GET /shop/:id
router.get("/:id", validateUser, shopController.getProduct);

// POST /shop/create
router.post(
	"/create",
	validateUser,
	categoryBypassCheck,
	shopController.makeProduct
);

// PUT /shop/:id/update
router.put(
	"/:id/update",
	validateUser,
	validateOwner,
	categoryBypassCheck,
	shopController.updateProduct
);

//DELETE /shop/:id/delete
router.delete(
	"/:id/delete",
	validateUser,
	validateOwner,
	shopController.deleteProduct
);

module.exports = router;
