// controllers/PropertyController.js
const Property = require("../models/PropertyModel.js");

const PropertyController = {
    // Create a new property
    createProperty: async (req, res) => {
        try {
            const { name, area,  } = req.body;
            const thumbnail = req.file ? req.file.path : null; // Get the file path if an image is uploaded

            // Create a new property in the database
            const property = new Property({
                name,
                area,
                thumbnail,
            });

            // Save the property
            await property.save();

            res.status(201).json({ success: true, data: property });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to create property" });
        }
    },

    // Get a property by ID
    getPropertyById: async (req, res) => {
        try {
            const { id } = req.params;
            const property = await Property.findById(id);

            if (!property) {
                return res.status(404).json({ success: false, message: "Property not found" });
            }

            res.status(200).json({ success: true, data: property });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to fetch property" });
        }
    },

    updateProperty: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, area } = req.body;
            const thumbnail = req.file ? req.file.path : null; // Get the new file path if an image is uploaded

            // Find the property by ID and update it
            const updatedProperty = await Property.findByIdAndUpdate(
                id,
                {
                    name,
                    area,
                    ...(thumbnail && { thumbnail }), // Only update the thumbnail if a new file is uploaded
                },
                { new: true } // Return the updated document
            );

            if (!updatedProperty) {
                return res.status(404).json({ success: false, message: "Property not found" });
            }

            res.status(200).json({ success: true, data: updatedProperty });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to update property" });
        }
    },

    // Get all properties
    getAllProperties: async (req, res) => {
        try {
            const properties = await Property.find(); // Fetch all properties
            res.status(200).json({ success: true, data: properties });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to fetch properties" });
        }
    },
};

module.exports = PropertyController;
