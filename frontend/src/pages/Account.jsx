
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
    setName(res.data.name);
  };

  const saveChanges = async () => {
    setError("");
    setSuccess("");

    try {
      if (name !== user.name) {
        await axios.put(
          "http://localhost:5000/api/profile/update-name",
          { name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (oldPassword || newPassword) {
        if (!oldPassword || !newPassword) {
          setError("Both old and new password are required");
          return;
        }

        await axios.put(
          "http://localhost:5000/api/profile/update-password",
          { oldPassword, newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setSuccess("Profile updated successfully");
      setEdit(false);
      setOldPassword("");
      setNewPassword("");
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user)
    return (
      <p className="p-6 text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div
        className="max-w-md mx-auto p-6 rounded shadow
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100"
      >
        <h2 className="text-2xl font-bold mb-6">
          My Account
        </h2>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-2 rounded mb-3">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 p-2 rounded mb-3">
            {success}
          </div>
        )}

        {/* VIEW MODE */}
        {!edit && (
          <>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {user.name}
            </p>

            <p className="mb-6">
              <span className="font-semibold">Email:</span> {user.email}
            </p>

            <button
              onClick={() => setEdit(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-3"
            >
              Edit Profile / Update Password
            </button>

            <button
              onClick={logout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            >
              Logout
            </button>
          </>
        )}

        {/* EDIT MODE */}
        {edit && (
          <>
            <label className="font-semibold">Name</label>
            <input
              className="border p-2 w-full mb-3 rounded
                bg-white dark:bg-gray-700
                border-gray-300 dark:border-gray-600
                text-gray-800 dark:text-gray-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="font-semibold">Old Password</label>
            <input
              type="password"
              className="border p-2 w-full mb-3 rounded
                bg-white dark:bg-gray-700
                border-gray-300 dark:border-gray-600
                text-gray-800 dark:text-gray-100"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            />

            <label className="font-semibold">New Password</label>
            <input
              type="password"
              className="border p-2 w-full mb-4 rounded
                bg-white dark:bg-gray-700
                border-gray-300 dark:border-gray-600
                text-gray-800 dark:text-gray-100"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />

            <button
              onClick={saveChanges}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-3"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEdit(false)}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
