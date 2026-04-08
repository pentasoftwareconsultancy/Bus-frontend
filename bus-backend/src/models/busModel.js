const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: String,
  from: String,
  to: String,
  time: String,
  price: Number,
  seats: Number,
  type: String,
});

module.exports = mongoose.model("Bus", busSchema);