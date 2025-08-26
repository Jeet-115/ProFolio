import React from 'react';
import styled from 'styled-components';

/*
  Recruiter Contact Button (amber themed)
  Props: { onClick, children }
*/
const ContactButton = ({ onClick, children = 'Contact' }) => {
  return (
    <StyledWrapper>
      <button className="contactButton" onClick={onClick} type="button">
        {children}
        <div className="iconButton" aria-hidden>
          <svg height={20} width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" />
          </svg>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .contactButton {
    background: #F59E0B; /* amber */
    color: white;
    font-family: inherit;
    padding: 0.35em 2.4em 0.35em 0.9em;
    font-size: 14px;
    font-weight: 600;
    border-radius: 0.7em;
    border: none;
    cursor: pointer;
    letter-spacing: 0.03em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.2em -0.6em rgba(245, 158, 11, 0.55);
    overflow: hidden;
    position: relative;
    height: 2.2em;
    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
  }

  .iconButton {
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.9em;
    width: 1.9em;
    border-radius: 0.6em;
    box-shadow: 0.08em 0.08em 0.45em 0.16em rgba(245, 158, 11, 0.5);
    right: 0.25em;
    transition: all 0.3s;
    color: #0A0A0A; /* icon on amber */
    background: #FDE68A; /* accent light */
  }

  .contactButton:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em #D97706; /* amber hover shadow */
    background: #D97706; /* darker amber */
  }

  .contactButton:active {
    transform: translate(0.03em, 0.03em);
    box-shadow: 0.05em 0.05em #B45309; /* deeper amber */
  }
`;

export default ContactButton;
