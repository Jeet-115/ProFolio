import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    <div className="md:w-1/2 flex justify-center">
      {/* Flip Card Container */}
      <div className="relative h-[450px] w-[450px] perspective-1000">
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
    </div>
  );
};

export default CTARightDiv;
