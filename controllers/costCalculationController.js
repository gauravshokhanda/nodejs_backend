const Contractor = require("../models/contractor");
const CostCalculation = require("../models/CostCalculation");

exports.calculateCost = async (req, res) => {
  try {
    const { contractorId, area, unit } = req.body;
    const contractor = await Contractor.findById(contractorId);

    if (!contractor)
      return res.status(404).json({ message: "Contractor not found" });

    const rateMultiplier = unit === "Sq. Meter" ? 10.7639 : 1;
    const adjustedArea = area * rateMultiplier;
    const phases = [
      {
        phaseName: "Home Design & Approval",
        duration: 46,
        cost: contractor.rates.homeDesignApproval * adjustedArea,
      },
      {
        phaseName: "Excavation",
        duration: 14,
        cost: contractor.rates.excavation * adjustedArea,
      },
      {
        phaseName: "Footing & Foundation",
        duration: 41,
        cost: contractor.rates.footingFoundation * adjustedArea,
      },
      {
        phaseName: "RCC Work - Columns & Slabs",
        duration: 17,
        cost: contractor.rates.RCCWork * adjustedArea,
      },
      {
        phaseName: "Roof Slab",
        duration: 37,
        cost: contractor.rates.roofSlab * adjustedArea,
      },
      {
        phaseName: "Brickwork and Plastering",
        duration: 8,
        cost: contractor.rates.brickworkPlastering * adjustedArea,
      },
      {
        phaseName: "Flooring & Tiling",
        duration: 25,
        cost: contractor.rates.flooringTiling * adjustedArea,
      },
      {
        phaseName: "Electric Wiring",
        duration: 14,
        cost: contractor.rates.electricWiring * adjustedArea,
      },
      {
        phaseName: "Water Supply & Plumbing",
        duration: 30,
        cost: contractor.rates.waterSupplyPlumbing * adjustedArea,
      },
      {
        phaseName: "Door",
        duration: 15,
        cost: contractor.rates.door * adjustedArea,
      },
    ];

    const totalCost = phases.reduce((sum, phase) => sum + phase.cost, 0);

    const costCalculation = new CostCalculation({
      contractorId,
      area,
      unit,
      totalCost,
      phases,
    });

    await costCalculation.save();
    res
      .status(201)
      .json({ message: "Cost calculation completed", costCalculation });
  } catch (error) {
    res.status(500).json({ message: "Error calculating cost", error });
  }
};
