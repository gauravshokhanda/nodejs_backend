const express = require("express");
const router = express.Router();
const calculationController = require("../controllers/calculation.Controller");

// Routes
router.post("/add", calculationController.createCalculation);
router.get("/all", calculationController.getAllCalculations);
router.get("/:id", calculationController.getCalculationById);
router.put("/:id", calculationController.updateCalculation);
router.delete("/:id", calculationController.deleteCalculation);

module.exports = router;
