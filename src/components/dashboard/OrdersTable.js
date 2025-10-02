"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Example data, replace with API call to backend
const exampleOrders = [
  {
    id: "ORD001",
    customer: "Emily R.",
    contact: "+1 234 567 8901",
    pickup: "123 Main St",
    dropoff: "456 Oak Ave",
    package: "Laptop",
    status: "Pending",
  },
  {
    id: "ORD002",
    customer: "Michael T.",
    contact: "+1 987 654 3210",
    pickup: "789 Pine St",
    dropoff: "321 Maple Rd",
    package: "Books",
    status: "In Transit",
  },
];

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Replace with fetch from backend
    setOrders(exampleOrders);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    // Update the backend here
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-800">All Orders</h3>
        <input
          type="text"
          placeholder="Search by Order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-64"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              {["Order ID", "Customer", "Contact", "Pickup", "Dropoff", "Package", "Status"].map((h) => (
                <th key={h} className="px-4 py-2 font-medium text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.contact}</td>
                <td className="px-4 py-2">{order.pickup}</td>
                <td className="px-4 py-2">{order.dropoff}</td>
                <td className="px-4 py-2">{order.package}</td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {["Pending", "In Transit", "Delivered"].map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
