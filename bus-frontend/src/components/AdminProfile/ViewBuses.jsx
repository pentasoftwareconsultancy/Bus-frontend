import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewBuses() {
  const [buses, setBuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBus, setSelectedBus] = useState(null);

  const busesPerPage = 8; // 🔥 UPDATED

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/buses");
      setBuses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // PAGINATION
  const indexOfLastBus = currentPage * busesPerPage;
  const indexOfFirstBus = indexOfLastBus - busesPerPage;
  const currentBuses = buses.slice(indexOfFirstBus, indexOfLastBus);

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        All Buses 🚍
      </h1>

      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-50">
            <tr className="text-gray-600 text-sm">
              <th className="p-3">No.</th> {/* 🔥 NEW */}
              <th className="p-3">Bus</th>
              <th className="p-3">Route</th>
              <th className="p-3">Time</th>
              <th className="p-3 text-center">Details</th>
            </tr>
          </thead>

          <tbody>
            {currentBuses.length > 0 ? (
              currentBuses.map((bus, index) => (
                <tr key={bus._id} className="border-t hover:bg-gray-50">

                  {/* 🔥 SERIAL NUMBER */}
                  <td className="p-3 font-medium text-gray-700">
                    {indexOfFirstBus + index + 1}
                  </td>

                  <td className="p-3 font-medium">
                    {bus.busName}
                    <div className="text-xs text-gray-500">
                      {bus.busNumber}
                    </div>
                  </td>

                  <td className="p-3">
                    {bus.from} → {bus.to}
                  </td>

                  <td className="p-3 text-sm text-gray-600">
                    {bus.departureTime} - {bus.arrivalTime}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedBus(bus)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No buses found 🚫
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {currentPage} of {Math.ceil(buses.length / busesPerPage)} | Total: {buses.length}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastBus >= buses.length}
          className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

      {/* MODAL */}
      {selectedBus && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <h2 className="text-xl font-bold mb-4">Bus Details</h2>

            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {selectedBus.busName}</p>
              <p><b>Number:</b> {selectedBus.busNumber}</p>
              <p><b>Route:</b> {selectedBus.from} → {selectedBus.to}</p>
              <p><b>Departure:</b> {selectedBus.departureTime}</p>
              <p><b>Arrival:</b> {selectedBus.arrivalTime}</p>
              <p><b>Price:</b> ₹{selectedBus.price}</p>
              <p><b>Seats:</b> {selectedBus.seats}</p>
              <p><b>Type:</b> {selectedBus.busType}</p>
            </div>

            <button
              onClick={() => setSelectedBus(null)}
              className="mt-5 w-full bg-orange-500 text-white py-2 rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}