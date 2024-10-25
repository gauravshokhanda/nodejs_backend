// routes/twoDImageRoutes.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const twoDImageController = require("../controllers/twoDimageController");

// Image upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), twoDImageController.addTwoDImage);
router.get("/", twoDImageController.getAllTwoDImages);
router.get("/:id", twoDImageController.getTwoDImageById);
router.put("/:id", upload.single("image"), twoDImageController.updateTwoDImage);
router.delete("/:id", twoDImageController.deleteTwoDImage);

module.exports = router;
