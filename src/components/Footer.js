"use client";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Footer() {
  return (
    <footer className={`${poppins.className} bg-white w-full relative`}>
      {/* Wavy top divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.73,22,103.37,29.11,158,18.48,72.73-14.68,136-55.71,207-69.91,70.2-14,138,4.07,208,22.63,78,20,154,39,232,36.91,66-1.79,128-21.37,193-34.57,69-14.14,136-12.8,203,6.84,55,16.87,110,45.3,165,40.69,48-4,91-36,137-51.21V0Z"
            fill="#f3f4f6"
            opacity="0.5"
          />
          <path
            d="M0,0V15.81C47.73,36,103.37,55.61,158,53.17c72.73-3.34,136-34.35,207-46.55,70.2-12,138-1.57,208,10.99,78,14,154,31,232,28.91,66-1.79,128-12.37,193-25.57,69-14.14,136-12.8,203,6.84,55,16.87,110,35.3,165,30.69,48-4,91-36,137-51.21V0Z"
            fill="#f3f4f6"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between gap-12 relative z-10">
        {/* About */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Prygo</h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Swift and reliable door-to-door delivery service. Track your shipments and manage deliveries effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 flex flex-col gap-3">
          <h4 className="text-lg font-semibold mb-2 text-gray-900">Quick Links</h4>
          {["Home", "Features", "Pricing", "About"].map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ x: 5, color: "#dc2626" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-gray-600 text-sm md:text-base hover:underline"
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex-1 flex flex-col gap-3">
          <h4 className="text-lg font-semibold mb-2 text-gray-900">Contact</h4>
          <p className="text-gray-600 text-sm md:text-base">support@prygo.com</p>
          <p className="text-gray-600 text-sm md:text-base">+1 234 567 8901</p>
          <div className="flex gap-4 mt-2">
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-600">
              <Twitter className="w-5 h-5 hover:text-[#1DA1F2] transition" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-600">
              <Instagram className="w-5 h-5 hover:text-[#C13584] transition" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-600">
              <Facebook className="w-5 h-5 hover:text-[#1877F2] transition" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-600">
              <Linkedin className="w-5 h-5 hover:text-[#0A66C2] transition" />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500 text-sm relative z-10">
        &copy; {new Date().getFullYear()} Prygo. All rights reserved. Made by Dray
      </div>
    </footer>
  );
}
