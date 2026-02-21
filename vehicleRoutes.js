const express = require("express");
const router = express.Router();

const Vehicle = require("../models/Vehicle");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

/**
 * ➕ Add Vehicle (Manager only)
 */
router.post("/", protect, authorize("Manager"), async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * 📜 Get All Vehicles
 */
router.get("/", protect, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

/**
 * ✏ Update Vehicle
 */
router.put("/:id", protect, authorize("Manager"), async (req, res) => {
  const vehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(vehicle);
});

/**
 * ❌ Delete Vehicle
 */
router.delete("/:id", protect, authorize("Manager"), async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ message: "Vehicle deleted" });
});

module.exports = router;