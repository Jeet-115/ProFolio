import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const InfoHeading = () => {
  return (
    <motion.h2
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#ffffff] px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={fadeInUp}
    >
      Land Your <span className="text-[#346779]">Dream Job</span> with Resumes That{' '}
      <span className="text-[#346779]">Stand Out</span>—<span className="text-[#346779]">Fast</span>,{' '}
      <span className="text-[#346779]">Easy</span>, and <span className="text-[#346779]">Free!</span>
    </motion.h2>
  );
};

export default InfoHeading;
