"use client";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plans = [
  {
    title: "Basic",
    price: "$10/mo",
    features: [
      "Schedule up to 5 deliveries",
      "Track packages in real-time",
      "Basic support",
    ],
    highlight: false,
  },
  {
    title: "Pro",
    price: "$30/mo",
    features: [
      "Unlimited deliveries",
      "Priority tracking",
      "Premium support",
    ],
    highlight: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "Team management",
      "Dedicated account manager",
      "Custom solutions",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className={`${poppins.className} bg-white w-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16`}
    >
      {/* Heading */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#dc2626]">
          Pricing <span className="text-black">Plans</span>
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
          Simple and transparent pricing. Choose the plan that fits your delivery needs.
        </p>
      </motion.div>

      {/* Pricing Options */}
      <motion.div
        className="flex gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-4"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            className={`flex-shrink-0 flex flex-col gap-6 p-6 md:p-10 rounded-xl shadow-lg border min-w-[220px] md:min-w-[auto] ${
              plan.highlight
                ? "border-[#dc2626] bg-[#dc2626]/5"
                : "border-gray-200 bg-white"
            } hover:scale-105 transition-transform`}
          >
            <h3
              className={`text-xl md:text-2xl font-semibold ${
                plan.highlight ? "text-[#dc2626]" : "text-black"
              }`}
            >
              {plan.title}
            </h3>
            <p className="text-2xl md:text-3xl font-semibold text-black">
              {plan.price}
            </p>
            <ul className="flex flex-col gap-2">
              {plan.features.map((feature) => (
                <li key={feature} className="text-gray-700 text-base md:text-lg">
                  {feature}
                </li>
              ))}
            </ul>
            <motion.a
              href="/get-started"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-4 px-4 py-2 rounded-lg text-white font-medium text-center transition ${
                plan.highlight
                  ? "bg-[#dc2626] hover:bg-[#b91c1c]"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              Choose Plan
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
