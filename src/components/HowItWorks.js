"use client";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { Clipboard, Package, Truck } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const steps = [
  {
    icon: Clipboard,
    title: "Place Your Order",
    description: "Easily schedule your pickup and provide delivery details in seconds.",
  },
  {
    icon: Package,
    title: "We Pick It Up",
    description: "Our team collects your package safely and prepares it for delivery.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Your package is delivered to the destination on time, every time.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={`${poppins.className} bg-white w-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16`}
    >
      {/* Heading */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#dc2626]">
          How It <span className="text-black">Works</span>
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mt-3 max-w-2xl">
          Just 3 simple steps to get your packages delivered safely and on time.
        </p>
      </motion.div>

      {/* Steps Flow */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-12 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4 relative"
            >
              {/* Step Number Circle */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#dc2626] text-white font-semibold text-lg mb-2">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="p-4 rounded-full bg-[#dc2626]/10 text-[#dc2626] inline-flex mb-2">
                <Icon size={28} />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-medium text-black">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>

              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 right-[-50%] w-[100%] h-1 bg-[#dc2626]/20 z-0"></div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

