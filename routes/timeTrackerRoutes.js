const express = require("express");
const router = express.Router();
const {
  startTimeTracking,
  stopTimeTracking,
  uploadScreenshotAndTime,
} = require("../controllers/timeTrackerController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

// Setup multer for screenshot uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Start time tracking (authenticated users)
router.post("/start", authMiddleware.protect, startTimeTracking);
router.post("/stop", authMiddleware.protect, uploadScreenshotAndTime);

// Stop time tracking and upload screenshot
router.post(
  "/stop/:id",
  authMiddleware.protect,
  upload.single("screenshot"),
  stopTimeTracking
);

module.exports = router;
