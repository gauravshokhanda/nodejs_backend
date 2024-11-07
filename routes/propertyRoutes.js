// routes/propertyRoutes.js
const express = require("express");
const router = express.Router();
const PropertyController = require("../controllers/PropertyController");
const multer = require("multer");

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // store files in the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// Route to create a new property
router.post("/create", upload.single("thumbnail"), PropertyController.createProperty);

// Route to get all properties
router.get("/", PropertyController.getAllProperties);

// Get property by ID (for editing)
router.get("/:id", PropertyController.getPropertyById);

// Update property by ID
router.put("/:id", upload.single("thumbnail"), PropertyController.updateProperty);

module.exports = router;
