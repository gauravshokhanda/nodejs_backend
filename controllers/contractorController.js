const Contractor = require("../models/contractor");
const User = require("../models/userModel");

// Create a new contractor
exports.createContractor = async (req, res) => {
  try {
    const {
      userId,
      laborChargePerSqFt,
      singleStoryCharge,
      twoStoryCharge,
      email,
      phoneNumber,
      profile,
      companyName,
      rates,
    } = req.body;

    // Check if the associated user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new contractor document
    const contractor = new Contractor({
      user: userId,
      laborChargePerSqFt,
      singleStoryCharge,
      twoStoryCharge,
      email,
      phoneNumber,
      profile,
      companyName,
      rates,
    });

    // Save contractor to the database
    await contractor.save();
    res
      .status(201)
      .json({ message: "Contractor created successfully", contractor });
  } catch (error) {
    console.error("Error creating contractor:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create contractor", error: error.message });
  }
};

// Get all contractors
exports.getAllContractors = async (req, res) => {
  try {
    const contractors = await Contractor.find().populate("user", "name email");
    res.status(200).json(contractors);
  } catch (error) {
    console.error("Error fetching contractors:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch contractors", error: error.message });
  }
};

// Get a single contractor by ID
exports.getContractorById = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!contractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }
    res.status(200).json(contractor);
  } catch (error) {
    console.error("Error fetching contractor:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch contractor", error: error.message });
  }
};

// Update a contractor by ID
exports.updateContractor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const contractor = await Contractor.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!contractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }
    res
      .status(200)
      .json({ message: "Contractor updated successfully", contractor });
  } catch (error) {
    console.error("Error updating contractor:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update contractor", error: error.message });
  }
};

// Delete a contractor by ID
exports.deleteContractor = async (req, res) => {
  try {
    const { id } = req.params;
    const contractor = await Contractor.findByIdAndDelete(id);
    if (!contractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }
    res.status(200).json({ message: "Contractor deleted successfully" });
  } catch (error) {
    console.error("Error deleting contractor:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete contractor", error: error.message });
  }
};

// Calculate total cost based on area or length
exports.getContractorsWithCost = async (req, res) => {
  try {
    const { area, length } = req.query;

    // Check if area or length is provided
    if (!area && !length) {
      return res
        .status(400)
        .json({ message: "Please provide either area or length" });
    }

    // Fetch all contractors
    const contractors = await Contractor.find().populate("user", "email");

    // Calculate total cost for each contractor
    const contractorsWithCost = contractors.map((contractor) => {
      const laborCharge = contractor.laborChargePerSqFt * (area || length);
      const singleStoryCost = contractor.singleStoryCharge * (area || length);
      const twoStoryCost = contractor.twoStoryCharge * (area || length);

      const rates = contractor.rates;
      const totalRatesCost = Object.values(rates).reduce(
        (total, rate) => total + rate * (area || length),
        0
      );

      // Calculate total cost based on all components
      const totalCost =
        laborCharge + singleStoryCost + twoStoryCost + totalRatesCost;

      return {
        contractorId: contractor._id,
        contractor: contractor,
        // contractorEmail: contractor.user.email,
        totalCost,
      };
    });

    res.status(200).json(contractorsWithCost);
  } catch (error) {
    console.error("Error calculating contractor costs:", error.message);
    res.status(500).json({
      message: "Failed to calculate contractor costs",
      error: error.message,
    });
  }
};
