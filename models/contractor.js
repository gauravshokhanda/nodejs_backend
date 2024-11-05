const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    laborChargePerSqFt: { type: Number, required: true },
    singleStoryCharge: { type: Number, required: true },
    twoStoryCharge: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    profile: { type: String },
    companyName: { type: String, required: true },
    rates: {
      homeDesignApproval: { type: Number, required: true },
      excavation: { type: Number, required: true },
      footingFoundation: { type: Number, required: true },
      RCCWork: { type: Number, required: true },
      roofSlab: { type: Number, required: true },
      brickworkPlastering: { type: Number, required: true },
      flooringTiling: { type: Number, required: true },
      electricWiring: { type: Number, required: true },
      waterSupplyPlumbing: { type: Number, required: true },
      door: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contractor", contractorSchema);
