import React from "react";
import styled from "styled-components";

/*
  GlassButton
  - Props: { onClick, type, children, accent = 'teal', variant = 'glass', className }
  - Accent supports: 'blue' | 'green' | 'indigo' | 'gray' | 'teal' | 'red'
  - variant: 'glass' (translucent) | 'solid' (colored, non-transparent)
*/
const ACCENTS = {
  blue: "#3b82f6",
  green: "#10b981",
  indigo: "#6366f1",
  gray: "#9ca3af",
  teal: "#14b8a6",
  red: "#ef4444",
};

const GlassButtonBase = ({ onClick, type = "button", children, accent = "teal", variant = "glass", className = "" }) => {
  return (
    <StyledBtn
      type={type}
      onClick={onClick}
      $accent={ACCENTS[accent] || ACCENTS.teal}
      $variant={variant}
      className={className}
    >
      {children}
    </StyledBtn>
  );
};

const StyledBtn = styled.button`
  --accent: ${(p) => p.$accent};
  color: #ffffff;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
  background: ${(p) => (p.$variant === 'solid' ? 'var(--accent)' : 'rgba(255, 255, 255, 0.08)')};
  border: 1px solid ${(p) => (p.$variant === 'solid' ? 'rgba(255,255,255,0.25)' : 'rgba(255, 255, 255, 0.22)')};
  backdrop-filter: blur(10px) saturate(130%);
  -webkit-backdrop-filter: blur(10px) saturate(130%);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25), 0 0 0px rgba(20, 184, 166, 0);
  transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35), 0 0 0 3px color-mix(in oklab, var(--accent) 30%, transparent);
    border-color: ${(p) => (p.$variant === 'solid' ? 'rgba(255,255,255,0.35)' : 'color-mix(in oklab, var(--accent) 40%, rgba(255, 255, 255, 0.22))')};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35), 0 0 0 3px color-mix(in oklab, var(--accent) 45%, transparent);
  }
  &:active {
    transform: translateY(0);
  }

  /* Tablet */
  @media (max-width: 1024px) {
    padding: 9px 14px;
    border-radius: 10px;
    font-size: 0.9rem;
  }

  /* Mobile */
  @media (max-width: 640px) {
    padding: 8px 12px;
    border-radius: 9px;
    font-size: 0.85rem;
  }
`;

export default GlassButtonBase;
