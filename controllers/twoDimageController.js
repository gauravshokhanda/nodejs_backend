// controllers/twoDImageController.js
const TwoDImage = require("../models/twoDimageModel");

// Add new 2D Image
exports.addTwoDImage = async (req, res) => {
  try {
    const { name, calculation } = req.body;
    const image = req.file ? req.file.path : null;
    const newImage = await TwoDImage.create({ name, calculation, image });
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View all 2D Images
exports.getAllTwoDImages = async (req, res) => {
  try {
    const images = await TwoDImage.find().populate("calculation");
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View single 2D Image
exports.getTwoDImageById = async (req, res) => {
  try {
    const image = await TwoDImage.findById(req.params.id).populate(
      "calculation"
    );
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update 2D Image
exports.updateTwoDImage = async (req, res) => {
  try {
    const { name, calculation } = req.body;
    const updatedImage = await TwoDImage.findByIdAndUpdate(
      req.params.id,
      { name, calculation, image: req.file ? req.file.path : undefined },
      { new: true }
    );
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete 2D Image
exports.deleteTwoDImage = async (req, res) => {
  try {
    await TwoDImage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
