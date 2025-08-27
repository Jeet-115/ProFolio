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
  uploadRecruiterProfilePicture,
  removeRecruiterProfilePicture,
} from "../../services/recruiterSettingsService";

export default function RecruiterSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

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

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setSelectedPhoto(file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
  };

  const handleSavePhoto = async () => {
    if (!selectedPhoto) return;

    setUploadingPhoto(true);
    try {
      const { data } = await uploadRecruiterProfilePicture(selectedPhoto);
      setSettings(data.user);
      setSelectedPhoto(null);
      setPhotoPreview(null);
      alert("Profile picture uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload picture");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleCancelPhoto = () => {
    setSelectedPhoto(null);
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      const { data } = await removeRecruiterProfilePicture();
      setSettings(data.user);
      alert("Profile picture removed!");
    } catch (err) {
      console.error(err);
      alert("Failed to remove picture");
    }
  };

  if (loading) return <p className="text-white">Loading settings...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Recruiter Settings</h1>

      {/* Profile Picture */}
      <section className="mb-8 p-5 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg/20">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Profile Picture
        </h2>
        <div className="space-y-4">
          {photoPreview ? (
            <div className="space-y-3">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
              />
              <p className="text-blue-400 text-sm">
                Preview - Click save to upload
              </p>
              <div className="flex gap-2">
                <RecruiterButton
                  onClick={handleSavePhoto}
                  variant="solid"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  disabled={uploadingPhoto}
                >
                  Save Photo
                </RecruiterButton>
                <RecruiterButton
                  onClick={handleCancelPhoto}
                  variant="outline"
                  className="text-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white"
                >
                  Cancel
                </RecruiterButton>
              </div>
              {uploadingPhoto && (
                <p className="text-blue-400 text-sm">Uploading...</p>
              )}
            </div>
          ) : settings?.profilePicture?.url ? (
            <div className="space-y-3">
              <img
                src={settings.profilePicture.url}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
              />
              <div className="flex gap-2">
                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={uploadingPhoto}
                  />
                </label>
                <RecruiterButton
                  onClick={handleRemovePhoto}
                  variant="outline"
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                >
                  Remove
                </RecruiterButton>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center border-2 border-white/20">
                <span className="text-gray-400 text-2xl">👤</span>
              </div>
              <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors inline-block">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={uploadingPhoto}
                />
              </label>
            </div>
          )}
        </div>
      </section>

      {/* Company Details */}
      <section className="mb-8 p-5 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg/20">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Company Details
        </h2>
        <div className="space-y-6">
          <ThemedInput
            label="Company Name"
            name="companyName"
            value={companyDetails.companyName}
            onChange={(e) =>
              setCompanyDetails({
                ...companyDetails,
                companyName: e.target.value,
              })
            }
          />
          <ThemedInput
            label="Company Logo URL"
            name="companyLogo"
            value={companyDetails.companyLogo}
            onChange={(e) =>
              setCompanyDetails({
                ...companyDetails,
                companyLogo: e.target.value,
              })
            }
          />
          <ThemedInput
            label="Company Website"
            name="companyWebsite"
            value={companyDetails.companyWebsite}
            onChange={(e) =>
              setCompanyDetails({
                ...companyDetails,
                companyWebsite: e.target.value,
              })
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
        <RecruiterButton
          onClick={handleCompanySave}
          variant="solid"
          className="mt-6"
        >
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
        <RecruiterButton
          onClick={handlePreferencesSave}
          variant="solid"
          className="mt-6"
        >
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
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
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
