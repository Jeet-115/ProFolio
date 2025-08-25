import React from "react";
import styled from "styled-components";
import ThemedSelect from "./ThemedSelect";
import GlassButton from "./GlassButton";
import SaveCloudButton from "./SaveCloudButton";
import ToggleCheckbox from "./ToggleCheckbox";

/*
  PreferenceForm
  - Props:
    preferences: {
      notifications?: { email?: boolean; activityAlerts?: boolean; weeklyAnalytics?: boolean },
      privacy?: { portfolioVisibility?: 'private'|'public'; resumeVisibility?: 'private'|'public'; recruiterConsent?: boolean }
    }
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onSave: () => void
*/
const PreferenceForm = ({ preferences = {}, onChange, onSave }) => {
  return (
    <div className="mb-6 space-y-4">
      <h3 className="text-xl font-semibold">⚙️ Preferences</h3>

      {/* Notifications - inline with animated checkbox styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InlineChecklist className="flex items-center">
          <input
            id="notifications_email"
            type="checkbox"
            name="notifications.email"
            checked={preferences.notifications?.email || false}
            onChange={onChange}
          />
          <label htmlFor="notifications_email">Email Notifications</label>
        </InlineChecklist>
        <InlineChecklist className="flex items-center">
          <input
            id="notifications_activityAlerts"
            type="checkbox"
            name="notifications.activityAlerts"
            checked={preferences.notifications?.activityAlerts || false}
            onChange={onChange}
          />
          <label htmlFor="notifications_activityAlerts">Resume/Portfolio Activity Alerts</label>
        </InlineChecklist>
        <InlineChecklist className="flex items-center">
          <input
            id="notifications_weeklyAnalytics"
            type="checkbox"
            name="notifications.weeklyAnalytics"
            checked={preferences.notifications?.weeklyAnalytics || false}
            onChange={onChange}
          />
          <label htmlFor="notifications_weeklyAnalytics">Weekly Analytics Report</label>
        </InlineChecklist>
      </div>

      {/* Privacy visibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">Portfolio Visibility:</span>
          <ToggleCheckbox
            name="privacy.portfolioVisibility"
            checked={(preferences.privacy?.portfolioVisibility || "private") === "public"}
            onChange={(e) => {
              const next = e.target.checked ? "public" : "private";
              onChange({ target: { name: "privacy.portfolioVisibility", value: next, type: "text" } });
            }}
          />
          <span className="text-xs font-semibold text-white ml-2">
            {(preferences.privacy?.portfolioVisibility || "private").toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">Resume Visibility:</span>
          <ToggleCheckbox
            name="privacy.resumeVisibility"
            checked={(preferences.privacy?.resumeVisibility || "private") === "public"}
            onChange={(e) => {
              const next = e.target.checked ? "public" : "private";
              onChange({ target: { name: "privacy.resumeVisibility", value: next, type: "text" } });
            }}
          />
          <span className="text-xs font-semibold text-white ml-2">
            {(preferences.privacy?.resumeVisibility || "private").toUpperCase()}
          </span>
        </div>
      </div>

      {/* Recruiter consent - inline animated checkbox */}
      <InlineChecklist className="flex items-center">
        <input
          id="privacy_recruiterConsent"
          type="checkbox"
          name="privacy.recruiterConsent"
          checked={preferences.privacy?.recruiterConsent || false}
          onChange={onChange}
        />
        <label htmlFor="privacy_recruiterConsent">Allow Recruiters to View My Profile</label>
      </InlineChecklist>

      <SaveCloudButton
        onClick={onSave}
        label="SAVE"
        textColor="#ffffff"
        fillColor="#ffffff"
        bg="#3b82f6" /* blue-500 */
        hoverBg="#2563eb" /* blue-600 */
        fontSize="14px"
        paddingY="0.375rem"
        paddingX="0.75rem"
        borderRadius="9999px"
        iconSize={18}
      />
    </div>
  );
};

export default PreferenceForm;

/* Inline animated checkbox styles based on AnimatedChecklist, without wrapper box */
const InlineChecklist = styled.div`
  --text: #ffffff;
  --check: #22d3ee; /* teal-300 */
  --disabled: rgba(255, 255, 255, 0.55);

  label {
    color: var(--text);
    font-weight: 700;
    position: relative;
    cursor: pointer;
    display: grid;
    align-items: center;
    width: fit-content;
    transition: color 0.3s ease;
    margin-left: 28px; /* space for decorative line/dot */
  }

  label::before, label::after {
    content: "";
    position: absolute;
  }

  label::before {
    height: 2px;
    width: 8px;
    left: -27px;
    background: var(--check);
    border-radius: 2px;
    transition: background 0.3s ease;
  }

  label::after {
    height: 4px;
    width: 4px;
    top: 8px;
    left: -25px;
    border-radius: 50%;
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    height: 15px;
    width: 15px;
    outline: none;
    border: 0;
    margin: 0 10px 0 0;
    cursor: pointer;
    background: transparent;
    display: grid;
    align-items: center;
  }

  input[type="checkbox"]::before, input[type="checkbox"]::after {
    content: "";
    position: absolute;
    height: 2px;
    top: auto;
    background: var(--check);
    border-radius: 2px;
  }

  input[type="checkbox"]::before {
    width: 0px;
    right: 60%;
    transform-origin: right bottom;
  }

  input[type="checkbox"]::after {
    width: 0px;
    left: 40%;
    transform-origin: left bottom;
  }

  input[type="checkbox"]:checked::before {
    animation: check-01 0.4s ease forwards;
  }

  input[type="checkbox"]:checked::after {
    animation: check-02 0.4s ease forwards;
  }

  input[type="checkbox"]:checked + label {
    color: var(--disabled);
    animation: move 0.3s ease 0.1s forwards;
  }

  input[type="checkbox"]:checked + label::before {
    background: var(--disabled);
    animation: slice 0.4s ease forwards;
  }

  input[type="checkbox"]:checked + label::after {
    animation: firework 0.5s ease forwards 0.1s;
  }

  @keyframes move {
    50% { padding-left: 8px; padding-right: 0px; }
    100% { padding-right: 4px; }
  }

  @keyframes slice {
    60% { width: 100%; left: 4px; }
    100% { width: 100%; left: -2px; padding-left: 0; }
  }

  @keyframes check-01 {
    0% { width: 4px; top: auto; transform: rotate(0); }
    50% { width: 0px; top: auto; transform: rotate(0); }
    51% { width: 0px; top: 8px; transform: rotate(45deg); }
    100% { width: 5px; top: 8px; transform: rotate(45deg); }
  }

  @keyframes check-02 {
    0% { width: 4px; top: auto; transform: rotate(0); }
    50% { width: 0px; top: auto; transform: rotate(0); }
    51% { width: 0px; top: 8px; transform: rotate(-45deg); }
    100% { width: 10px; top: 8px; transform: rotate(-45deg); }
  }

  @keyframes firework {
    0% { opacity: 1; box-shadow: 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0; }
    30% { opacity: 1; }
    100% { opacity: 0; box-shadow: 0 -15px 0 0px #4f29f0, 14px -8px 0 0px #4f29f0, 14px 8px 0 0px #4f29f0, 0 15px 0 0px #4f29f0, -14px 8px 0 0px #4f29f0, -14px -8px 0 0px #4f29f0; }
  }
`;
