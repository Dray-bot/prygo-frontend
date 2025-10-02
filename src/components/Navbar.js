"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (href) => {
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 90 }}
      className={`${poppins.className} fixed w-full top-0 left-0 z-50 bg-white/90 backdrop-blur-md transition-all ${
        scrolled ? "shadow-lg py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo with subtle animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <rect x="1" y="3" width="16" height="13" fill="#dc2626" />
            <rect x="17" y="8" width="6" height="8" fill="#000" />
            <circle cx="5" cy="19" r="2" fill="#000" />
            <circle cx="19" cy="19" r="2" fill="#000" />
          </motion.svg>
          <span className="font-bold text-2xl tracking-tight text-[#dc2626]">
            Prygo
          </span>
        </motion.div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-black">
          {links.map((link) => (
            <motion.li
              key={link.name}
              whileHover={{ scale: 1.1, color: "#dc2626" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                onClick={() => handleScrollTo(link.href)}
                className="transition-colors focus:outline-none"
              >
                {link.name}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href="/sign-in"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-semibold border border-black rounded-lg text-black hover:bg-black/10 transition"
          >
            Sign In
          </motion.a>
          <motion.a
            href="/sign-up"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#dc2626] text-white hover:bg-[#b91c1c] transition"
          >
            Get Started
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg px-6 py-4 space-y-6"
          >
            <ul className="flex flex-col gap-4 font-medium text-black">
              {links.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ scale: 1.05, color: "#dc2626" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <button
                    onClick={() => handleScrollTo(link.href)}
                    className="transition-colors focus:outline-none"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <motion.a
                href="/sign-in"
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-semibold border border-black rounded-lg text-black hover:bg-black/10 transition"
              >
                Sign In
              </motion.a>
              <motion.a
                href="/sign-up"
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#dc2626] text-white hover:bg-[#b91c1c] transition"
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
