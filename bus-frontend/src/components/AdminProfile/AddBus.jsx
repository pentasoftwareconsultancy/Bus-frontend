import React, { useState } from "react";
import bgImage from "../../assets/Images/bg3.png";
import axios from "axios";

export default function AddBus() {

  // ✅ NEW STATES
  const [mode, setMode] = useState("form"); // form | csv
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    busName: "",
    busNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    seats: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD BUS
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/buses/add", {
        ...form,
        price: Number(form.price),
        seats: Number(form.seats),
      });

      alert("Bus Added Successfully 🚍");

      setForm({
        busName: "",
        busNumber: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: "",
        seats: "",
      });
    } catch (err) {
      console.error("FULL ERROR:", err);
      alert(err?.response?.data?.error || "Error adding bus");
    }
  };

  // ✅ CSV UPLOAD
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/buses/upload-csv", formData);
      alert("CSV Uploaded Successfully 🚀");
    } catch (err) {
      alert("Upload Failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-400 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Bus Management</h2>
          <p className="text-gray-500 text-sm">Add bus or upload CSV</p>
        </div>

        {/* 🔥 TOGGLE BUTTON */}
        <div className="flex gap-2 p-4">
          <button
            onClick={() => setMode("form")}
            className={`flex-1 py-2 rounded-lg font-medium ${
              mode === "form"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Add Bus
          </button>

          <button
            onClick={() => setMode("csv")}
            className={`flex-1 py-2 rounded-lg font-medium ${
              mode === "csv"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Upload CSV
          </button>
        </div>

        {/* ================= FORM ================= */}
        {mode === "form" && (
          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="label">Bus Name</label>
              <input name="busName" value={form.busName} onChange={handleChange} className="input" />
            </div>

            <div>
              <label className="label">Bus Number</label>
              <input name="busNumber" value={form.busNumber} onChange={handleChange} className="input" />
            </div>

            <div>
              <label className="label">From</label>
              <input name="from" value={form.from} onChange={handleChange} className="input" />
            </div>

            <div>
              <label className="label">To</label>
              <input name="to" value={form.to} onChange={handleChange} className="input" />
            </div>

            <div>
              <label className="label">Departure Time</label>
              <input type="time" name="departureTime" value={form.departureTime} onChange={handleChange} className="input" />
            </div>

            <div>
              <label className="label">Arrival Time</label>
              <input type="time" name="arrivalTime" value={form.arrivalTime} onChange={handleChange} className="input" />
            </div>

            <div>
              <label className="label">Price (₹)</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} className="input" />
            </div>

            <div>
              <label className="label">Seats</label>
              <input type="number" name="seats" value={form.seats} onChange={handleChange} className="input" />
            </div>

            <div className="md:col-span-2 mt-4">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300">
                Add Bus
              </button>
            </div>

          </form>
        )}

        {/* ================= CSV ================= */}
        {mode === "csv" && (
          <div className="p-6 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4"
            />

            <button
              onClick={handleUpload}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
            >
              Upload CSV
            </button>
          </div>
        )}

      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          outline: none;
          transition: all 0.2s ease;
        }
        .input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 2px rgba(249,115,22,0.2);
        }
        .label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
          color: #374151;
        }
      `}</style>
    </div>
  );
}