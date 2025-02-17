import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InfoHeading from './Home/InfoDisplay/InfoHeading';

const Info = () => {
  const [selection, setSelection] = React.useState('resumetemplate'); // Match with an existing value

  const handleChange = (event, newSelection) => {
    if (newSelection !== null) {
      setSelection(newSelection);
    }
  };

  const buttonStyles = "!text-[#346779] !font-semibold !px-6 !py-3 !border-[#346779]";

  return (
    <div className="text-center mt-8 px-4">
      {/* Heading */}
      <InfoHeading />

      {/* Horizontal Menu */}
      <div className="flex justify-center mt-6">
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
      </div>
    </div>
  );
};

export default Info;
