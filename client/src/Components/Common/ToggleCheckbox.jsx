import React from 'react';

/*
  ToggleCheckbox
  - A stylized checkbox based on user-provided markup
  - Props: { id, name, checked, onChange, className }
*/
const ToggleCheckbox = ({ id, name, checked = false, onChange, className = '' }) => {
  const inputId = id || name || 'toggle-checkbox';
  return (
    <label
      htmlFor={inputId}
      className={`relative h-8 w-8 rounded-xl bg-[#b3fffa] shadow-[inset_-1px_1px_4px_0px_#f0fffe,inset_1px_-1px_4px_0px_#00bdb0,-1px_2px_4px_0px_#00bdb0] ${className}`}
    >
      <input
        type="checkbox"
        name={name}
        id={inputId}
        className="peer appearance-none"
        checked={!!checked}
        onChange={onChange}
      />
      <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#ccfffc] shadow-[inset_-1px_1px_4px_0px_#f0fffe,inset_1px_-1px_4px_0px_#00bdb0,-1px_1px_2px_0px_#00bdb0] duration-[200ms] peer-checked:shadow-[inset_1px_-1px_4px_0px_#f0fffe,inset_-1px_1px_4px_0px_#00bdb0]"></span>
      <svg
        fill="#00756d"
        viewBox="-3.2 -3.2 38.40 38.40"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 peer-checked:opacity-0"
        aria-hidden="true"
      >
        <g strokeWidth={0} />
        <g strokeLinecap="round" strokeLinejoin="round" />
        <g>
          <path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z" />
        </g>
      </svg>
      <svg
        fill="#00756d"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100"
        aria-hidden="true"
      >
        <g strokeWidth={0} />
        <g strokeLinecap="round" strokeLinejoin="round" />
        <g>
          <path d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z" />
        </g>
      </svg>
    </label>
  );
};

export default ToggleCheckbox;
