const Maintenance = require('../models/Maintenance');
const Vehicle = require('../models/Vehicle');

// Add maintenance
const addMaintenance = async (req, res) => {
  const { vehicle_id, type, cost, description, date } = req.body;

  const maintenance = await Maintenance.create({
    vehicle_id,
    type,
    cost,
    description,
    date,
  });

  const vehicle = await Vehicle.findById(vehicle_id);
  if (vehicle) {
    vehicle.status = 'InShop';
    await vehicle.save();
  }

  res.status(201).json(maintenance);
};

// Get all maintenance records
const getMaintenance = async (req, res) => {
  const records = await Maintenance.find().populate('vehicle_id');
  res.json(records);
};

module.exports = { addMaintenance, getMaintenance };