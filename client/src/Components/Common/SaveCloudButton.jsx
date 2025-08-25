import React from 'react';
import styled from 'styled-components';

const SaveCloudButton = ({
  onClick,
  label = 'Save',
  className = '',
  // style props to preserve earlier color/size when needed
  textColor = '#ffffff',
  fillColor = 'rgb(155, 153, 153)',
  bg = '#212121',
  hoverBg = '#000000',
  fontSize = '20px',
  paddingY = '0.5rem',
  paddingX = '0.75rem',
  borderRadius = '15px',
  iconSize = 30,
}) => {
  return (
    <StyledWrapper
      className={className}
      $textColor={textColor}
      $fillColor={fillColor}
      $bg={bg}
      $hoverBg={hoverBg}
      $fontSize={fontSize}
      $paddingY={paddingY}
      $paddingX={paddingX}
      $borderRadius={borderRadius}
    >
      <button onClick={onClick} aria-label={label}>
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={iconSize} height={iconSize} className="icon">
              <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z" />
            </svg>
          </div>
        </div>
        <span>{label}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: ${props => props.$fontSize};
    background: ${props => props.$bg};
    color: ${props => props.$textColor};
    fill: ${props => props.$fillColor};
    padding: ${props => props.$paddingY} ${props => props.$paddingX};
    padding-left: calc(${props => props.$paddingX} - 0.15rem);
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: ${props => props.$borderRadius};
    font-weight: 1000;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover {
    background: ${props => props.$hoverBg};
  }

  button:hover .svg-wrapper {
    transform: scale(1.25);
    transition: 0.5s linear;
  }

  button:hover svg {
    transform: translateX(1.2em) scale(1.1);
    fill: #fff;
  }

  button:hover span {
    opacity: 0;
    transition: 0.5s linear;
  }

  button:active {
    transform: scale(0.95);
  }
`;

export default SaveCloudButton;
