const mongoose = require("mongoose");

const costCalculationSchema = new mongoose.Schema({
  contractorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contractor",
    required: true,
  },
  area: { type: Number, required: true },
  unit: { type: String, enum: ["Sq. Feet", "Sq. Meter"], required: true },
  totalCost: { type: Number },
  phases: [
    {
      phaseName: { type: String, required: true },
      duration: { type: Number, required: true }, // Duration in days
      cost: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("CostCalculation", costCalculationSchema);
