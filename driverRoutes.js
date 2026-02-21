const express = require("express");
const router = express.Router();

const Driver = require("../models/Driver");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

/**
 * ➕ Add Driver
 */
router.post("/", protect, authorize("Manager"), async (req, res) => {
  const driver = await Driver.create(req.body);
  res.status(201).json(driver);
});

/**
 * 📜 Get All Drivers
 */
router.get("/", protect, async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
});

/**
 * ✏ Update Driver
 */
router.put("/:id", protect, authorize("Manager"), async (req, res) => {
  const driver = await Driver.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(driver);
});

/**
 * ❌ Delete Driver
 */
router.delete("/:id", protect, authorize("Manager"), async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  res.json({ message: "Driver deleted" });
});

module.exports = router;