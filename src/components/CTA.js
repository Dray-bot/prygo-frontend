"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import lottie from "lottie-web";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function CTA() {
  const [lottieContainer, setLottieContainer] = useState(null);

  useEffect(() => {
    if (!lottieContainer) return;

    const anim = lottie.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/lottie/delivery-guy.json",
    });

    return () => anim.destroy();
  }, [lottieContainer]);

  return (
    <section
      id="cta"
      className={`${poppins.className} w-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white py-24 md:py-32 px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10`}
    >
      {/* Left Text */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col gap-5 text-center md:text-left"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-snug">
          Experience <span className="font-bold">Swift & Reliable Deliveries</span>
        </h2>
        <p className="text-white text-base sm:text-lg md:text-xl max-w-xs md:max-w-md mx-auto md:mx-0">
          Prygo ensures your packages reach safely and on time. Track, schedule, and manage deliveries with ultimate ease.
        </p>

        <div className="flex flex-row gap-4 mt-6 justify-center md:justify-start flex-wrap">
          <motion.a
            href="/sign-up"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-lg bg-white text-[#dc2626] font-medium hover:bg-gray-100 transition text-sm sm:text-base shadow-lg"
          >
            Get Started
          </motion.a>
          <motion.a
            href="/about"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 rounded-lg border-2 border-white text-white font-medium hover:bg-white/20 transition text-sm sm:text-base shadow-md"
          >
            Learn More
          </motion.a>
        </div>
      </motion.div>

      {/* Right Lottie */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center md:justify-end mb-6 md:mb-0"
      >
        <div
          ref={(el) => setLottieContainer(el)}
          className="w-52 h-52 sm:w-64 sm:h-64 md:w-96 md:h-96"
        ></div>
      </motion.div>
    </section>
  );
}
