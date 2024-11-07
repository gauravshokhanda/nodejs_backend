// models/Property.js
const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    area: { type: String, required: true },
    thumbnail: { type: String }, // Path to the uploaded image file
}, { timestamps: true });

module.exports = mongoose.model("Property", PropertySchema);
