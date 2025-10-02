"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Hero() {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.from(".hero-text", {
      y: 60,
      opacity: 0,
      rotation: 5,
      duration: 1.2,
      stagger: 0.3,
      ease: "power4.out",
    });

    gsap.from(imageRef.current, {
      scale: 0.7,
      opacity: 0,
      rotation: -3,
      duration: 1.5,
      ease: "power4.out",
    });
  }, []);

  return (
    <section
      id="home"
      className={`${poppins.className} bg-white flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 py-20 md:py-36 gap-12 relative`}
    >
      {/* Left Content */}
      <div className="flex-1 flex flex-col gap-6 text-center md:text-left relative z-20">
        <motion.h1
          className="hero-text text-4xl sm:text-5xl md:text-6xl font-bold text-[#dc2626] leading-snug "
        >
          Swift & Reliable{" "}
          <span className="text-black drop-shadow-[0_5px_25px_rgba(0,0,0,0.3)]">
            Delivery Services
          </span>
        </motion.h1>
        <motion.p
          className="hero-text text-gray-700 text-base sm:text-lg md:text-xl drop-shadow-[0_3px_10px_rgba(0,0,0,0.15)]"
        >
          Prygo ensures your packages reach their destination safely and on time.
          Track shipments, schedule deliveries, and enjoy hassle-free service.
        </motion.p>

        <div className="flex flex-row gap-4 mt-6 justify-center md:justify-start flex-wrap z-30">
          <motion.a
            href="/sign-up"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
            className="px-6 py-3 rounded-xl bg-[#dc2626] text-white font-semibold shadow-[0_15px_40px_rgba(220,38,38,0.6)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.8)] transition-all text-sm sm:text-base"
          >
            Get Started
          </motion.a>
          <motion.a
            href="/about"
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95, rotate: 1 }}
            className="px-6 py-3 rounded-xl border-2 border-black text-black font-semibold shadow-[0_12px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.6)] transition-all text-sm sm:text-base"
          >
            Learn More
          </motion.a>
        </div>
      </div>

      {/* Right Image */}
      <motion.div
        ref={imageRef}
        className="flex-1 flex justify-center items-center relative w-full md:max-w-md mb-10 md:mb-0"
      >
        <div className="rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.35)] rotate-[-2deg]">
          <img
            src="https://retail-merchandiser.com/wp-content/uploads/sites/8/2024/02/Pick-up-and-delivery-services-image.jpeg"
            alt="Delivery Illustration"
            className="w-72 h-72 sm:w-80 sm:h-80 md:w-full md:h-full object-cover rounded-3xl"
          />
        </div>
        {/* Extra floating glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#dc2626]/40 rounded-full blur-3xl animate-pulse"></div>
      </motion.div>
    </section>
  );
}
