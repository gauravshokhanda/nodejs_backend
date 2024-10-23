const Video = require("../models/videoModel");

// POST /api/videos/upload - Upload video and store metadata
exports.uploadVideo = async (req, res) => {
  try {
    const { originalname, path } = req.file;

    const video = new Video({
      title: originalname,
      filePath: path,
      user: req.user._id, // Associate video with the user
    });

    await video.save();

    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/videos - Get all videos (Admin only)
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("user", "name email");
    res.status(200).json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/videos/myvideos - Get logged-in user's videos
exports.getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user._id });
    res.status(200).json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/videos/:id - Delete video (Only the uploader or admin can delete)
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Only the user who uploaded the video or an admin can delete it
    if (
      video.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await video.remove();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
