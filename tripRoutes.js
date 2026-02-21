const express = require("express");
const router = express.Router();

const Trip = require("../models/Trip");
const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

/**
 * 🚀 Create Trip (Dispatcher only)
 */
router.post("/", protect, authorize("Dispatcher"), async (req, res) => {
  const { vehicle_id, driver_id, cargo_weight } = req.body;

  const vehicle = await Vehicle.findById(vehicle_id);
  const driver = await Driver.findById(driver_id);

  if (!vehicle || vehicle.status !== "Available")
    return res.status(400).json({ message: "Vehicle not available" });

  if (!driver || driver.status !== "Available")
    return res.status(400).json({ message: "Driver not available" });

  if (driver.license_expiry < new Date())
    return res.status(400).json({ message: "License expired" });

  if (cargo_weight > vehicle.max_capacity)
    return res.status(400).json({ message: "Overload not allowed" });

  const trip = await Trip.create({
    vehicle_id,
    driver_id,
    cargo_weight,
    start_odometer: vehicle.odometer,
    status: "Dispatched",
  });

  vehicle.status = "OnTrip";
  driver.status = "OnTrip";

  await vehicle.save();
  await driver.save();

  res.status(201).json(trip);
});

/**
 * ✅ Complete Trip
 */
router.put("/:id/complete", protect, async (req, res) => {
  const { end_odometer } = req.body;

  const trip = await Trip.findById(req.params.id);
  const vehicle = await Vehicle.findById(trip.vehicle_id);
  const driver = await Driver.findById(trip.driver_id);

  trip.end_odometer = end_odometer;
  trip.status = "Completed";

  vehicle.status = "Available";
  vehicle.odometer = end_odometer;
  driver.status = "Available";

  await trip.save();
  await vehicle.save();
  await driver.save();

  res.json({ message: "Trip completed" });
});

module.exports = router;