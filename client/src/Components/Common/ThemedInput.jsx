import React, { useState } from "react";
import styled from "styled-components";

/*
  ThemedInput
  - Props: { label, value, onChange, required, name, type = 'text' }
  - Supports type 'text' and 'textarea'
  - Floating label, glassmorphism, full-width
*/
const ThemedInput = ({ label = "", value = "", onChange, required = false, name, type = "text" }) => {
  const [focused, setFocused] = useState(false);
  const filled = value !== undefined && value !== null && String(value).trim().length > 0;

  const commonProps = {
    required,
    name,
    className: `input${type === "textarea" ? " textarea" : ""}`,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <StyledWrapper>
      <div className={`container ${filled ? "filled" : ""} ${focused ? "focused" : ""}`}>
        {type === "textarea" ? (
          <textarea {...commonProps} rows={4} />
        ) : (
          <input {...commonProps} type="text" />
        )}
        {label ? <label className="label">{label}</label> : null}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
    color: #e0f7fa; /* theme accent */
    width: 100%;
  }

  .container .label {
    font-size: 0.95rem;
    padding-left: 12px;
    position: absolute;
    top: 13px;
    transition: 0.25s ease;
    pointer-events: none;
    color: #e0f7fa;
    opacity: 0.9;
  }

  .input {
    width: 100%;
    min-height: 45px;
    border: none;
    outline: none;
    padding: 10px 12px;
    border-radius: 10px;
    color: #ffffff;
    font-size: 0.95rem;
    background-color: transparent;
    /* glass effect */
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow:
      0 6px 18px rgba(0, 0, 0, 0.25),
      inset 0 0 0 rgba(0, 0, 0, 0);
    backdrop-filter: blur(8px) saturate(120%);
    -webkit-backdrop-filter: blur(8px) saturate(120%);
  }

  .input.textarea {
    resize: vertical;
    min-height: 100px;
  }

  .input:focus {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.45);
    box-shadow:
      0 10px 26px rgba(0, 0, 0, 0.35),
      inset 0 0 0 rgba(0, 0, 0, 0);
  }

  /* Float label when focused */
  .container.focused .label {
    padding-left: 6px;
    transform: translateY(-34px);
    font-size: 0.8rem;
    opacity: 0.95;
  }

  /* Hide label once field has value and not focused */
  .container.filled:not(.focused) .label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-34px); /* keep space consistent during transition */
  }
`;

export default ThemedInput;
