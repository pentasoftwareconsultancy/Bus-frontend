import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );


    if (!res.data.token) {
      alert(res.data.message || "Login failed");
      return;
    }

    alert(res.data.message);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    
  const role = res.data.role || res.data.user?.role;

if (role === "admin") {
  navigate("/admin-dashboard");
} else {
  navigate("/dashboard");
}
 

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  }
};

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative">

    {/* Background Glow */}
    <div className="absolute w-[500px] h-[500px] bg-orange-500 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
    <div className="absolute w-[400px] h-[400px] bg-orange-400 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

    {/* Card */}
    <div className="relative z-10 w-[400px] md:w-[450px] p-8 rounded-2xl 
    bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-white mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-gray-300 mb-6 text-sm">
        Login to continue your journey 🚍
      </p>

      {/* Form */}
      <div className="flex flex-col gap-4">

        {["email", "password"].map((field, i) => (
          <div key={i} className="relative">
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full px-4 py-3 rounded-lg 
              bg-white/90 text-gray-900 
              focus:outline-none focus:ring-2 focus:ring-orange-400 
              transition duration-300"
            />

            <label className="absolute left-3 top-3 text-gray-500 text-sm 
            transition-all duration-300
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-500 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
            peer-valid:-top-2 peer-valid:text-xs 
            bg-white px-1 rounded">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
          </div>
        ))}

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="mt-2 bg-gradient-to-r from-orange-400 to-orange-500 
          text-white font-semibold py-3 rounded-lg 
          shadow-lg hover:scale-105 hover:shadow-orange-500/40 
          transition-all duration-300"
        >
          Login
        </button>
      </div>

      {/* Footer */}
      <p
        onClick={() => navigate("/register")}
        className="text-center text-sm text-gray-300 mt-6 cursor-pointer hover:text-orange-400 transition"
      >
        Don’t have an account? <span className="underline">Register</span>
      </p>

    </div>
  </div>
);
};

export default Login;