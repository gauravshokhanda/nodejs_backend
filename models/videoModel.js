const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  filePath: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link video to the user
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", videoSchema);
