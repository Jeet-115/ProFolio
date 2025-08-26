import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
  FancySelect (glass dropdown with rich options)
  Props:
    - name, value, onChange(eLike), placeholder
    - options: Array<{ value: string, label: string, subtitle?: string }>
    - className
*/
const FancySelect = ({ name, value, onChange, options = [], placeholder = "Select...", className = "" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleSelect = (val) => {
    if (onChange) {
      onChange({ target: { name, value: val } });
    }
    setOpen(false);
  };

  return (
    <Wrapper ref={ref} className={className}>
      <button type="button" className={`trigger ${open ? "open" : ""}`} onClick={() => setOpen((o) => !o)}>
        <div className="label">
          <span className={`text ${selected ? "text-white" : "text-muted"}`}>
            {selected ? selected.label : placeholder}
          </span>
          {selected?.subtitle && (
            <span className="subtitle-inline">({selected.subtitle})</span>
          )}
        </div>
        <div className={`chevron ${open ? "rotate" : ""}`} aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="menu" role="listbox">
          {options.map((opt) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`item ${opt.value === value ? "active" : ""}`}
              onClick={() => handleSelect(opt.value)}
            >
              <div className="item-main">
                <div className="dot" />
                <div className="titles">
                  <div className="item-label">{opt.label}</div>
                  {opt.subtitle && <div className="item-sub">{opt.subtitle}</div>}
                </div>
              </div>
              {opt.value === value && <div className="check" aria-hidden>✓</div>}
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.18);
    color: #fff;
    border-radius: 12px;
    padding: 10px 12px; /* match ThemedInput height */
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    backdrop-filter: blur(8px) saturate(120%);
    transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
  }
  .trigger:hover { background: rgba(255,255,255,0.09); }
  .trigger.open { border-color: rgba(245,158,11,0.5); box-shadow: 0 12px 28px rgba(0,0,0,0.35), 0 0 0 3px rgba(245,158,11,0.25); }
  .label { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .text-muted { color: rgba(255,255,255,0.65); font-weight: 600; }
  .text-white { color: #fff; font-weight: 700; }
  /* subtitle removed from trigger; shown only in menu items */
  .subtitle-inline { color: #FDE68A; font-size: 0.8rem; opacity: 0.95; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .chevron { color: #F59E0B; display: flex; align-items: center; }
  .chevron.rotate { transform: rotate(180deg); transition: transform .2s ease; }

  .menu {
    position: absolute; left: 0; right: 0; top: calc(100% + 6px);
    background: rgba(17,24,39,0.9);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 16px 36px rgba(0,0,0,0.45);
    z-index: 30;
  }

  .item {
    padding: 10px 12px;
    display: flex; align-items: center; justify-content: space-between;
    color: #e5e7eb;
    cursor: pointer;
    transition: background .15s ease, color .15s ease;
  }
  .item:hover { background: rgba(245,158,11,0.12); color: #fff; }
  .item.active { background: rgba(245,158,11,0.18); color: #fff; }

  .item-main { display: flex; align-items: center; gap: 10px; }
  .dot { width: 8px; height: 8px; border-radius: 999px; background: #F59E0B; box-shadow: 0 0 0 2px rgba(245,158,11,0.25); }
  .titles { display: flex; flex-direction: column; }
  .item-label { font-weight: 700; }
  .item-sub { font-size: 0.8rem; color: #d1d5db; }

  @media (max-width: 640px) {
    .trigger { padding: 9px 10px; border-radius: 10px; }
    .menu { border-radius: 10px; }
  }
`;

export default FancySelect;
