const express = require("express");
const router = express.Router();

const FuelLog = require("../models/FuelLog");
const Vehicle = require("../models/Vehicle");
const Trip = require("../models/Trip");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");


/**
 * ⛽ Add Fuel Log
 * Dispatcher or Manager allowed
 */
router.post(
  "/",
  protect,
  authorize("Dispatcher", "Manager"),
  async (req, res) => {
    try {
      const { vehicle_id, trip_id, liters, cost } = req.body;

      if (liters <= 0)
        return res.status(400).json({ message: "Invalid fuel quantity" });

      if (cost < 0)
        return res.status(400).json({ message: "Invalid fuel cost" });

      const vehicle = await Vehicle.findById(vehicle_id);
      const trip = await Trip.findById(trip_id);

      if (!vehicle)
        return res.status(404).json({ message: "Vehicle not found" });

      if (!trip)
        return res.status(404).json({ message: "Trip not found" });

      const fuelLog = await FuelLog.create({
        vehicle_id,
        trip_id,
        liters,
        cost,
      });

      res.status(201).json(fuelLog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);


/**
 * 📜 Get Fuel Logs by Trip
 */
router.get("/trip/:id", protect, async (req, res) => {
  const logs = await FuelLog.find({ trip_id: req.params.id });
  res.json(logs);
});


/**
 * 📜 Get Fuel Logs by Vehicle
 */
router.get("/vehicle/:id", protect, async (req, res) => {
  const logs = await FuelLog.find({ vehicle_id: req.params.id });
  res.json(logs);
});


module.exports = router;