// models/2DImage.js
const mongoose = require("mongoose");

const twoDImageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    calculation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Calculation",
      required: true,
    },
    image: { type: String, required: true }, // Path to the image file
  },
  { timestamps: true }
);

module.exports = mongoose.model("2DImage", twoDImageSchema);
