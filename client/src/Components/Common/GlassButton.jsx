import React from "react";
import styled, { keyframes } from "styled-components";

/*
  GlassButton
  - Props: {
      onClick, type, children,
      accent = 'teal', // supports: 'amber' | 'blue' | 'green' | 'indigo' | 'gray' | 'teal' | 'red'
      variant = 'glass', // 'glass' | 'solid'
      size = 'md', // 'sm' | 'md' | 'lg'
      fullWidth = false,
      loading = false,
      disabled = false,
      leftIcon, rightIcon,
      className
    }
*/
const ACCENTS = {
  amber: "#F59E0B",
  blue: "#3b82f6",
  green: "#10b981",
  indigo: "#6366f1",
  gray: "#9ca3af",
  teal: "#14b8a6",
  red: "#ef4444",
};

const GlassButtonBase = ({
  onClick,
  type = "button",
  children,
  accent = "teal",
  variant = "glass",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
}) => {
  const color = ACCENTS[accent] || ACCENTS.teal;
  return (
    <StyledBtn
      type={type}
      onClick={onClick}
      $accent={color}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      data-loading={loading ? "true" : "false"}
      className={className}
    >
      {loading && (
        <Spinner viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
        </Spinner>
      )}
      {leftIcon && <IconWrapper className="left">{leftIcon}</IconWrapper>}
      <Label>{children}</Label>
      {rightIcon && <IconWrapper className="right">{rightIcon}</IconWrapper>}
    </StyledBtn>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledBtn = styled.button`
  --accent: ${(p) => p.$accent};
  color: #ffffff;
  font-weight: 700;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: ${(p) => (p.$fullWidth ? "100%" : "auto")};

  /* Size variants */
  ${(p) =>
    p.$size === "sm"
      ? `padding: 8px 12px; font-size: 0.85rem; border-radius: 10px;`
      : p.$size === "lg"
      ? `padding: 12px 18px; font-size: 1rem; border-radius: 14px;`
      : `padding: 10px 16px; font-size: 0.95rem; border-radius: 12px;`}

  background: ${(p) => (p.$variant === 'solid' ? 'var(--accent)' : 'rgba(255, 255, 255, 0.08)')};
  border: 1px solid ${(p) => (p.$variant === 'solid' ? 'rgba(255,255,255,0.25)' : 'rgba(255, 255, 255, 0.22)')};
  backdrop-filter: blur(10px) saturate(130%);
  -webkit-backdrop-filter: blur(10px) saturate(130%);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25), 0 0 0px color-mix(in oklab, var(--accent) 0%, transparent);
  transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35), 0 0 0 3px color-mix(in oklab, var(--accent) 28%, transparent);
    border-color: ${(p) => (p.$variant === 'solid' ? 'rgba(255,255,255,0.35)' : 'color-mix(in oklab, var(--accent) 38%, rgba(255, 255, 255, 0.22))')};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35), 0 0 0 3px color-mix(in oklab, var(--accent) 45%, transparent);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
  }

  /* Tablet */
  @media (max-width: 1024px) {
    ${(p) =>
      p.$size === "sm"
        ? `padding: 7px 11px; border-radius: 9px; font-size: 0.82rem;`
        : p.$size === "lg"
        ? `padding: 11px 16px; border-radius: 13px; font-size: 0.95rem;`
        : `padding: 9px 14px; border-radius: 10px; font-size: 0.9rem;`}
  }

  /* Mobile */
  @media (max-width: 640px) {
    ${(p) =>
      p.$size === "sm"
        ? `padding: 6px 10px; border-radius: 8px; font-size: 0.8rem;`
        : p.$size === "lg"
        ? `padding: 10px 14px; border-radius: 12px; font-size: 0.9rem;`
        : `padding: 8px 12px; border-radius: 9px; font-size: 0.85rem;`}
  }

  &[disabled] {
    opacity: 0.75;
    cursor: not-allowed;
  }

  /* Loading state spacing to keep width stable */
  &[data-loading="true"] ${'' /* selector placeholder for spinner exists */} {
  }
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &.left { margin-right: 2px; }
  &.right { margin-left: 2px; }
  svg { width: 18px; height: 18px; }
`;

const Spinner = styled.svg`
  position: absolute;
  left: 10px;
  width: 18px;
  height: 18px;
  animation: ${spin} 1s linear infinite;
  circle {
    stroke: #fff;
    stroke-width: 3;
    fill: transparent;
    stroke-dasharray: 60;
    stroke-dashoffset: 20;
  }
`;

export default GlassButtonBase;
