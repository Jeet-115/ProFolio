import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const SocialLinksSchema = new mongoose.Schema(
  {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    behance: { type: String, default: "" },
    dribbble: { type: String, default: "" },
    website: { type: String, default: "" },
    primary: {
      type: String,
      enum: ["github", "linkedin", "twitter", "behance", "dribbble", "website"],
      default: null,
    },
  },
  { _id: false }
);

const ReportedByRecruiterSchema = new mongoose.Schema(
  {
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ReportedCandidateSchema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const PreferencesSchema = new mongoose.Schema(
  {
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    notifications: {
      email: { type: Boolean, default: true },
      activityAlerts: { type: Boolean, default: true },
      weeklyAnalytics: { type: Boolean, default: false },
    },
    privacy: {
      portfolioVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "private",
      },
      resumeVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "private",
      },
      recruiterConsent: { type: Boolean, default: false },
    },
  },
  { _id: false }
);

const ViewedCandidateSchema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    viewedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const BookmarkedCandidateSchema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    notes: { type: String },
    bookmarkedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ContactedCandidateSchema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    contactedAt: { type: Date, default: Date.now },
    method: { type: String, enum: ["message", "email"], default: "message" },
  },
  { _id: true }
);

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, default: "" }, // optional
    fullName: { type: String, default: "" },
    bio: { type: String, maxlength: 300, default: "" },
    profilePicture: { type: String, default: "" }, // Cloudinary URL

    socialLinks: { type: SocialLinksSchema, default: () => ({}) },
    preferences: { type: PreferencesSchema, default: () => ({}) },

    authProvider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },
    role: {
      type: String,
      enum: ["user", "recruiter", "admin"],
      default: "user",
    },

    // Candidate fields (only meaningful if role === "user")
    skills: [String], // ["React", "Node.js", "Figma"]
    location: { type: String },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "1-3 years", "3-5 years", "5+ years", ""],
      default: "",
    },
    education: { type: String }, // highest qualification / certification
    headline: { type: String }, // short role headline

    // 🔹 Recruiter additional fields
    companyDetails: {
      companyName: { type: String, default: "" },
      logo: { type: String, default: "" }, // Cloudinary URL
      website: { type: String, default: "" },
      hrName: { type: String, default: "" },
    },

    recruiterPreferences: {
      jobRoles: { type: [String], default: [] }, // ["Frontend Dev", "UI/UX Designer"]
    },

    // Recruiter fields (only meaningful if role === "recruiter")
    viewedCandidates: { type: [ViewedCandidateSchema], default: [] },
    bookmarkedCandidates: { type: [BookmarkedCandidateSchema], default: [] },
    contactedCandidates: { type: [ContactedCandidateSchema], default: [] },

    // 📌 Reporting system
    reportsReceived: { type: [ReportedByRecruiterSchema], default: [] }, // for candidates
    reportsMade: { type: [ReportedCandidateSchema], default: [] }, // for recruiters

  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", UserSchema);
export default User;
