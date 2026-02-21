const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  model: String,
  license_plate: { type: String, unique: true },
  max_capacity: { type: Number, required: true },
  odometer: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Available", "OnTrip", "InShop", "Retired"],
    default: "Available",
  },
  acquisition_cost: Number,
});

module.exports = mongoose.model("Vehicle", vehicleSchema);