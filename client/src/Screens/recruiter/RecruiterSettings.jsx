// pages/RecruiterSettings.jsx
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ThemedInput from "../../Components/Common/ThemedInput";
import RecruiterButton from "../../Components/Common/RecruiterButton";
import {
  getRecruiterSettings,
  updateCompanyDetails,
  updateRecruiterPreferences,
  updateRecruiterPassword,
} from "../../services/recruiterSettingsService";

export default function RecruiterSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyLogo: "",
    companyWebsite: "",
    hrName: "",
  });

  const [preferences, setPreferences] = useState({
    jobRoles: [],
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [showNew, setShowNew] = useState(false);
  const MASK = "••••••••"; // placeholder mask; real password is never fetched

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getRecruiterSettings();
        setSettings(data);

        // Fill states from API
        setCompanyDetails({
          companyName: data.companyName || "",
          companyLogo: data.companyLogo || "",
          companyWebsite: data.companyWebsite || "",
          hrName: data.hrName || "",
        });
        // Do not display any prefilled data for preferences
        setPreferences({
          jobRoles: [],
        });
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCompanySave = async () => {
    try {
      await updateCompanyDetails(companyDetails);
      alert("Company details updated ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to update company details");
    }
  };

  const handlePreferencesSave = async () => {
    try {
      await updateRecruiterPreferences(preferences);
      alert("Preferences updated ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to update preferences");
    }
  };

  const handlePasswordSave = async () => {
    try {
      // Send only the new password; current password is not retrievable and the field is read-only masked
      await updateRecruiterPassword({ newPassword: passwordData.newPassword });
      alert("Password updated ✅");
      setPasswordData({ currentPassword: "", newPassword: "" });
      setShowNew(false);
      setShowCurrent(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
  };

  if (loading) return <p className="text-white">Loading settings...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Recruiter Settings</h1>

      {/* Company Details */}
      <section className="mb-8 p-5 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg/20">
        <h2 className="text-xl font-semibold mb-4 text-white">Company Details</h2>
        <div className="space-y-6">
          <ThemedInput
            label="Company Name"
            name="companyName"
            value={companyDetails.companyName}
            onChange={(e) =>
              setCompanyDetails({ ...companyDetails, companyName: e.target.value })
            }
          />
          <ThemedInput
            label="Company Logo URL"
            name="companyLogo"
            value={companyDetails.companyLogo}
            onChange={(e) =>
              setCompanyDetails({ ...companyDetails, companyLogo: e.target.value })
            }
          />
          <ThemedInput
            label="Company Website"
            name="companyWebsite"
            value={companyDetails.companyWebsite}
            onChange={(e) =>
              setCompanyDetails({ ...companyDetails, companyWebsite: e.target.value })
            }
          />
          <ThemedInput
            label="HR Name"
            name="hrName"
            value={companyDetails.hrName}
            onChange={(e) =>
              setCompanyDetails({ ...companyDetails, hrName: e.target.value })
            }
          />
        </div>
        <RecruiterButton onClick={handleCompanySave} variant="solid" className="mt-6">
          Save Company Details
        </RecruiterButton>
      </section>

      {/* Preferences */}
      <section className="mb-8 p-5 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg/20">
        <h2 className="text-xl font-semibold mb-4 text-white">Preferences</h2>
        <div className="space-y-4">
          <ThemedInput
            label="Job Roles (comma separated)"
            name="jobRolesInput"
            value={preferences.jobRoles.join(", ")}
            style={{ color: "#F59E0B" }}
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="none"
            onChange={(e) =>
              setPreferences({
                ...preferences,
                jobRoles: e.target.value.split(",").map((r) => r.trim()),
              })
            }
          />
        </div>
        <RecruiterButton onClick={handlePreferencesSave} variant="solid" className="mt-6">
          Save Preferences
        </RecruiterButton>
      </section>

      {/* Password */}
      <section className="p-5 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg/20">
        <h2 className="text-xl font-semibold mb-4 text-white">Password</h2>
        <div className="space-y-6">
          {/* Hidden email field to steer browser autofill */}
          <input
            type="email"
            name="email"
            autoComplete="username"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
            value={settings?.email || ""}
            readOnly
          />
          {/* Current password: read-only masked, no toggle */}
          <ThemedInput
            type="password"
            label="Current Password"
            name="currentPassword"
            value={MASK}
            readOnly
            onKeyDown={(e) => e.preventDefault()}
          />

          {/* New password: editable with eye toggle */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <ThemedInput
                type={showNew ? "text" : "password"}
                label="Update Password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              onClick={() => setShowNew((s) => !s)}
              className="shrink-0 h-[42px] px-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm flex items-center gap-2"
              aria-label={showNew ? "Hide new password" : "Show new password"}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
              {showNew ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <RecruiterButton onClick={handlePasswordSave} variant="solid">
              Update Password
            </RecruiterButton>
          </div>
        </div>
      </section>
    </div>
  );
}
