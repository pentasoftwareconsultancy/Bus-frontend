require("dotenv").config();
const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/buses", require("./src/routes/busRoutes"));
app.use("/api/bus", require("./src/routes/busRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});