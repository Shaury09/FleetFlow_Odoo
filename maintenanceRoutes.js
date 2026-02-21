const express = require("express");
const router = express.Router();

const Maintenance = require("../models/Maintenance");
const Vehicle = require("../models/Vehicle");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

/**
 * 🔧 Create Maintenance
 */
router.post("/", protect, authorize("Manager"), async (req, res) => {
  const maintenance = await Maintenance.create(req.body);

  const vehicle = await Vehicle.findById(req.body.vehicle_id);
  vehicle.status = "InShop";
  await vehicle.save();

  res.status(201).json(maintenance);
});

/**
 * 📜 Get Maintenance by Vehicle
 */
router.get("/vehicle/:id", protect, async (req, res) => {
  const records = await Maintenance.find({
    vehicle_id: req.params.id,
  });
  res.json(records);
});

/**
 * ✅ Complete Maintenance
 */
router.put("/:id/complete", protect, authorize("Manager"), async (req, res) => {
  const maintenance = await Maintenance.findById(req.params.id);
  maintenance.status = "Completed";
  await maintenance.save();

  const vehicle = await Vehicle.findById(maintenance.vehicle_id);
  vehicle.status = "Available";
  await vehicle.save();

  res.json({ message: "Maintenance completed" });
});

module.exports = router;