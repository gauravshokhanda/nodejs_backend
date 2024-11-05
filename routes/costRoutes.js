const express = require("express");
const router = express.Router();
const contractorController = require("../controllers/contractorController");

// Create contractor
router.post("/contractor", contractorController.createContractor);

// Get all contractors
router.get("/contractor", contractorController.getAllContractors);

// Get contractor by ID
router.get("/contractor/:id", contractorController.getContractorById);

// Update contractor
router.put("/contractor/:id", contractorController.updateContractor);

// Delete contractor
router.delete("/contractor/:id", contractorController.deleteContractor);

router.get("/contractor-costs", contractorController.getContractorsWithCost);

module.exports = router;
