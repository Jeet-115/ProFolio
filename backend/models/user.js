import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const SocialLinksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  twitter: String,
  behance: String,
  dribbble: String,
  website: String,
  primary: { type: String, enum: ["github", "linkedin", "twitter", "behance", "dribbble", "website", null], default: null }
}, { _id: false });

const PreferencesSchema = new mongoose.Schema({
  theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
  notifications: {
    email: { type: Boolean, default: true },
    activityAlerts: { type: Boolean, default: true },
    weeklyAnalytics: { type: Boolean, default: false }
  },
  privacy: {
    portfolioVisibility: { type: String, enum: ["public", "private"], default: "private" },
    resumeVisibility: { type: String, enum: ["public", "private"], default: "private" },
    recruiterConsent: { type: Boolean, default: false }
  }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String }, // optional username for portfolio URLs
  fullName: { type: String },
  bio: { type: String, maxlength: 300 },
  profilePicture: { type: String }, // Cloudinary URL

  socialLinks: SocialLinksSchema,
  preferences: PreferencesSchema,

  authProvider: { type: String, enum: ["local", "google", "github"], default: "local" },
  role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", UserSchema);
export default User;