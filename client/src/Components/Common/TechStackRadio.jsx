import React from "react";
import styled from "styled-components";

/* A generic radio group styled consistently with RoleRadio */
const TechStackRadio = ({ name = "techStack", value, options = [], onChange }) => {
  const handleSelect = (val) => {
    if (onChange) {
      onChange({ target: { name, value: val } });
    }
  };

  return (
    <StyledWrapper>
      <div className="radio-input">
        {options.map((opt) => (
          <label className="label" key={opt.value}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => handleSelect(opt.value)}
            />
            <p className="text">{opt.label}</p>
          </label>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .radio-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 420px;
    align-items: center;
  }

  .radio-input * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .radio-input label {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0 16px;
    width: 100%;
    max-width: 360px;
    cursor: pointer;
    height: 50px;
    position: relative;
    transition: transform 0.08s ease, filter 0.2s ease;
  }

  @media (min-width: 1024px) {
    .radio-input label {
      max-width: 320px;
    }
  }

  .radio-input label::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 45px;
    z-index: -1;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-radius: 10px;
    border: 2px solid transparent;
  }
  .radio-input label:hover { transform: translateY(-1px); }
  .radio-input label:active { transform: scale(0.98); }

  .radio-input label:hover::before {
    transition: all 0.2s ease;
    background-color: rgba(255, 255, 255, 0.08);
  }

  .radio-input .label:has(input:checked) {
    transform: translateY(-1px);
  }
  .radio-input .label:has(input:checked)::before {
    background-color: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.5);
    height: 50px;
  }
  .radio-input .label .text {
    color: #fff;
  }

  .radio-input .label input[type="radio"] {
    background-color: rgba(255, 255, 255, 0.08);
    appearance: none;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: 1px solid rgba(255, 255, 255, 0.35);
  }
  .radio-input .label input[type="radio"]:checked {
    background-color: #ffffff;
    border-color: #ffffff;
    -webkit-animation: pulse 0.6s forwards;
    animation: pulse 0.6s forwards;
  }

  .radio-input .label input[type="radio"]:before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
    background-color: #fff;
    transform: scale(0);
  }

  .radio-input .label input[type="radio"]:checked::before {
    transform: scale(1);
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.35); }
    70% { box-shadow: 0 0 0 8px rgba(255, 255, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
  }

  /* Tablet enhancements (md: 768px–1023px) */
  @media (min-width: 768px) and (max-width: 1023.98px) {
    .radio-input {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px;
      max-width: 720px;
    }

    .radio-input label {
      height: 58px;
      max-width: 320px;
      padding: 0 18px;
      border-radius: 12px;
    }

    .radio-input label::before {
      height: 56px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px) saturate(120%);
      -webkit-backdrop-filter: blur(8px) saturate(120%);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    }

    .radio-input label:hover::before {
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
    }

    .radio-input .label:has(input:checked)::before {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 255, 255, 0.45);
      box-shadow: 0 10px 26px rgba(0, 0, 0, 0.2);
      height: 60px;
    }

    .radio-input .label .text {
      font-size: 1.02rem;
      letter-spacing: 0.2px;
    }

    .radio-input .label input[type="radio"] {
      width: 18px;
      height: 18px;
    }
  }
`;

export default TechStackRadio;
