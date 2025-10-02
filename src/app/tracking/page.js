"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TrackingPage() {
  const { user } = useUser();
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState(null);

  const dummyOrders = [
    {
      trackingId: "PRY123456",
      customer: "John Doe",
      contact: "+234 800 123 4567",
      pickup: "Lagos",
      dropoff: "Abuja",
      package: "Documents",
      status: "Pending",
    },
    {
      trackingId: "PRY654321",
      customer: "Jane Smith",
      contact: "+234 801 987 6543",
      pickup: "Port Harcourt",
      dropoff: "Kaduna",
      package: "Electronics",
      status: "In Transit",
    },
  ];

  const handleTrack = (e) => {
    e.preventDefault();
    const found = dummyOrders.find(
      (o) => o.trackingId.toUpperCase() === trackingId.toUpperCase()
    );
    setResult(found || "notfound");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow h-auto md:h-screen flex-shrink-0 flex flex-col">
        <h2 className="text-2xl font-bold text-[#dc2626] p-6 border-b">
          Dashboard
        </h2>
        <nav className="flex flex-row md:flex-col gap-2 p-4 overflow-x-auto">
          <Link
            href="/dashboard"
            className="flex-1 text-gray-500 text-center md:text-left px-4 py-3 rounded-lg font-medium hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            href="/order"
            className="flex-1 text-gray-500 text-center md:text-left px-4 py-3 rounded-lg font-medium hover:bg-gray-100"
          >
            Orders
          </Link>
          <Link
            href="/tracking"
            className="flex-1 text-center md:text-left px-4 py-3 rounded-lg font-medium bg-[#dc2626] text-white"
          >
            Track Orders
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 w-full">
        <h1 className="text-3xl text-gray-800 font-semibold mb-6 text-center md:text-left">
          Track Orders - {user?.firstName || "User"}
        </h1>

        <div className="w-full bg-white shadow rounded-2xl p-6 space-y-6 overflow-auto">
          {/* Tracking Form */}
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleTrack}>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID"
              className="flex-1 border text-gray-500 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-[#dc2626] text-white font-semibold rounded-xl shadow-[0_10px_40px_rgba(220,38,38,0.5)]"
            >
              Track
            </motion.button>
          </form>

          {/* Result */}
          {result === "notfound" && (
            <p className="text-red-500 font-medium text-center">
              No order found with this Tracking ID
            </p>
          )}

          {result && result !== "notfound" && (
            <div className="bg-gray-50 p-6 rounded-2xl shadow overflow-auto">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Order Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 min-w-[500px]">
                <p>
                  <span className="font-medium text-gray-500">Tracking ID:</span> {result.trackingId}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Customer:</span> {result.customer}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Contact:</span> {result.contact}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Pickup:</span> {result.pickup}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Drop-off:</span> {result.dropoff}
                </p>
                <p>
                  <span className="font-medium text-gray-500">Package:</span> {result.package}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-medium text-gray-500">Status:</span>{" "}
                  <span
                    className={`px-3 py-1 rounded-lg text-white text-sm ${
                      result.status === "Pending"
                        ? "bg-yellow-500"
                        : result.status === "In Transit"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {result.status}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
