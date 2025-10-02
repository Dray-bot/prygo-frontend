"use client";
import { Poppins } from "next/font/google";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function DashboardLayout({ children }) {
  return (
    <div className={`${poppins.className} min-h-screen bg-gray-50`}>
      <DashboardNavbar />
      <main className="px-6 py-8">{children}</main>
    </div>
  );
}
