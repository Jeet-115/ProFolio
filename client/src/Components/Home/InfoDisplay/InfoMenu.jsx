import React from 'react';
import { motion } from 'framer-motion';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const InfoMenu = ({ selection, handleChange }) => {
  const buttonStyles = "!text-[#346779] !font-semibold !px-6 !py-3 !border-[#346779]";

  return (
    <motion.div
      className="flex justify-center mt-6"
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      variants={fadeInUp}
      viewport={{ once: false, amount: 0.1 }}
    >
      <ToggleButtonGroup
        color="primary"
        value={selection}
        exclusive
        onChange={handleChange}
        aria-label="Options"
      >
        <ToggleButton value="resumetemplate" className={buttonStyles}>
          Resume Templates
        </ToggleButton>
        <ToggleButton value="resumebuilder" className={buttonStyles}>
          Resume Builder
        </ToggleButton>
        <ToggleButton value="portfolio" className={buttonStyles}>
          Portfolio
        </ToggleButton>
        <ToggleButton value="resumereview" className={buttonStyles}>
          Resume Review
        </ToggleButton>
      </ToggleButtonGroup>
    </motion.div>
  );
};

export default InfoMenu;
