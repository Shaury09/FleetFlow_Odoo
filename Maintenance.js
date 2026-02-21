const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "Oil Change",
        "Engine Repair",
        "Brake Service",
        "Tire Replacement",
        "General Service",
        "Other",
      ],
    },

    description: {
      type: String,
      trim: true,
    },

    cost: {
      type: Number,
      required: true,
      min: 0,
    },

    service_date: {
      type: Date,
      default: Date.now,
    },

    performed_by: {
      type: String, // workshop name or mechanic
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Completed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);