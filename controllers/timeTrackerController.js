const TimeTracker = require("../models/timeTrackerModel");
const path = require("path");
const fs = require("fs");

// Start time tracking
exports.startTimeTracking = async (req, res) => {
  try {
    const timeTracker = await TimeTracker.create({
      user: req.user._id,
      startTime: new Date(),
      stopTime: null, // Will be set later
      screenshot: "",
    });

    res.status(201).json({ message: "Time tracking started", timeTracker });
  } catch (error) {
    res.status(500).json({ message: "Error starting time tracking", error });
  }
};

// Stop time tracking and upload screenshot
exports.stopTimeTracking = async (req, res) => {
  try {
    const timeTrackerId = req.params.id; // Assuming timeTracker ID is passed
    const timeTracker = await TimeTracker.findById(timeTrackerId);

    if (!timeTracker) {
      return res.status(404).json({ message: "Time tracking not found" });
    }

    // Update stop time
    timeTracker.stopTime = new Date();

    // Handle screenshot upload
    if (req.file) {
      timeTracker.screenshot = `uploads/${req.file.filename}`;
    }

    await timeTracker.save();
    res.status(200).json({
      message: "Time tracking stopped and screenshot uploaded",
      timeTracker,
    });
  } catch (error) {
    res.status(500).json({ message: "Error stopping time tracking", error });
  }
};
exports.uploadScreenshotAndTime = async (req, res) => {
  try {
    const { timeTracked } = req.body;

    // Store time-tracking data and screenshot (path)
    const newRecord = new TimeTracker({
      user: req.user._id,
      timeTracked: JSON.parse(timeTracked),
      screenshot: req.file.path, // Assuming you're using Multer for file uploads
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Error uploading time data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
