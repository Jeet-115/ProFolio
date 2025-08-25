import React from "react";
import styled from "styled-components";

/*
  AnimatedChecklist
  - Props:
    items: Array<{ name: string; label: string; checked: boolean; value?: string | number }>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  - Renders a list of animated checkboxes using the provided CSS/animation.
*/
const AnimatedChecklist = ({ items = [], onChange }) => {
  return (
    <StyledWrapper>
      <div id="checklist">
        {items.map((item, idx) => {
          const id = `acb_${idx}`;
          return (
            <React.Fragment key={item.name}>
              <input
                defaultValue={item.value ?? idx + 1}
                name={item.name}
                type="checkbox"
                id={id}
                checked={!!item.checked}
                onChange={onChange}
              />
              <label htmlFor={id}>{item.label}</label>
            </React.Fragment>
          );
        })}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  #checklist {
    --background: rgba(255, 255, 255, 0.06);
    --text: #ffffff; /* bold white text */
    --check: #22d3ee; /* teal-300 accent */
    --disabled: rgba(255, 255, 255, 0.35);
    --width: 100%;
    --height: auto;
    --border-radius: 12px;
    background: var(--background);
    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(8px) saturate(120%);
    -webkit-backdrop-filter: blur(8px) saturate(120%);
    padding: 18px 18px 18px 72px;
    display: grid;
    grid-template-columns: 30px auto;
    grid-auto-rows: minmax(28px, auto);
    align-items: center;
    justify-content: start;
    row-gap: 10px;
  }

  #checklist label {
    color: var(--text);
    font-weight: 700;
    position: relative;
    cursor: pointer;
    display: grid;
    align-items: center;
    width: fit-content;
    transition: color 0.3s ease;
    margin-right: 20px;
  }

  #checklist label::before, #checklist label::after {
    content: "";
    position: absolute;
  }

  #checklist label::before {
    height: 2px;
    width: 8px;
    left: -27px;
    background: var(--check);
    border-radius: 2px;
    transition: background 0.3s ease;
  }

  #checklist label:after {
    height: 4px;
    width: 4px;
    top: 8px;
    left: -25px;
    border-radius: 50%;
  }

  #checklist input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    height: 15px;
    width: 15px;
    outline: none;
    border: 0;
    margin: 0 15px 0 0;
    cursor: pointer;
    background: transparent;
    display: grid;
    align-items: center;
    margin-right: 20px;
  }

  #checklist input[type="checkbox"]::before, #checklist input[type="checkbox"]::after {
    content: "";
    position: absolute;
    height: 2px;
    top: auto;
    background: var(--check);
    border-radius: 2px;
  }

  #checklist input[type="checkbox"]::before {
    width: 0px;
    right: 60%;
    transform-origin: right bottom;
  }

  #checklist input[type="checkbox"]::after {
    width: 0px;
    left: 40%;
    transform-origin: left bottom;
  }

  #checklist input[type="checkbox"]:checked::before {
    animation: check-01 0.4s ease forwards;
  }

  #checklist input[type="checkbox"]:checked::after {
    animation: check-02 0.4s ease forwards;
  }

  #checklist input[type="checkbox"]:checked + label {
    color: var(--disabled);
    animation: move 0.3s ease 0.1s forwards;
  }

  #checklist input[type="checkbox"]:checked + label::before {
    background: var(--disabled);
    animation: slice 0.4s ease forwards;
  }

  #checklist input[type="checkbox"]:checked + label::after {
    animation: firework 0.5s ease forwards 0.1s;
  }

  @keyframes move {
    50% {
      padding-left: 8px;
      padding-right: 0px;
    }

    100% {
      padding-right: 4px;
    }
  }

  @keyframes slice {
    60% {
      width: 100%;
      left: 4px;
    }

    100% {
      width: 100%;
      left: -2px;
      padding-left: 0;
    }
  }

  @keyframes check-01 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }

    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }

    51% {
      width: 0px;
      top: 8px;
      transform: rotate(45deg);
    }

    100% {
      width: 5px;
      top: 8px;
      transform: rotate(45deg);
    }
  }

  @keyframes check-02 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }

    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }

    51% {
      width: 0px;
      top: 8px;
      transform: rotate(-45deg);
    }

    100% {
      width: 10px;
      top: 8px;
      transform: rotate(-45deg);
    }
  }

  @keyframes firework {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0;
    }

    30% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      box-shadow: 0 -15px 0 0px #4f29f0, 14px -8px 0 0px #4f29f0, 14px 8px 0 0px #4f29f0, 0 15px 0 0px #4f29f0, -14px 8px 0 0px #4f29f0, -14px -8px 0 0px #4f29f0;
    }
  }
`;

export default AnimatedChecklist;
