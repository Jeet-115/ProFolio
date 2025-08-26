import React from 'react';
import styled from 'styled-components';

/*
  ViewProfileButton (Recruiter themed)
  - Compact circular icon button inside a subtle container, amber-accented
  - Props: { onClick, title }
*/
const ViewProfileButton = ({ onClick, title = 'View Profile' }) => {
  return (
    <Wrapper>
      <div className="container">
        <button
          type="button"
          title={title}
          aria-label={title}
          className="iconBtn"
          onClick={onClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    display: inline-flex; /* shrink-wrap */
    background: transparent; /* remove square BG */
    border: 0;
    padding: 0;
    box-shadow: none;
  }

  .iconBtn {
    color: #FDE68A; /* light accent */
    border: 1px solid transparent;
    background: rgba(245, 158, 11, 0.12); /* amber tint */
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 30px; /* match bookmark height */
    width: 30px;
    padding: 0;
    transition: all .2s ease;
    box-shadow: 0 2px 6px rgba(245, 158, 11, 0.25);
  }

  .icon { width: 18px; height: 18px; }

  .iconBtn:hover {
    color: #0A0A0A;
    background: #F59E0B; /* amber */
    border-color: #FDE68A; /* light accent */
    box-shadow: 0 6px 16px rgba(245, 158, 11, 0.45);
    transform: translateY(-1px);
  }

  .iconBtn:active {
    transform: translateY(0);
    box-shadow: 0 3px 10px rgba(245, 158, 11, 0.35);
  }
`;

export default ViewProfileButton;
