import React from "react";
import styled from "styled-components";

// Recruiter-themed animated Send button (amber/plum)
// Props: onClick, className, children (default: "Send")
const SendInvitationButton = ({ onClick, className, children = "Send" }) => {
  return (
    <StyledWrapper className={className}>
      <button onClick={onClick} type="button" aria-label="Send Invitation">
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20}>
              <path fill="none" d="M0 0h24v24H0z" />
              <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
            </svg>
          </div>
        </div>
        <span>{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 0.95rem;
    background: linear-gradient(135deg, rgba(245,158,11,0.95), rgba(217,119,6,0.95)); /* amber to darker amber */
    color: white;
    padding: 0.6em 0.9em;
    padding-left: 0.8em;
    display: flex;
    align-items: center;
    border: 1px solid rgba(253,230,138,0.35); /* accent border */
    border-radius: 9999px;
    overflow: hidden;
    transition: all 0.2s ease;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(245,158,11,0.25), inset 0 0 0 1px rgba(255,255,255,0.08);
    backdrop-filter: saturate(140%);
  }

  button span {
    display: block;
    margin-left: 0.35em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(245,158,11,0.32), inset 0 0 0 1px rgba(255,255,255,0.12);
  }

  button:active {
    transform: scale(0.97);
  }

  button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:hover svg {
    transform: translateX(1.1em) rotate(45deg) scale(1.05);
  }

  button:hover span {
    transform: translateX(3.6em);
  }

  @keyframes fly-1 {
    from { transform: translateY(0.1em); }
    to   { transform: translateY(-0.1em); }
  }
`;

export default SendInvitationButton;
