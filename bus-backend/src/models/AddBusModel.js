
// ================= BACKEND (Node.js + Express + MongoDB) =================

// models/Bus.js
const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busName: String,
  busNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  price: Number,
  seats: Number,
});

module.exports = mongoose.model("Bus", busSchema);


// routes/busRoutes.js
const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");

// ADD BUS
router.post("/add", async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    await newBus.save();
    res.status(201).json({ message: "Bus added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL BUSES (CSV + Admin Added both stored here)
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


// server.js (add this line)
app.use("/api/buses", require("./routes/busRoutes"));


// ================= CSV NOTE =================
// When you upload CSV, insert data into same Bus collection
// so BOTH CSV + Admin buses appear together.
