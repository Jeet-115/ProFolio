import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
  },
};

const fadeInUp = (delay) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: delay },
  },
});

const CTALeftDiv = () => {
  return (
    <motion.div
      className="md:w-1/2 text-center md:text-left mb-6 md:mb-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={slideInLeft}
    >
      {/* Paragraph - Fades in after slide-in */}
      <motion.p className="text-lg text-gray-200" variants={fadeInUp(0.5)}>
      Take your career to the next level with our AI-powered Resume & Portfolio Generator! Create professional, ATS-friendly resumes and stunning portfolios in minutes. Stand out from the competition with personalized templates, smart keyword suggestions, and seamless customization. Whether you're a job seeker or a freelancer, our tool ensures you make a lasting impression. Start building your perfect resume and portfolio today—your dream opportunity is just a click away!
      </motion.p>

      {/* Buttons - Fading in one by one */}
      <div className="flex justify-center space-x-14 mt-8">
        <Link to="/login">
          <motion.button
            className="px-6 py-3 bg-[#346779] text-white rounded-2xl text-lg hover:bg-[#1F3B45] transition duration-300 hover:shadow-[0_0_5px_0px_#ffffff]"
            variants={fadeInUp(0.6)}
          >
            My Projects
          </motion.button>
        </Link>
        <Link to="/signup">
          <motion.button
            className="px-6 py-3 bg-transparent border-2 border-[#346779] text-[#346779] rounded-2xl text-lg hover:bg-[#1F3B45] hover:text-white transition duration-300 hover:shadow-[0_0_5px_0px_#ffffff]"
            variants={fadeInUp(0.7)}
          >
            Create Projects
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CTALeftDiv;
