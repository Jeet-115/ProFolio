import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const InfoMenu = ({ selection, handleChange }) => {
  const buttonStyles =
    'px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 border-2 rounded-full font-semibold text-[#346779] border-[#346779] bg-white transition-colors duration-200 focus:outline-none text-xs sm:text-sm md:text-base ' +
    'hover:bg-[#346779] hover:text-white';
  const selectedStyles = 'bg-[#346779] text-black';

  const options = [
    { value: 'resumetemplate', label: 'Resume Templates' },
    { value: 'resumebuilder', label: 'Resume Builder' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'resumereview', label: 'Resume Review' },
  ];

  return (
    <motion.div
      className="flex justify-center mt-6"
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      variants={fadeInUp}
      viewport={{ once: false, amount: 0.1 }}
    >
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 md:space-x-2 md:flex-nowrap md:gap-0">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={
              buttonStyles + ((selection === opt.value && opt.value !== 'resumetemplate') ? ' ' + selectedStyles : '')
            }
            onClick={() => handleChange(null, opt.value)}
            aria-pressed={selection === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default InfoMenu;