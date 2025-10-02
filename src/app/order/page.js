"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function OrderPage() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    customer: "",
    contact: "",
    pickup: "",
    dropoff: "",
    package: "",
  });
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://prygo-backend.onrender.com/orders";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setSubmittedOrders(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const trackingId = "PRY" + Math.floor(100000 + Math.random() * 900000);
      const newOrder = { ...formData, trackingId, status: "Pending" };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) throw new Error("Failed to create order");
      const savedOrder = await res.json();

      setSubmittedOrders([savedOrder, ...submittedOrders]);
      setFormData({
        customer: "",
        contact: "",
        pickup: "",
        dropoff: "",
        package: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error creating order");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow h-auto md:h-screen flex-shrink-0 flex flex-col">
        <h2 className="text-2xl font-bold text-[#dc2626] p-6 border-b">
          Dashboard
        </h2>
        <nav className="flex flex-row md:flex-col gap-2 p-4 overflow-x-auto">
          <Link href="/dashboard" className="flex-1 text-gray-500 text-center md:text-left px-4 py-3 rounded-lg font-medium hover:bg-gray-100">Home</Link>
          <Link href="/order" className="flex-1 text-center md:text-left px-4 py-3 rounded-lg font-medium bg-[#dc2626] text-white">Orders</Link>
          <Link href="/tracking" className="flex-1 text-gray-500 text-center md:text-left px-4 py-3 rounded-lg font-medium hover:bg-gray-100">Track Orders</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 w-full">
        <h1 className="text-3xl text-gray-800 font-semibold mb-6 text-center md:text-left">
          Create Order - {user?.firstName || "User"}!
        </h1>

        <div className="w-full bg-white shadow rounded-2xl p-6 space-y-6">
          {/* Order Form */}
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Customer Name"
              className="border border-gray-300 px-4 py-3 rounded-lg text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              required
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="border border-gray-300 px-4 py-3 rounded-lg text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              required
            />
            <input
              type="text"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              placeholder="Pickup Location"
              className="border border-gray-300 px-4 py-3 rounded-lg text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              required
            />
            <input
              type="text"
              name="dropoff"
              value={formData.dropoff}
              onChange={handleChange}
              placeholder="Drop-off Location"
              className="border border-gray-300 px-4 py-3 rounded-lg text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              required
            />
            <input
              type="text"
              name="package"
              value={formData.package}
              onChange={handleChange}
              placeholder="Package Description"
              className="border border-gray-300 px-4 py-3 rounded-lg text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#dc2626] text-white font-semibold rounded-xl shadow-md col-span-full"
            >
              {loading ? "Creating..." : "Create Order"}
            </button>
          </form>

          {/* Orders Table */}
          {submittedOrders.length > 0 && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    {["Tracking ID", "Customer", "Contact", "Pickup", "Drop-off", "Package", "Status"].map(th => (
                      <th key={th} className="px-4 py-2 border-b text-gray-800 text-base font-semibold">{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {submittedOrders.map(order => (
                    <tr key={order.trackingId} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b text-gray-700 font-medium">{order.trackingId}</td>
                      <td className="px-4 py-2 border-b text-gray-700">{order.customer}</td>
                      <td className="px-4 py-2 border-b text-gray-700">{order.contact}</td>
                      <td className="px-4 py-2 border-b text-gray-700">{order.pickup}</td>
                      <td className="px-4 py-2 border-b text-gray-700">{order.dropoff}</td>
                      <td className="px-4 py-2 border-b text-gray-700">{order.package}</td>
                      <td className="px-4 py-2 border-b">
                        <span className="px-3 py-1 rounded-lg text-white text-sm bg-yellow-500">{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
