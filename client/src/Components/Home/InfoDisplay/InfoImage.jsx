import React from 'react';
import { motion } from 'framer-motion';

const fadeInLeft = {
  hidden: { opacity: 0, x: -90 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1, ease: 'easeOut', delay: 0.5 } // Added 1.5s delay
  },
};

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: delay + 0.5 }, // Added 1.5s initial delay
  },
});

const InfoImage = ({ selection, imageMap }) => {
  return (
    <motion.div
      key={selection}
      className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6"
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      variants={fadeInLeft}
      viewport={{ once: false, amount: 0.1 }}
    >
      {imageMap[selection].map((imgSrc, index) => (
        <motion.div
          key={index}
          className="relative group"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          variants={fadeInUp(index * 0.2)}
          viewport={{ once: false, amount: 0.1 }}
        >
          <motion.img
            src={imgSrc}
            alt={`Preview ${index + 1}`}
            className="w-full h-100 object-contain rounded-lg shadow-md transition-transform transform group-hover:scale-105"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default InfoImage;
