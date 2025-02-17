import React from 'react'
import { motion } from "framer-motion";

const CTAHeading = () => {
  return (
    <>
      <h2 className="text-4xl font-bold text-white text-left mb-4">
        Call to Action
      </h2>
      <motion.div
        className="h-1 bg-[#1ABC9C] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "150px" }}
        transition={{
          duration: 1.5, // Length of each expand/contract cycle
          repeat: Infinity, // Infinite looping
          repeatType: "reverse", // Expands and then contracts smoothly
          ease: "easeInOut", // Smooth easing for natural motion
        }}
      />
    </>
  )
}

export default CTAHeading
