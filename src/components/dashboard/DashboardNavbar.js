"use client";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function DashboardNavbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md px-6 py-4 flex justify-between items-center"
    >
      <h2 className="text-xl font-bold text-[#dc2626]">Prygo Dashboard</h2>
      <div className="flex items-center gap-4">
        <UserButton />
      </div>
    </motion.nav>
  );
}
