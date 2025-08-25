import { useEffect, useState } from "react";
import ThemedInput from "../../Components/Common/ThemedInput";
import PreferenceForm from "../../Components/Common/PreferenceForm";
import DeleteAccountButton from "../../Components/Common/DeleteAccountButton";
import SaveCloudButton from "../../Components/Common/SaveCloudButton";
import GlassCard from "../../Components/Common/GlassCard";
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
      <div className="mb-6 space-y-8">
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
        <SaveCloudButton
          onClick={handleSaveProfile}
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

      {/* Candidate Fields */}
      <h3 className="text-xl font-semibold mb-2">💼 Candidate Info</h3>
      <GlassCard className="mb-6 p-4 rounded-2xl space-y-8">
        <ThemedInput
          name="headline"
          label="Headline"
          placeholder="e.g. Frontend Developer"
          value={formData.headline}
          onChange={handleChange}
        />
        <ThemedInput
          name="skills"
          label="Skills"
          placeholder="Comma separated"
          value={formData.skills}
          onChange={handleChange}
        />
        <ThemedInput
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <div className="space-y-2">
          <div className="text-white font-semibold">Experience Level</div>
          <div className="flex flex-wrap gap-2">
            {["Fresher", "1-3 years", "3-5 years", "5+ years"].map((opt) => (
              <label
                key={opt}
                className={`cursor-pointer select-none px-3 py-1 rounded-lg border backdrop-blur text-sm transition-colors ${
                  formData.experienceLevel === opt
                    ? "bg-teal-500/20 border-teal-300 text-white"
                    : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={formData.experienceLevel === opt}
                  onChange={() => setFormData((p) => ({ ...p, experienceLevel: opt }))}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
        
        <ThemedInput
          name="education"
          label="Education"
          value={formData.education}
          onChange={handleChange}
        />
        <div>
          <SaveCloudButton
            onClick={handleSaveProfile}
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
      </GlassCard>

      {/* Social Links */}
      <h3 className="text-xl font-semibold mb-6">🔗 Social Links</h3>
      <div className="mb-6 space-y-8">
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
      <DeleteAccountButton onClick={handleDeleteAccount} size="sm" />
    </div>
  );
}
