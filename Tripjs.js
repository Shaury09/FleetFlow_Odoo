const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  cargo_weight: { type: Number, required: true },
  start_odometer: Number,
  end_odometer: Number,
  status: {
    type: String,
    enum: ["Draft", "Dispatched", "Completed", "Cancelled"],
    default: "Draft",
  },
  revenue: Number,
}, { timestamps: true });

module.exports = mongoose.model("Trip", tripSchema);