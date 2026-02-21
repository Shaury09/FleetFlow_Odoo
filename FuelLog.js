const mongoose = require("mongoose");

const fuelLogSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },

    trip_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      index: true,
    },

    liters: {
      type: Number,
      required: true,
      min: 0.1,
    },

    cost: {
      type: Number,
      required: true,
      min: 0,
    },

    fuel_type: {
      type: String,
      enum: ["Petrol", "Diesel", "CNG", "Electric"],
      default: "Diesel",
    },

    fuel_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FuelLog", fuelLogSchema);