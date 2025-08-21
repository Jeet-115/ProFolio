import React from 'react';
import './ResumeNameInput.css';

const ResumeNameInput = ({ value, onChange, placeholder = "Enter your resume name..." }) => {
  return (
    <div className="resume-input-wrapper">
      <div className="input-container">
        <input 
          className="input" 
          name="resumeName" 
          type="text" 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default ResumeNameInput;
