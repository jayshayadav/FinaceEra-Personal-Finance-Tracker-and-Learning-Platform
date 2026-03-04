
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      loginUser(res.data.token);
      navigate("/dashboard");

    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-4">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/30">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login to FinanceEra
        </h2>

        <form onSubmit={submit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70
                       border border-white/40 focus:ring-2 focus:ring-white outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70
                       border border-white/40 focus:ring-2 focus:ring-white outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg 
                       hover:bg-gray-100 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-white mt-4">
          New user?{" "}
          <Link to="/register" className="font-semibold underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
