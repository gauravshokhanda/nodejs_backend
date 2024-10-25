const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
