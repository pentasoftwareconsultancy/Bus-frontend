import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBus,
  FaTimesCircle,
  FaTicketAlt,
  FaMapMarkerAlt,
  FaUserCircle,
} from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const cards = [
    {
      title: "Upcoming Trips",
      desc: "View your scheduled journeys",
      icon: <FaBus />,
      path: "/bookings",
    },
    {
      title: "Cancelled",
      desc: "View cancelled bookings",
      icon: <FaTimesCircle />,
      path: "/cancellations",
    },
    {
      title: "Tickets",
      desc: "Download your tickets",
      icon: <FaTicketAlt />,
      path: "/tickets",
    },
    {
      title: "Live Tracking",
      desc: "Track bus in real-time",
      icon: <FaMapMarkerAlt />,
      path: "/livetracking",
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50 flex">

      {/* LEFT PANEL */}
<div
  className="w-1/5 min-h-screen p-6 flex flex-col justify-between shadow-xl text-white"
  style={{
    background: "linear-gradient(180deg, #1f2937, #374151, #ea580c)"
  }}
>
        {/* USER INFO */}
        <div className="text-center">
          <FaUserCircle className="text-7xl text-orange-500 mx-auto mb-3" />

          <h2 className="text-2xl font-bold text-white">
            {user?.name || "User"}
          </h2>

          <p className="text-white text-sm">
            {user?.email}
          </p>
        

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="mt-20 p-7 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition"
        >
          Logout
        </button>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-8 space-y-8">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, <span className="text-orange-500">{user?.name}</span>
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your travel easily 🚍
            </p>
          </div>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {cards.map((card, i) => (
            <div
              key={i}
              onClick={() => navigate(card.path)}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 cursor-pointer
              hover:shadow-xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl text-orange-500 mb-4">
                {card.icon}
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                {card.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {card.desc}
              </p>

              <div className="mt-4 text-orange-500 font-medium">
                View →
              </div>
            </div>
          ))}

        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">

          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Recent Activity
          </h2>

          <p className="text-gray-500 text-sm">
            Your recent bookings and actions will appear here.
          </p>

        </div>

      </div>
    </div>
  );
}