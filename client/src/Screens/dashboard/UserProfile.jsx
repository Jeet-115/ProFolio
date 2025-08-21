import { useEffect, useState } from "react";
import {
  getUserProfile,
  updateUserProfile,
  removeProfilePicture,
  updateUserPreferences,
  deleteMyAccount,
} from "../../services/userService";

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [preferences, setPreferences] = useState({});

  // Fetch profile on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await getUserProfile();
        setProfile(data);
        setFormData({
          fullName: data.fullName || "",
          username: data.username || "",
          bio: data.bio || "",
          profilePicture: data.profilePicture || "",
          socialLinks: data.socialLinks || {},
        });
        setPreferences(data.preferences || {});
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      socialLinks: { ...p.socialLinks, [name]: value },
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const { data } = await updateUserProfile(formData);
      setProfile(data.user);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const handleRemovePicture = async () => {
    try {
      const { data } = await removeProfilePicture();
      setProfile(data.user);
      setFormData((p) => ({ ...p, profilePicture: "" }));
      alert("Profile picture removed!");
    } catch (err) {
      console.error(err);
      alert("Failed to remove picture");
    }
  };

  const handlePreferencesChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (name.startsWith("notifications.") || name.startsWith("privacy.")) {
      const [section, key] = name.split(".");
      setPreferences((prev) => ({
        ...prev,
        [section]: { ...prev[section], [key]: type === "checkbox" ? checked : value },
      }));
    } else {
      setPreferences((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSavePreferences = async () => {
    try {
      const { data } = await updateUserPreferences(preferences);
      setPreferences(data.preferences);
      alert("Preferences updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update preferences");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This will delete your account permanently.")) return;
    try {
      await deleteMyAccount();
      alert("Account deleted. Logging out...");
      window.location.href = "/"; // redirect home
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">👤 Profile</h2>

      {/* Basic Info */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {formData.profilePicture ? (
          <div>
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button
              onClick={handleRemovePicture}
              className="text-red-600 text-sm mt-2"
            >
              Remove Picture
            </button>
          </div>
        ) : (
          <p>No profile picture set</p>
        )}
        <button
          onClick={handleSaveProfile}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Profile
        </button>
      </div>

      {/* Social Links */}
      <h3 className="text-xl font-semibold mb-2">🔗 Social Links</h3>
      <div className="mb-6 space-y-2">
        {["github", "linkedin", "twitter", "behance", "dribbble", "website"].map(
          (key) => (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={`${key} link`}
              value={formData.socialLinks?.[key] || ""}
              onChange={handleSocialChange}
              className="w-full p-2 border rounded"
            />
          )
        )}
      </div>

      {/* Preferences */}
      <h3 className="text-xl font-semibold mb-2">⚙️ Preferences</h3>
      <div className="mb-6 space-y-2">
        <label>
          Theme:
          <select
            name="theme"
            value={preferences.theme || "system"}
            onChange={handlePreferencesChange}
            className="ml-2 p-1 border rounded"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <div>
          <label>
            <input
              type="checkbox"
              name="notifications.email"
              checked={preferences.notifications?.email || false}
              onChange={handlePreferencesChange}
            />
            Email Notifications
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="notifications.activityAlerts"
              checked={preferences.notifications?.activityAlerts || false}
              onChange={handlePreferencesChange}
            />
            Resume/Portfolio Activity Alerts
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="notifications.weeklyAnalytics"
              checked={preferences.notifications?.weeklyAnalytics || false}
              onChange={handlePreferencesChange}
            />
            Weekly Analytics Report
          </label>
        </div>

        <div>
          <label>
            Portfolio Visibility:
            <select
              name="privacy.portfolioVisibility"
              value={preferences.privacy?.portfolioVisibility || "private"}
              onChange={handlePreferencesChange}
              className="ml-2 p-1 border rounded"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Resume Visibility:
            <select
              name="privacy.resumeVisibility"
              value={preferences.privacy?.resumeVisibility || "private"}
              onChange={handlePreferencesChange}
              className="ml-2 p-1 border rounded"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="privacy.recruiterConsent"
              checked={preferences.privacy?.recruiterConsent || false}
              onChange={handlePreferencesChange}
            />
            Allow Recruiters to View My Profile
          </label>
        </div>

        <button
          onClick={handleSavePreferences}
          className="px-4 py-2 bg-green-600 text-white rounded mt-2"
        >
          Save Preferences
        </button>
      </div>

      {/* Danger Zone */}
      <h3 className="text-xl font-semibold text-red-600 mb-2">⚠️ Danger Zone</h3>
      <button
        onClick={handleDeleteAccount}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Delete My Account
      </button>
    </div>
  );
}
