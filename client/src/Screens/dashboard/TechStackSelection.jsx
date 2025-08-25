import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { FaHtml5, FaReact, FaAngular } from "react-icons/fa";
import ComingSoonCard from "../../Components/Common/ComingSoonCard";
import TechStackRadio from "../../Components/Common/TechStackRadio";

export default function TechStackSelection() {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedTech, setSelectedTech] = useState("HTML-CSS-JS");

  const handleSelect = (techStack) => {
    if (techStack === "HTML-CSS-JS") {
      // Redirect to builder page with techStack param
      navigate(`/dashboard/portfolio-builder?techStack=${techStack}`);
    } else {
      // Show Coming Soon full-page card for React/Angular
      setShowComingSoon(true);
    }
  };

  const handleRadioChange = (e) => {
    const value = e?.target?.value;
    if (!value) return;
    setSelectedTech(value);
    handleSelect(value);
  };

  if (showComingSoon) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center py-8">
        {/* Mobile-only Back button */}
        <button
          type="button"
          onClick={() => setShowComingSoon(false)}
          className="md:hidden absolute top-3 left-3 z-50 px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 backdrop-blur hover:bg-white/30 active:translate-y-px"
        >
          Back
        </button>
        <ComingSoonCard />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Select Tech Stack</h1>

      {/* Mobile & Tablet: Radio group (previous behavior) */}
      <div className="lg:hidden">
        <TechStackRadio
          value={selectedTech}
          onChange={handleRadioChange}
          options={[
            { label: "HTML / CSS / JS", value: "HTML-CSS-JS" },
            { label: "React", value: "React" },
            { label: "Angular", value: "Angular" },
          ]}
        />
      </div>

      {/* Desktop: Enhanced glass cards */}
      <div className="hidden lg:block">
        <StyledWrapper>
          <div className="cards">
          <button
            type="button"
            className="card blue"
            onClick={() => handleSelect("HTML-CSS-JS")}
            aria-label="Select HTML CSS JS"
          >
            <FaHtml5 size={22} style={{ marginBottom: 6, opacity: 0.95 }} />
            <p className="tip">HTML / CSS / JS</p>
            <p className="second-text">Start with vanilla stack</p>
          </button>

          <button
            type="button"
            className="card green"
            onClick={() => handleSelect("React")}
            aria-label="Select React"
          >
            <span className="badge">Soon</span>
            <FaReact size={22} style={{ marginBottom: 6, opacity: 0.95 }} />
            <p className="tip">React</p>
            <p className="second-text">Coming soon</p>
          </button>

          <button
            type="button"
            className="card red"
            onClick={() => handleSelect("Angular")}
            aria-label="Select Angular"
          >
            <span className="badge">Soon</span>
            <FaAngular size={22} style={{ marginBottom: 6, opacity: 0.95 }} />
            <p className="tip">Angular</p>
            <p className="second-text">Coming soon</p>
          </button>
          </div>
        </StyledWrapper>
      </div>
    </div>
  );
}

const StyledWrapper = styled.div`
  .cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (min-width: 768px) {
    .cards {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  /* Gradients per variant */
  .cards .red {
    /* rgba for glass effect over background */
    background: linear-gradient(135deg, rgba(244, 63, 94, 0.65) 0%, rgba(225, 29, 72, 0.65) 100%);
  }

  .cards .blue {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.65) 0%, rgba(37, 99, 235, 0.65) 100%);
  }

  .cards .green {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.65) 0%, rgba(22, 163, 74, 0.65) 100%);
  }

  /* Laptop/Desktop override: make variant cards transparent glass */
  @media (min-width: 1024px) {
    .cards .red,
    .cards .blue,
    .cards .green {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  .cards .card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 6px;
    text-align: center;
    min-height: 120px;
    width: 100%;
    max-width: 280px;
    border-radius: 14px;
    color: white;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transition: transform 300ms, box-shadow 300ms, filter 300ms;
    outline: none;
    padding: 12px 16px;
    backdrop-filter: blur(10px) saturate(120%);
    -webkit-backdrop-filter: blur(10px) saturate(120%);
  }

  .cards .card:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
  }

  .cards:hover > .card:not(:hover) {
    filter: blur(8px) brightness(0.95);
    transform: scale(0.96);
  }

  .cards .card:focus-visible {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.45), 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .cards .card p.tip {
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: 0.2px;
  }

  .cards .card p.second-text {
    font-size: 0.85rem;
    opacity: 0.95;
  }

  /* Optional badge */
  .cards .card .badge {
    position: absolute;
    top: 10px;
    right: 12px;
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: #fff;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    backdrop-filter: blur(6px);
  }
`;
