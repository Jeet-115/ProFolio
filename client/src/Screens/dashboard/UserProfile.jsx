import { useEffect, useState } from "react";
import ThemedInput from "../../Components/Common/ThemedInput";
import PreferenceForm from "../../Components/Common/PreferenceForm";
import GlassButton from "../../Components/Common/GlassButton";
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

          skills: data.skills?.join(", ") || "",
          location: data.location || "",
          experienceLevel: data.experienceLevel || "",
          education: data.education || "",
          headline: data.headline || "",
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
      // convert skills string back to array
      const payload = {
        ...formData,
        skills: formData.skills
          ? formData.skills.split(",").map((s) => s.trim())
          : [],
      };
      const { data } = await updateUserProfile(payload);
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
        [section]: {
          ...prev[section],
          [key]: type === "checkbox" ? checked : value,
        },
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
    if (
      !window.confirm(
        "Are you sure? This will delete your account permanently."
      )
    )
      return;
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
        <ThemedInput
          name="fullName"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <ThemedInput
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <ThemedInput
          name="bio"
          label="Bio"
          value={formData.bio}
          onChange={handleChange}
          type="textarea"
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
        <GlassButton accent="green" variant="solid" onClick={handleSaveProfile}>
          Save Profile
        </GlassButton>
      </div>

      {/* Candidate Fields */}
      <h3 className="text-xl font-semibold mb-2">💼 Candidate Info</h3>
      <div className="mb-6 space-y-4">
        <input
          type="text"
          name="headline"
          placeholder="Headline (e.g. Frontend Developer)"
          value={formData.headline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="experienceLevel"
          placeholder="Experience Level (e.g. Junior, Mid, Senior)"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="education"
          placeholder="Education"
          value={formData.education}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSaveProfile}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-6"
      >
        Save Profile
      </button>

      {/* Social Links */}
      <h3 className="text-xl font-semibold mb-2">🔗 Social Links</h3>
      <div className="mb-6 space-y-2">
        {["github", "linkedin", "twitter", "behance", "dribbble", "website"].map(
          (key) => (
            <ThemedInput
              key={key}
              name={key}
              label={`${key} link`}
              value={formData.socialLinks?.[key] || ""}
              onChange={handleSocialChange}
            />
          )
        )}
      </div>

      {/* Preferences */}
      <PreferenceForm
        preferences={preferences}
        onChange={handlePreferencesChange}
        onSave={handleSavePreferences}
      />

      {/* Danger Zone heading removed as requested */}
      <GlassButton accent="red" variant="solid" onClick={handleDeleteAccount}>
        Delete My Account
      </GlassButton>
    </div>
  );
}
