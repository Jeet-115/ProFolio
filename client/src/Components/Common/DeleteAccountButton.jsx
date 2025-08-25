import React from 'react';

const DeleteAccountButton = ({ onClick, label = 'Delete Account', className = '', size = 'md' }) => {
  const isSm = size === 'sm';
  const padX = isSm ? 'px-[1.25em]' : 'px-[2em]';
  const padY = isSm ? 'py-[0.6em]' : 'py-[1em]';
  const gap = isSm ? 'gap-[0.4em]' : 'gap-[0.5em]';
  const textSize = isSm ? 'text-sm' : '';
  const iconSize = isSm ? 'h-[1.2em] w-[1.2em]' : 'h-[1.5em] w-[1.5em]';

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={
        `flex h-fit w-fit items-center justify-center ${gap} rounded-full ` +
        `bg-[#c60808] ${padX} ${padY} ${textSize} text-white ` +
        `shadow-[inset_0px_-4px_4px_0px_#f05b5b,0px_0px_0px_2px_#f9d1d1,0px_4px_0px_0px_#A60000] ` +
        `duration-[250ms] hover:translate-y-[0.25em] active:translate-y-[0.5em] ` +
        `active:shadow-[inset_0px_-4px_4px_0px_#f05b5b,0px_0px_0px_2px_#f9d1d1] ` +
        className
      }
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSize}`}
      >
        <g strokeWidth={0} />
        <g strokeLinecap="round" strokeLinejoin="round" />
        <g>
          <circle cx={12} cy={12} r={10} stroke="#fff" strokeWidth="1.5" />
          <path
            d="M9 17C9.85038 16.3697 10.8846 16 12 16C13.1154 16 14.1496 16.3697 15 17"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <ellipse cx={15} cy="10.5" rx={1} ry="1.5" fill="#fff" />
          <ellipse cx={9} cy="10.5" rx={1} ry="1.5" fill="#fff" />
        </g>
      </svg>
      <p className="[text-shadow:0px_1px_1px_0px_#950000]">{label}</p>
    </button>
  );
};

export default DeleteAccountButton;
