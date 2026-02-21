const Vehicle = require('../models/Vehicle');

// Add vehicle
const addVehicle = async (req, res) => {
  const { model, license_plate, vehicle_type, max_capacity, acquisition_cost } = req.body;

  const existing = await Vehicle.findOne({ license_plate });
  if (existing) return res.status(400).json({ message: 'Vehicle already exists' });

  const vehicle = await Vehicle.create({
    model,
    license_plate,
    vehicle_type,
    max_capacity,
    acquisition_cost,
  });

  res.status(201).json(vehicle);
};

// Get all vehicles
const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
};

module.exports = { addVehicle, getVehicles };