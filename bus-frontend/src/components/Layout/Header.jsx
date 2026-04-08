import React, { useState, useEffect } from "react";
import { FaBusSimple } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // ✅ NEW
  const navigate = useNavigate();

  // ✅ Check login state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-black text-white w-full">
      
      <div className="flex items-center justify-between h-20 px-3 md:px-6 lg:px-12">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <FaBusSimple className="text-orange-400 text-lg md:text-2xl" />
        </div>

        {/* Title */}
        <h2 className="text-sm md:text-lg lg:text-2xl font-semibold">
          Raj<span className="text-orange-400"> Mudra </span>Travels
        </h2>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-4 md:gap-6 lg:gap-10">

          <button onClick={() => navigate("/")} className="hover:text-orange-400">
            Bus booking
          </button>

          <button onClick={() => navigate("/About")} className="hover:text-orange-400">
            About us
          </button>

          <button onClick={() => navigate("/Service")} className="hover:text-orange-400">
            Services
          </button>

          <button onClick={() => navigate("/Contact")} className="hover:text-orange-400">
            Contact
          </button>

          {/* ✅ CONDITIONAL UI */}
          {user ? (
            <div className="flex items-center gap-3">

              {/* Profile Icon */}
              <img
                src="https://cdn4.vectorstock.com/i/1000x1000/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-400"
                onClick={() => navigate("/dashboard")}
              />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-md"
              >
                Logout
              </button>

            </div>
          ) : (
            <button
              onClick={() => navigate("/register")}
              className="bg-orange-400 text-black px-4 py-1 rounded-md font-semibold hover:bg-orange-500"
            >
              Register
            </button>
          )}

        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden bg-black border-t border-gray-700 px-4 py-3 space-y-3">

          <button onClick={() => navigate("/")} className="block w-full text-left hover:text-orange-400">
            Bus booking
          </button>

          <button onClick={() => navigate("/About")} className="block w-full text-left hover:text-orange-400">
            About us
          </button>

          <button onClick={() => navigate("/Service")} className="block w-full text-left hover:text-orange-400">
            Services
          </button>

          <button onClick={() => navigate("/Contact")} className="block w-full text-left hover:text-orange-400">
            Contact
          </button>

          {/* ✅ Mobile Conditional */}
          {user ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="block w-full text-left bg-green-500 px-3 py-2 rounded-md"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-500 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/register")}
              className="block w-full text-left bg-orange-400 text-black px-3 py-2 rounded-md font-semibold"
            >
              Register
            </button>
          )}

        </div>
      )}
    </header>
  );
};

export default Header;