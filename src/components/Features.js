"use client";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { Truck, Clock, Shield } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Your packages reach their destination in record time with our optimized routes.",
  },
  {
    icon: Clock,
    title: "24/7 Tracking",
    description: "Track your shipments anytime with real-time updates and alerts.",
  },
  {
    icon: Shield,
    title: "Secure Handling",
    description: "We handle every package with care ensuring safety from start to finish.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
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
          Why Choose <span className="text-black">Prygo?</span>
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mt-3 max-w-2xl">
          Our features are built to give you the fastest, safest, and most reliable delivery experience.
        </p>
      </motion.div>

      {/* Features Grid / Flow */}
      <div className="flex flex-col md:flex-row justify-between gap-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4"
            >
              <div className="p-4 rounded-full bg-[#dc2626]/10 text-[#dc2626] inline-flex">
                <Icon size={32} />
              </div>
              <h3 className="text-xl font-medium text-black">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
