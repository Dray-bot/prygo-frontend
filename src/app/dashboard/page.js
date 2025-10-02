"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useUser();

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
            className="flex-1 text-gray-500 text-center md:text-left px-4 py-3 rounded-lg font-medium hover:bg-gray-100"
          >
            Track Orders
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 w-full">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center md:text-left">
          Welcome, {user?.firstName || "User"}!
        </h1>

        <div className="w-full bg-white shadow rounded-2xl p-6 overflow-auto">
          <h2 className="text-2xl font-semibold text-[#dc2626] mb-4 text-center">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Tracking ID",
                    "Customer",
                    "Contact",
                    "Pickup",
                    "Drop-off",
                    "Package",
                    "Status",
                  ].map((th) => (
                    <th
                      key={th}
                      className="px-4 py-2 border-b text-gray-800 text-base font-semibold"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dummyOrders.map((order) => (
                  <tr key={order.trackingId} className="hover:bg-gray-50 text-gray-600">
                    <td className="px-4 py-2 border-b font-medium">{order.trackingId}</td>
                    <td className="px-4 py-2 border-b">{order.customer}</td>
                    <td className="px-4 py-2 border-b">{order.contact}</td>
                    <td className="px-4 py-2 border-b">{order.pickup}</td>
                    <td className="px-4 py-2 border-b">{order.dropoff}</td>
                    <td className="px-4 py-2 border-b">{order.package}</td>
                    <td className="px-4 py-2 border-b">
                      <span
                        className={`px-3 py-1 rounded-lg text-white text-sm ${
                          order.status === "Pending"
                            ? "bg-yellow-500"
                            : order.status === "In Transit"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
