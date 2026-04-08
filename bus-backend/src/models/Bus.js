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
  busType: String,
  bookedSeats: [Number],
  reservedSeats: [Number],
  handicappedSeats: [Number],
});

module.exports = mongoose.model("Bus", busSchema);