const express = require("express");
const router = express.Router();
const carPoolController = require("../controller/CarPool");

const { validateUser } = require("../middlewares/Auth");
const { validateOwner } = require("../middlewares/CarPool");

// GET /carpool
router.get("/", validateUser, carPoolController.getCarPool);

// GET /carpool/:id
router.get("/:id", validateUser, carPoolController.getCabInfo);

// POST /carpool/create
router.post("/create", validateUser, carPoolController.createCarPool);

// PUT /carpool/:id/update
router.put(
	"/:id/update",
	validateUser,
	validateOwner,
	carPoolController.updateCarPool
);

//DELETE /carpool/:id/delete
router.delete(
	"/:id/delete",
	validateUser,
	validateOwner,
	carPoolController.deleteCarPool
);

module.exports = router;
