import React from "react";
import { motion } from "framer-motion";
import CTALeftDiv from "./CTA/CTALeftDiv";
import CTARightDiv from "./CTA/CTARightDiv";
import CTAHeading from "./CTA/CTAHeading";

const popUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const CTA = () => {
  return (
    <motion.div
      className="p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg mt-[20px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={popUp}
    >
      {/* Heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"   
        viewport={{ once: false, amount: 0.2 }}
        variants={popUp}
      >
        <CTAHeading />
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <CTALeftDiv />
        <CTARightDiv />
      </div>
    </motion.div>
  );
};

export default CTA;
