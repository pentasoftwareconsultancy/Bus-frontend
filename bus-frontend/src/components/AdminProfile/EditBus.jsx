import React from "react";

export default function EditBus() {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4">Edit Bus</h2>

      <form className="space-y-3">
        <input placeholder="Bus ID" className="input" />
        <input placeholder="New Price" className="input" />
        <input type="time" className="input" />

        <select className="input">
          <option>AC</option>
          <option>Non-AC</option>
          <option>Sleeper</option>
        </select>

        <input placeholder="Route (Pune → Mumbai)" className="input" />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}