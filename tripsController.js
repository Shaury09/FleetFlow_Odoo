const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');

// Create trip
const createTrip = async (req, res) => {
  const { vehicle_id, driver_id, cargo_weight, start_odometer } = req.body;

  const vehicle = await Vehicle.findById(vehicle_id);
  const driver = await Driver.findById(driver_id);

  if (!vehicle || vehicle.status !== 'Available')
    return res.status(400).json({ message: 'Vehicle not available' });

  if (!driver || driver.status !== 'Available')
    return res.status(400).json({ message: 'Driver not available' });

  if (cargo_weight > vehicle.max_capacity)
    return res.status(400).json({ message: 'Overload not allowed' });

  const trip = await Trip.create({
    vehicle_id,
    driver_id,
    cargo_weight,
    start_odometer,
    status: 'Dispatched',
  });

  vehicle.status = 'OnTrip';
  driver.status = 'OnTrip';
  await vehicle.save();
  await driver.save();

  res.status(201).json(trip);
};

// Get all trips
const getTrips = async (req, res) => {
  const trips = await Trip.find().populate('vehicle_id driver_id');
  res.json(trips);
};

// Complete trip
const completeTrip = async (req, res) => {
  const { trip_id, end_odometer } = req.body;
  const trip = await Trip.findById(trip_id);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });

  trip.status = 'Completed';
  trip.end_odometer = end_odometer;
  trip.completed_at = new Date();
  await trip.save();

  const vehicle = await Vehicle.findById(trip.vehicle_id);
  const driver = await Driver.findById(trip.driver_id);

  vehicle.status = 'Available';
  driver.status = 'Available';
  await vehicle.save();
  await driver.save();

  res.json(trip);
};

module.exports = { createTrip, getTrips, completeTrip };