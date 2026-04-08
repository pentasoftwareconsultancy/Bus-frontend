import mainBg from "../../assets/Images/profile_bg2.jpg";

export default function Bookings() {
  return (
    <div className="w-full min-h-screen relative p-10 bg-orange-50">

      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          My Bookings
        </h1>

        {/* CARDS */}
        <div className="space-y-6">

          {[1, 2, 3].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-gray-200

              shadow-[0_10px_25px_rgba(0,0,0,0.08),0_4px_6px_rgba(0,0,0,0.05)]

              hover:shadow-[0_20px_40px_rgba(0,0,0,0.15),0_10px_10px_rgba(0,0,0,0.08)]

              hover:-translate-y-2 hover:scale-[1.01]

              transition-all duration-300"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-semibold text-gray-800">
                  Pune → Mumbai
                </h2>

                <span className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-600 font-medium">
                  Confirmed
                </span>

              </div>

              {/* FULL DETAILS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">

                <p><span className="font-semibold text-gray-800">Booking ID:</span> BK12345</p>
                <p><span className="font-semibold text-gray-800">Bus Name:</span> Shivneri Express</p>
                <p><span className="font-semibold text-gray-800">Seat No:</span> A1</p>

                <p><span className="font-semibold text-gray-800">Date:</span> 12 April 2026</p>
                <p><span className="font-semibold text-gray-800">Departure Time:</span> 10:30 AM</p>
                <p><span className="font-semibold text-gray-800">Arrival Time:</span> 1:30 PM</p>

                <p><span className="font-semibold text-gray-800">Boarding Point:</span> Swargate</p>
                <p><span className="font-semibold text-gray-800">Dropping Point:</span> Dadar</p>
                <p><span className="font-semibold text-gray-800">Passenger Name:</span> Amruta</p>

                <p><span className="font-semibold text-gray-800">Ticket Type:</span> AC Sleeper</p>
                <p><span className="font-semibold text-gray-800">Fare:</span> ₹850</p>
                <p><span className="font-semibold text-gray-800">Payment:</span> Paid Online</p>

              </div>

              {/* FOOTER INFO */}
              <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-500">

                🚍 Please reach the boarding point 15 minutes before departure.  
                Carry a valid ID proof.

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}