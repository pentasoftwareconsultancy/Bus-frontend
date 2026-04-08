import React, { useState } from "react";
import axios from "axios";

export default function RouteManagement() {
  const [busNumber, setBusNumber] = useState("");
  const [bus, setBus] = useState(null);

  const [form, setForm] = useState({
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
  });

  // 🔍 SEARCH BUS
const handleSearch = async () => {
  try {
    const res = await axios.get(

        `http://localhost:5000/api/bus/by-number/${busNumber}`
    );

    console.log("API Response:", res.data);

    if (!res.data || res.data.message) {
      alert("Bus not found");
      setBus(null);
      return;
    }

    setBus(res.data); // ✅ correct bus stored
  } catch (err) {
    console.log(err);
    alert("Error fetching bus");
  }
};

const handleUpdate = async () => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/bus/update-route/${bus._id}`,
      {
        from: form.from,
        to: form.to,
        departureTime: form.departureTime,
        arrivalTime: form.arrivalTime,
      }
    );

    console.log("Updated Bus:", response.data);

    alert("Updated successfully!");
    setBus(response.data); // update UI instantly
  } catch (err) {
    console.log(err);
    alert("Update failed");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Route Management</h2>

      {/* SEARCH */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Bus Number"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* SHOW FORM */}
      {bus && (
        <div className="bg-white p-6 rounded shadow w-96">
          <h3 className="font-semibold mb-4">
            Editing Bus: {bus.busName}
          </h3>
<input
  type="text"
  placeholder="From"
  value={form.from}
  onChange={(e) =>
    setForm({ ...form, from: e.target.value })
  }
/>

<input
  type="text"
  placeholder="To"
  value={form.to}
  onChange={(e) =>
    setForm({ ...form, to: e.target.value })
  }
/>

<input
  type="text"
  placeholder="Departure Time"
  value={form.departureTime}
  onChange={(e) =>
    setForm({ ...form, departureTime: e.target.value })
  }
/>

<input
  type="text"
  placeholder="Arrival Time"
  value={form.arrivalTime}
  onChange={(e) =>
    setForm({ ...form, arrivalTime: e.target.value })
  }
/>

          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Update Route
          </button>
        </div>
      )}
    </div>
  );
}