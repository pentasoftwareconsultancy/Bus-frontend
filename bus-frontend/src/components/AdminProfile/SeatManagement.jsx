import React, { useState } from "react";
import axios from "axios";

export default function SeatManagement() {
  const [search, setSearch] = useState("");
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/bus/search?query=${search}`
      );

      setBus(res.data);
    } catch (err) {
      console.log(err);
      alert("Bus not found");
    }

    setLoading(false);
  };

  const getSeatColor = (seatNo) => {
    if (bus.bookedSeats?.includes(seatNo)) return "bg-red-500";
    if (bus.reservedSeats?.includes(seatNo)) return "bg-yellow-400";
    if (bus.handicappedSeats?.includes(seatNo)) return "bg-blue-500";
    return "bg-green-500";
  };

  const renderSeats = () => {
    let seats = [];

    for (let i = 1; i <= bus.totalSeats; i++) {
      seats.push(
        <div
          key={i}
          className={`w-12 h-12 flex items-center justify-center text-white font-bold rounded ${getSeatColor(
            i
          )}`}
        >
          {i}
        </div>
      );
    }

    return seats;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seat Management</h2>

      {/* SEARCH FORM */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter Bus Name or Route"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {/* SHOW BUS */}
      {bus && (
        <div>
          <h3 className="text-xl font-semibold mb-3">
            {bus.name} ({bus.from} → {bus.to})
          </h3>

          <p className="mb-2">
            Total Seats: {bus.totalSeats}
          </p>

          {/* SEAT LAYOUT */}
          <div className="grid grid-cols-4 gap-3 w-fit">
            {renderSeats()}
          </div>
        </div>
      )}
    </div>
  );
}