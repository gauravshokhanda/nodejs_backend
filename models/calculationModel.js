const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  area: { type: Number, required: true },
  labourCharge: { type: Number, required: true },
  clubhousePercentage: { type: Number, required: true },
  gardenPercentage: { type: Number, required: true },
  swimmingPoolPercentage: { type: Number, required: true },
  carParkingPercentage: { type: Number, required: true },
  gymPercentage: { type: Number, required: true },
});

module.exports = mongoose.model("Calculation", calculationSchema);
const Calculation = require("../models/calculationModel");

// Create a new calculation entry
exports.createCalculation = async (req, res) => {
  try {
    const {
      width,
      length,
      area,
      labourCharge,
      clubhousePercentage,
      gardenPercentage,
      swimmingPoolPercentage,
      carParkingPercentage,
      gymPercentage,
    } = req.body;

    const newCalculation = new Calculation({
      width,
      length,
      area,
      labourCharge,
      clubhousePercentage,
      gardenPercentage,
      swimmingPoolPercentage,
      carParkingPercentage,
      gymPercentage,
    });

    const savedCalculation = await newCalculation.save();
    res.status(201).json(savedCalculation);
  } catch (error) {
    res.status(500).json({ error: "Error creating calculation" });
  }
};

// Get all calculations
exports.getAllCalculations = async (req, res) => {
  try {
    const calculations = await Calculation.find();
    res.status(200).json(calculations);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving calculations" });
  }
};

// Get a single calculation by ID
exports.getCalculationById = async (req, res) => {
  try {
    const calculation = await Calculation.findById(req.params.id);
    if (!calculation) {
      return res.status(404).json({ error: "Calculation not found" });
    }
    res.status(200).json(calculation);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving calculation" });
  }
};

// Update a calculation by ID
exports.updateCalculation = async (req, res) => {
  try {
    const updatedCalculation = await Calculation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCalculation) {
      return res.status(404).json({ error: "Calculation not found" });
    }
    res.status(200).json(updatedCalculation);
  } catch (error) {
    res.status(500).json({ error: "Error updating calculation" });
  }
};

// Delete a calculation by ID
exports.deleteCalculation = async (req, res) => {
  try {
    const deletedCalculation = await Calculation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCalculation) {
      return res.status(404).json({ error: "Calculation not found" });
    }
    res.status(200).json({ message: "Calculation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting calculation" });
    ``;
  }
};
