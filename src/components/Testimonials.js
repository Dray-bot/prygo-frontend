"use client";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const testimonials = [
  {
    name: "Emily R.",
    role: "Small Business Owner",
    text: "Prygo transformed how I manage deliveries. Fast, reliable, and easy to track!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael T.",
    role: "Freelance Shopper",
    text: "The interface is clean and the service is excellent. I love it!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophie K.",
    role: "E-commerce Seller",
    text: "My customers love the quick delivery thanks to Prygo. Always reliable.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Daniel W.",
    role: "Courier",
    text: "Prygo makes my route management easier and faster. Everything flows smoothly.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className={`${poppins.className} bg-white w-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16`}
    >
      {/* Heading */}
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#dc2626]">
          Hear From Our <span className="text-black">Customers</span>
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
          Real feedback from businesses and individuals who trust Prygo daily.
        </p>
      </motion.div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="flex flex-col items-start gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#dc2626]"
              />
              <div>
                <h4 className="text-black font-medium">{t.name}</h4>
                <span className="text-gray-500 text-sm">{t.role}</span>
              </div>
            </div>
            <p className="text-gray-700 text-base border-l-2 border-[#dc2626] pl-4">
              {t.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile Horizontal Swipe */}
      <div className="md:hidden overflow-x-auto flex gap-6 snap-x snap-mandatory px-2">
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            className="flex-shrink-0 w-64 flex flex-col gap-4 snap-start bg-[#f9f9f9] p-4 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#dc2626]"
              />
              <div>
                <h4 className="text-black font-medium text-sm">{t.name}</h4>
                <span className="text-gray-500 text-xs">{t.role}</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm border-l-2 border-[#dc2626] pl-3">
              {t.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
