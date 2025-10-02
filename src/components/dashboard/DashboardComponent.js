"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DashboardComponent() {
  const [orders, setOrders] = useState([
    {
      trackingId: "PRY123456",
      customer: "John Doe",
      contact: "+234 800 123 4567",
      pickup: "Lagos",
      dropoff: "Abuja",
      package: "Documents",
      status: "Pending",
    },
  ]);

  const [formData, setFormData] = useState({
    customer: "",
    contact: "",
    pickup: "",
    dropoff: "",
    package: "",
  });

  const [trackingId, setTrackingId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const generateTrackingId = () => "PRY" + Math.floor(100000 + Math.random() * 900000);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { ...formData, trackingId: generateTrackingId(), status: "Pending" };
    setOrders([newOrder, ...orders]);
    setFormData({ customer: "", contact: "", pickup: "", dropoff: "", package: "" });
    setActiveSection("orders"); // show orders after creating
  };

  const handleTrack = (e) => {
    e.preventDefault();
    const found = orders.find((o) => o.trackingId.toUpperCase() === trackingId.toUpperCase());
    if (found) {
      setTrackedOrder(found);
      setError("");
    } else {
      setTrackedOrder(null);
      setError("No order found with this Tracking ID");
    }
  };

  const sections = [
    { key: "orders", label: "Orders" },
    { key: "create", label: "Create Order" },
    { key: "track", label: "Track Order" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        className="fixed sm:static top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transition-transform"
      >
        <div className="px-6 py-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-[#dc2626]">Dashboard</h2>
          <button
            className="sm:hidden px-2 py-1 bg-gray-200 rounded-md"
            onClick={() => setSidebarOpen(false)}
          >
            Close
          </button>
        </div>
        <nav className="mt-6 flex flex-col gap-2">
          {sections.map((sec) => (
            <button
              key={sec.key}
              onClick={() => {
                setActiveSection(sec.key);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-6 py-3 font-medium rounded-r-lg transition ${
                activeSection === sec.key
                  ? "bg-[#dc2626] text-white"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Sidebar Toggle for Mobile */}
      <button
        className="sm:hidden fixed top-4 left-4 z-30 px-3 py-2 bg-[#dc2626] text-white rounded-md shadow-md"
        onClick={() => setSidebarOpen(true)}
      >
        Menu
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 ml-0 sm:ml-64">
        {activeSection === "orders" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#dc2626]">Orders</h1>
            <div className="overflow-x-auto shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    {["Tracking ID", "Customer", "Contact", "Pickup", "Drop-off", "Package", "Status"].map(
                      (th) => (
                        <th
                          key={th}
                          className="px-5 py-3 border-b text-gray-700 text-sm sm:text-base font-semibold"
                        >
                          {th}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.trackingId} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-3 border-b text-gray-800 font-medium">{order.trackingId}</td>
                      <td className="px-5 py-3 border-b text-gray-800">{order.customer}</td>
                      <td className="px-5 py-3 border-b text-gray-800">{order.contact}</td>
                      <td className="px-5 py-3 border-b text-gray-800">{order.pickup}</td>
                      <td className="px-5 py-3 border-b text-gray-800">{order.dropoff}</td>
                      <td className="px-5 py-3 border-b text-gray-800">{order.package}</td>
                      <td className="px-5 py-3 border-b">
                        <motion.span
                          className={`px-3 py-1 rounded-lg text-white ${
                            order.status === "Pending"
                              ? "bg-yellow-500 shadow-[0_5px_20px_rgba(234,179,8,0.4)]"
                              : order.status === "In Transit"
                              ? "bg-blue-500 shadow-[0_5px_20px_rgba(59,130,246,0.4)]"
                              : "bg-green-500 shadow-[0_5px_20px_rgba(34,197,94,0.4)]"
                          }`}
                        >
                          {order.status}
                        </motion.span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === "create" && (
          <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] space-y-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Create New Order</h2>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              {["customer", "contact", "pickup", "dropoff", "package"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                />
              ))}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                className="sm:col-span-2 px-6 py-3 bg-[#dc2626] text-white font-semibold rounded-xl shadow-[0_10px_40px_rgba(220,38,38,0.5)]"
              >
                Create Order & Generate Tracking ID
              </motion.button>
            </form>
          </div>
        )}

        {activeSection === "track" && (
          <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Track Your Order</h2>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleTrack}>
              <input
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 border border-gray-300 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                placeholder="Enter Tracking ID"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-[#dc2626] text-white font-semibold rounded-xl shadow-[0_10px_40px_rgba(220,38,38,0.5)]"
              >
                Search
              </motion.button>
            </form>

            {error && <p className="text-red-500 font-medium">{error}</p>}

            {trackedOrder && (
              <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.05)]">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Order Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                  <p>
                    <span className="font-medium">Tracking ID:</span> {trackedOrder.trackingId}
                  </p>
                  <p>
                    <span className="font-medium">Customer:</span> {trackedOrder.customer}
                  </p>
                  <p>
                    <span className="font-medium">Contact:</span> {trackedOrder.contact}
                  </p>
                  <p>
                    <span className="font-medium">Pickup:</span> {trackedOrder.pickup}
                  </p>
                  <p>
                    <span className="font-medium">Drop-off:</span> {trackedOrder.dropoff}
                  </p>
                  <p>
                    <span className="font-medium">Package:</span> {trackedOrder.package}
                  </p>
                  <p className="sm:col-span-2">
                    <span className="font-medium">Status:</span>{" "}
                    <motion.span
                      className={`px-3 py-1 rounded-lg text-white ${
                        trackedOrder.status === "Pending"
                          ? "bg-yellow-500 shadow-[0_5px_20px_rgba(234,179,8,0.4)]"
                          : trackedOrder.status === "In Transit"
                          ? "bg-blue-500 shadow-[0_5px_20px_rgba(59,130,246,0.4)]"
                          : "bg-green-500 shadow-[0_5px_20px_rgba(34,197,94,0.4)]"
                      }`}
                    >
                      {trackedOrder.status}
                    </motion.span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
