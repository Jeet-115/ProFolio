import React from "react";
import styled from "styled-components";

/*
  GlassCard
  - Transparent glassmorphic surface for wrapping sections
  - Props: { children, className }
*/
const GlassCard = ({ children, className = "" }) => {
  return <Card className={className}>{children}</Card>;
};

const Card = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  backdrop-filter: blur(10px) saturate(130%);
  -webkit-backdrop-filter: blur(10px) saturate(130%);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  color: #fff;
`;

export default GlassCard;
