import React, { useState, useCallback } from 'react';
import InfoHeading from './InfoDisplay/InfoHeading';
import InfoMenu from './InfoDisplay/InfoMenu';
import InfoImage from './InfoDisplay/InfoImage';
import imageMap from './InfoDisplay/imageMap';

const Info = () => {
  const [selection, setSelection] = useState('resumetemplate');
  const [key, setKey] = useState(0);

  const handleChange = useCallback((event, newSelection) => {
    if (newSelection !== null) {
      setSelection(newSelection);
      setKey((prevKey) => prevKey + 1);
    }
  }, []);

  return (
    <div className="text-center mt-8 px-2 sm:px-4 pb-10">
      <InfoHeading />
      <InfoMenu selection={selection} handleChange={handleChange} />
      <InfoImage key={key} selection={selection} imageMap={imageMap} />
    </div>
  );
};

export default Info;
