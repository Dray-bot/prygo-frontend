"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function TrackingPage() {
  const { user } = useUser();
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://prygo-backend.onrender.com/orders";

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${trackingId.toUpperCase()}`);
      if (res.status === 404) {
        setResult("notfound");
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching order");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-lg flex-shrink-0 flex flex-col">
        <h2 className="text-2xl font-bold text-[#dc2626] p-6 border-b">Dashboard</h2>
        <nav className="flex flex-row md:flex-col gap-2 p-4 overflow-x-auto">
          <Link href="/dashboard" className="flex-1 text-gray-500 text-center md:text-left px-4 py-3 rounded-lg font-medium hover:bg-gray-100">Home</Link>
          <Link href="/order" className="flex-1 text-gray-500 text-center md:text-left px-4 py-3 rounded-lg font-medium hover:bg-gray-100">Orders</Link>
          <Link href="/tracking" className="flex-1 text-center md:text-left px-4 py-3 rounded-lg font-medium bg-[#dc2626] text-white">Track Orders</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 w-full">
        <h1 className="text-3xl text-gray-800 font-semibold mb-6 text-center md:text-left">
          Track Orders - {user?.firstName || "User"}
        </h1>

        <div className="w-full max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleTrack}>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID"
              className="flex-1 border border-gray-300 px-4 py-3 rounded-lg text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#dc2626] text-white font-semibold rounded-xl shadow-md"
            >
              {loading ? "Tracking..." : "Track"}
            </button>
          </form>

          {result === "notfound" && (
            <p className="text-red-500 font-medium text-center">No order found with this Tracking ID</p>
          )}

          {result && result !== "notfound" && (
            <div className="bg-gray-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Order Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-medium">Tracking ID:</span> {result.trackingId}</p>
                <p><span className="font-medium">Customer:</span> {result.customer}</p>
                <p><span className="font-medium">Contact:</span> {result.contact}</p>
                <p><span className="font-medium">Pickup:</span> {result.pickup}</p>
                <p><span className="font-medium">Drop-off:</span> {result.dropoff}</p>
                <p><span className="font-medium">Package:</span> {result.package}</p>
                <p className="sm:col-span-2">
                  <span className="font-medium">Status:</span>{" "}
                  <span className={`px-3 py-1 rounded-lg text-white text-sm ${
                    result.status === "Pending" ? "bg-yellow-500" :
                    result.status === "In Transit" ? "bg-blue-500" : "bg-green-500"
                  }`}>{result.status}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
