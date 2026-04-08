const express = require("express");
const router = express.Router();
const Bus = require("../models/busModel");

const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

// 📂 Upload config
const upload = multer({ dest: "uploads/" });

const { deleteBusById } = require("../controllers/busController");
router.delete("/delete/:id", deleteBusById);

// ================= ADD BUS =================
router.post("/add", async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    await newBus.save();
    res.json({ message: "Bus added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();

    
    console.log("Fetched buses:", buses);

    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= CSV UPLOAD =================
router.post("/upload-csv", upload.single("file"), (req, res) => {

  // ❗ CHECK FILE EXISTS
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      // 🔥 DEBUG CSV ROW
      console.log("Row:", data);

      results.push({
        busName: data.busName,
        busNumber: data.busNumber,
        from: data.from,
        to: data.to,
        departureTime: data.departureTime,
        arrivalTime: data.arrivalTime,
        price: Number(data.price),
        seats: Number(data.seats),
        busType: data.busType,
      });
    })
    .on("end", async () => {
      try {
        // ❗ CHECK EMPTY CSV
        if (results.length === 0) {
          return res.status(400).json({ error: "CSV is empty or wrong format" });
        }

        console.log("Final Data:", results); 

        await Bus.insertMany(results);

        fs.unlinkSync(req.file.path); // delete temp file

        res.json({ message: "CSV uploaded successfully " });

      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
});

// SEARCH BUS BY NAME OR ROUTE
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    const bus = await Bus.findOne({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { from: { $regex: query, $options: "i" } },
        { to: { $regex: query, $options: "i" } },
      ],
    });

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔍 GET BUS BY BUS NUMBER
router.get("/by-number/:busNumber", async (req, res) => {
  try {
    const bus = await Bus.findOne({
      busNumber: req.params.busNumber,
    });

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(bus); // ✅ MUST return bus object
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update-route/:id", async (req, res) => {
  try {
    const { from, to, departureTime, arrivalTime } = req.body;

    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          from,
          to,
          departureTime,
          arrivalTime,
        },
      },
      { new: true }
    );

    res.json(updatedBus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;