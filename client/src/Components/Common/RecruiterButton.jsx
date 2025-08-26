import React from "react";
import GlassButton from "./GlassButton";

/*
  RecruiterButton
  - Wraps GlassButton with amber defaults for recruiter theme
  - Adds pass-through for size, fullWidth, loading, disabled, leftIcon, rightIcon
*/
const RecruiterButton = ({
  onClick,
  type = "button",
  children,
  variant = "solid",
  accent = "amber",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  ...rest
}) => {
  return (
    <GlassButton
      onClick={onClick}
      type={type}
      variant={variant}
      accent={accent}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      className={className}
      {...rest}
    >
      {children}
    </GlassButton>
  );
};

export default RecruiterButton;
