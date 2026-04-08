import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    
  if (!form.email.includes("@")) {
    setError("Email must contain @");
    return;
  }


  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(form.phone)) {
    setError("Phone number must be exactly 10 digits");
    return;
  }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      setSuccess(res.data.message || "Registration Successful!");

      setForm({
        name: "",
        phone: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
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
        Create Account
      </h2>
      <p className="text-center text-gray-300 mb-6 text-sm">
        Join and start your journey 🚍
      </p>

      {/* Error */}
      {error && (
        <p className="text-white bg-red-500/80 p-2 rounded text-sm mb-3 text-center">
          {error}
        </p>
      )}

      {/* Success */}
      {success && (
        <p className="text-white bg-green-500/80 p-2 rounded text-sm mb-3 text-center">
          {success}
        </p>
      )}

      {/* Form */}
      <div className="flex flex-col gap-4">

        {["name", "phone", "email", "password"].map((field, i) => (
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
          Register
        </button>
      </div>

      {/* Footer */}
      <p
        onClick={() => navigate("/login")}
        className="text-center text-sm text-gray-300 mt-6 cursor-pointer hover:text-orange-400 transition"
      >
        Already have an account? <span className="underline">Login</span>
      </p>

    </div>
  </div>
);
}

export default Register;