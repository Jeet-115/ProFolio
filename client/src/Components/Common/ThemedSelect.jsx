import React from "react";
import styled from "styled-components";

/*
  ThemedSelect
  - Props: { name, value, onChange, options: Array<{ value: string; label: string }>, className }
  - Glassmorphism, custom arrow, white text, focus ring
*/
const ThemedSelect = ({ name, value, onChange, options = [], className = "" }) => {
  return (
    <Wrapper className={className}>
      <select name={name} value={value} onChange={onChange} className="select">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .select {
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 10px 42px 10px 12px;
    border-radius: 10px;
    color: #ffffff;
    font-weight: 600;
    font-size: 0.95rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(8px) saturate(120%);
    -webkit-backdrop-filter: blur(8px) saturate(120%);
    outline: none;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  .select:focus {
    border-color: rgba(245, 158, 11, 0.55); /* amber */
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35), 0 0 0 3px rgba(245, 158, 11, 0.28);
  }

  /* Custom arrow */
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 12px;
    width: 10px;
    height: 10px;
    pointer-events: none;
    transform: translateY(-50%) rotate(45deg);
    border-right: 2px solid #F59E0B; /* amber */
    border-bottom: 2px solid #F59E0B;
  }

  /* Option styling (limited across browsers) */
  .select option {
    color: #0b0f14;
    background: #f7f9fb;
    font-weight: 600;
    font-size: 0.95rem;
  }

  /* Tablet */
  @media (max-width: 1024px) {
    .select {
      font-size: 0.9rem;
      padding: 9px 38px 9px 10px;
    }
    &:after {
      right: 10px;
      width: 9px;
      height: 9px;
      border-right-width: 2px;
      border-bottom-width: 2px;
    }
    .select option {
      font-size: 0.9rem;
    }
  }

  /* Mobile */
  @media (max-width: 640px) {
    .select {
      font-size: 0.85rem;
      padding: 8px 34px 8px 10px;
      border-radius: 8px;
    }
    &:after {
      right: 10px;
      width: 8px;
      height: 8px;
      border-right-width: 2px;
      border-bottom-width: 2px;
    }
    .select option {
      font-size: 0.85rem;
    }
  }
`;

export default ThemedSelect;
