import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } 
  },
};

const CTARightDiv = () => {
  const [flipped, setFlipped] = useState(false);

  // Automatically flip every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <motion.div
      className="md:w-1/2 flex justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={slideInRight}
    >
      {/* Flip Card Container */}
      <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] lg:h-[450px] lg:w-[450px] perspective-1000">
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            transformStyle: "preserve-3d", // Needed for 3D flip effect
          }}
        >
          {/* Front Side (Image 1) */}
          <div
            className="absolute w-full h-full backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src="/cta1.png" // Replace with your image path
              alt="Portfolio Example 1"
              className="rounded-xl h-full w-full drop-shadow-2xl"
            />
          </div>

          {/* Back Side (Image 2) */}
          <div
            className="absolute w-full h-full rotate-y-180 backface-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <img
              src="/cta2.png" // Replace with your image path
              alt="Portfolio Example 2"
              className="rounded-xl h-full w-full drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CTARightDiv;
