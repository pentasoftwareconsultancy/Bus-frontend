import React from "react";

export default function Tickets() {
  const tickets = [
    {
      id: "ET12345",
      route: "Pune → Mumbai",
      date: "12 April 2026",
      time: "10:30 AM",
      seat: "A1",
      bus: "Shivneri Express",
      passenger: "Amruta",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-orange-30 p-10">

      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          My E-Tickets
        </h1>

        {/* CARDS */}
        <div className="space-y-8">

          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-6 rounded-2xl
              bg-white
              border border-gray-300

              shadow-[0_10px_25px_rgba(0,0,0,0.08),0_4px_6px_rgba(0,0,0,0.05)]

              hover:shadow-[0_20px_40px_rgba(0,0,0,0.15),0_10px_10px_rgba(0,0,0,0.08)]

              hover:-translate-y-2 hover:scale-[1.01]

              transition-all duration-300"
            >

              {/* TOP */}
              <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-semibold text-gray-800">
                  {ticket.route}
                </h2>

                <span className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-600 font-medium">
                  Confirmed
                </span>

              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-600 text-sm">

                <p><span className="text-gray-800 font-medium">Date:</span> {ticket.date}</p>
                <p><span className="text-gray-800 font-medium">Time:</span> {ticket.time}</p>
                <p><span className="text-gray-800 font-medium">Seat:</span> {ticket.seat}</p>

                <p><span className="text-gray-800 font-medium">Bus:</span> {ticket.bus}</p>
                <p><span className="text-gray-800 font-medium">Passenger:</span> {ticket.passenger}</p>
                <p><span className="text-gray-800 font-medium">ID:</span> {ticket.id}</p>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-6">

                <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition">
                  Download PDF
                </button>

                <button className="px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                  Share
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}