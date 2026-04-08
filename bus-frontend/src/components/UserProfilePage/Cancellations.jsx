import mainBg from "../../assets/Images/profile_bg2.jpg";
import { useState } from "react";

export default function Cancellations() {
  const [data] = useState([
    {
      id: 1,
      route: "Pune → Mumbai",
      date: "12 April 2026",
      time: "10:30 AM",
      seat: "A1",
      bus: "Shivneri Express",
      boarding: "Swargate",
      bookingId: "BK12345",
      amount: "₹850",
      refund: "pending",
    },
    {
      id: 2,
      route: "Pune → Nashik",
      date: "15 April 2026",
      time: "7:00 AM",
      seat: "B2",
      bus: "MSRTC Sleeper",
      boarding: "Wakad",
      bookingId: "BK67890",
      amount: "₹650",
      refund: "refunded",
    },
  ]);

  return (
    <div
      className="w-full min-h-screen relative p-10 bg-orange-50"
      // style={{
      //   backgroundImage: `url(${mainBg})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >

      {/* WHITE OVERLAY */}
      <div className="absolute inset-0 bg-white/75"></div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Cancelled Bookings
        </h1>

        <div className="space-y-8">

          {data.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl
              bg-white
              border border-gray-200

              shadow-[0_10px_25px_rgba(0,0,0,0.08),0_4px_6px_rgba(0,0,0,0.05)]

              hover:shadow-[0_20px_40px_rgba(0,0,0,0.15),0_10px_10px_rgba(0,0,0,0.08)]

              hover:-translate-y-2 hover:scale-[1.01]

              transition-all duration-300"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-semibold text-gray-800">
                  {item.route}
                </h2>

                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-500 font-medium">
                  Cancelled
                </span>

              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-600 text-sm">

                <p><span className="font-semibold text-gray-800">Date:</span> {item.date}</p>
                <p><span className="font-semibold text-gray-800">Time:</span> {item.time}</p>
                <p><span className="font-semibold text-gray-800">Seat:</span> {item.seat}</p>

                <p><span className="font-semibold text-gray-800">Bus:</span> {item.bus}</p>
                <p><span className="font-semibold text-gray-800">Boarding:</span> {item.boarding}</p>
                <p><span className="font-semibold text-gray-800">ID:</span> {item.bookingId}</p>

                <p><span className="font-semibold text-gray-800">Paid:</span> {item.amount}</p>

              </div>

              {/* REFUND STATUS (NEW STYLE) */}
              <div className="mt-5 p-4 rounded-xl bg-gray-50 border border-gray-100">

                {item.refund === "pending" && (
                  <p className="text-yellow-600 font-medium flex items-center gap-2">
                    ⏳ Refund in progress
                    <span className="text-gray-500 text-sm">
                      (3–5 working days)
                    </span>
                  </p>
                )}

                {item.refund === "refunded" && (
                  <p className="text-green-600 font-medium flex items-center gap-2">
                    💰 Refund Completed
                  </p>
                )}

              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex gap-4">

                <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition">
                  View Details
                </button>

                <button className="px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                  Download Invoice
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}