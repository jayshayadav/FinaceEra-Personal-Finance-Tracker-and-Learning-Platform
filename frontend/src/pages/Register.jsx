

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Account created! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 p-4">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-xl 
                      rounded-2xl p-8 border border-white/30">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70
                       border border-white/40 focus:ring-2 focus:ring-white outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70
                       border border-white/40 focus:ring-2 focus:ring-white outline-none"
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70
                       border border-white/40 focus:ring-2 focus:ring-white outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-white text-purple-600 font-semibold py-3 rounded-lg 
                       hover:bg-gray-100 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
