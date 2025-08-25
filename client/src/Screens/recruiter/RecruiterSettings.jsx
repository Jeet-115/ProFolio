// pages/RecruiterSettings.jsx
import { useState, useEffect } from "react";
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
        setPreferences({
          jobRoles: data.jobRoles || [],
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
      await updateRecruiterPassword(passwordData);
      alert("Password updated ✅");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recruiter Settings</h1>

      {/* Company Details */}
      <section className="mb-8 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Company Details</h2>
        <input
          type="text"
          placeholder="Company Name"
          value={companyDetails.companyName}
          onChange={(e) =>
            setCompanyDetails({ ...companyDetails, companyName: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Company Logo URL"
          value={companyDetails.companyLogo}
          onChange={(e) =>
            setCompanyDetails({ ...companyDetails, companyLogo: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Company Website"
          value={companyDetails.companyWebsite}
          onChange={(e) =>
            setCompanyDetails({ ...companyDetails, companyWebsite: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="HR Name"
          value={companyDetails.hrName}
          onChange={(e) =>
            setCompanyDetails({ ...companyDetails, hrName: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleCompanySave}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Save Company Details
        </button>
      </section>

      {/* Preferences */}
      <section className="mb-8 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <input
          type="text"
          placeholder="Job Roles (comma separated)"
          value={preferences.jobRoles.join(", ")}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              jobRoles: e.target.value.split(",").map((r) => r.trim()),
            })
          }
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handlePreferencesSave}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Save Preferences
        </button>
      </section>

      {/* Password */}
      <section className="p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          value={passwordData.currentPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, currentPassword: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handlePasswordSave}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Update Password
        </button>
      </section>
    </div>
  );
}
