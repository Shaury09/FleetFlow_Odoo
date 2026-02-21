const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  license_number: { type: String, unique: true },
  license_expiry: Date,
  status: {
    type: String,
    enum: ["Available", "OnTrip", "Suspended"],
    default: "Available",
  },
});

module.exports = mongoose.model("Driver", driverSchema);