import React, { useState } from "react";
import { FaBus, FaPlus, FaEdit, FaTrash, FaRoute } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";

import AddBus from "./AddBus";
import ViewBuses from "./ViewBuses";
import CancelBus from "./CancelBus";
import SeatManagement from "./SeatManagement";
import RouteManagement from "./RouteManagement";

export default function AdminDashboard() {

  function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
        ${active
          ? "bg-orange-500 text-white shadow-lg"
          : "hover:bg-white/10 text-gray-200"
        }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}
  const [active, setActive] = useState("Dashboard");

  // 🔁 RENDER BASED ON CLICK
  const renderContent = () => {
    switch (active) {
      case "Add Bus":
        return <AddBus />;
      case "View All Buses":
        return <ViewBuses />;
      case "Cancel Bus":
        return <CancelBus />;
      case "Seat Management":
        return <SeatManagement />;
        case "Route Management":
  return <RouteManagement />;

      default:
        return (
          <>
            <h1 className="text-3xl font-bold m-6 p-6">Dashboard</h1>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 m-6 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold">Total Buses</h2>
                <p className="text-3xl font-bold text-orange-500 mt-2">120</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold">Active Routes</h2>
                <p className="text-3xl font-bold text-orange-500 mt-2">45</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold">Total Bookings</h2>
                <p className="text-3xl font-bold text-orange-500 mt-2">980</p>
              </div>
            </div>

            {/* TABLE */}
            <div className="mt-8 bg-white p-6 m-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Buses</h2>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">Bus Name</th>
                    <th className="p-2">Route</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Seats</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Shivneri</td>
                    <td className="p-2">Pune → Mumbai</td>
                    <td className="p-2">AC</td>
                    <td className="p-2">₹800</td>
                    <td className="p-2">40</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen">
{/* SIDEBAR */}
<div className="w-64 min-h-screen bg-gradient-to-b from-[#3b1d0f] via-[#5a2e12] to-[#8b4513] text-white shadow-xl flex flex-col">

  {/* HEADER */}
  <div className="p-6 border-b border-white/10">
    <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
  </div>

  {/* MENU */}
  <nav className="flex-1 mt-6 space-y-2 px-3">

    <SidebarItem
      icon={<AiOutlineDashboard />}
      label="Dashboard"
      active={active === "Dashboard"}
      onClick={() => setActive("Dashboard")}
    />

    <SidebarItem
      icon={<FaPlus />}
      label="Add Bus"
      active={active === "Add Bus"}
      onClick={() => setActive("Add Bus")}
    />

    <SidebarItem
      icon={<FaBus />}
      label="View All Buses"
      active={active === "View All Buses"}
      onClick={() => setActive("View All Buses")}
    />

    <SidebarItem
      icon={<FaEdit />}
      label="Edit Bus"
      active={active === "Edit Bus"}
      onClick={() => setActive("Edit Bus")}
    />

 <SidebarItem
  icon={<FaTrash />}
  label="Cancel Bus"
  active={active === "Cancel Bus"}
  onClick={() => setActive("Cancel Bus")}
/>

<SidebarItem
  icon={<MdEventSeat />}
  label="Seat Management"
  active={active === "Seat Management"}
  onClick={() => setActive("Seat Management")}

/>   

 <SidebarItem icon={<FaRoute />} label="Route Management"
   active={active === "Route Management"}
  onClick={() => setActive("Route Management")}
   />
    <SidebarItem icon={<FaBus />} label="Price Management" />

   </nav>
    
     </div>
     

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-orange-50 ">
        {renderContent()}
      </div>
    </div>
  );
}