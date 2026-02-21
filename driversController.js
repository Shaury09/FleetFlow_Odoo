const Driver = require('../models/Driver');

// Add driver
const addDriver = async (req, res) => {
  const { name, license_number, license_expiry, license_category } = req.body;

  const existing = await Driver.findOne({ license_number });
  if (existing) return res.status(400).json({ message: 'Driver already exists' });

  const driver = await Driver.create({
    name,
    license_number,
    license_expiry,
    license_category,
  });

  res.status(201).json(driver);
};

// Get all drivers
const getDrivers = async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
};

module.exports = { addDriver, getDrivers };