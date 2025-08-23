import React, { useEffect, useRef, useState } from "react";
import "./SaveButton.css";

const SaveButton = ({
  onClick,
  disabled,
  children,
  hoverText = "Thanks",
  clickMessageDuration = 1500,
}) => {
  const idleText = typeof children === "string" ? children : "Save";
  const [showAlt, setShowAlt] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = (e) => {
    if (disabled) return;
    setShowAlt(true);
    if (typeof onClick === "function") onClick(e);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowAlt(false), clickMessageDuration);
  };

  const currentText = showAlt ? hoverText : idleText;

  return (
    <div className="save-btn-wrapper">
      <button
        type="button"
        className={`save-btn ${disabled ? "disabled" : ""}`}
        onClick={handleClick}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={currentText}
      >
        <span className="label" aria-live="polite">{currentText}</span>
      </button>
    </div>
  );
};

export default SaveButton;
