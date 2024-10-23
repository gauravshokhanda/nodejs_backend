const mongoose = require("mongoose");

const timeTrackerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    timeTracked: {
      hours: { type: Number, required: true },
      minutes: { type: Number, required: true },
      seconds: { type: Number, required: true },
    },
    screenshot: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TimeTracker = mongoose.model("TimeTracker", timeTrackerSchema);

module.exports = TimeTracker;
