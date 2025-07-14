import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const InfoMenu = ({ selection, handleChange }) => {
  const buttonStyles =
    'px-6 py-3 border-2 rounded-full font-semibold text-[#346779] border-[#346779] bg-white mx-1 transition-colors duration-200 focus:outline-none ' +
    'hover:bg-[#346779] hover:text-white';
  const selectedStyles = 'bg-[#346779] text-white';

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
      <div className="flex space-x-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={
              buttonStyles + (selection === opt.value ? ' ' + selectedStyles : '')
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
