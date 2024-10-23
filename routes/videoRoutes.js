const express = require("express");
const {
  uploadVideo,
  getAllVideos,
  getUserVideos,
  deleteVideo,
} = require("../controllers/videoController");
const { protect, admin } = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", protect, upload.single("video"), uploadVideo); // User uploads video
router.get("/", protect, admin, getAllVideos); // Admin gets all videos
router.get("/myvideos", protect, getUserVideos); // User gets their videos
router.delete("/:id", protect, deleteVideo); // User or admin deletes video

module.exports = router;
