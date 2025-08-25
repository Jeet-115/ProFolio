import User from "../models/user.js";
import bcrypt from "bcryptjs";

// ================= COMPANY DETAILS =================
export const getCompanyDetails = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user._id).select("companyDetails");
    res.json(recruiter.companyDetails || {});
  } catch (err) {
    res.status(500).json({ message: "Error fetching company details" });
  }
};

export const updateCompanyDetails = async (req, res) => {
  try {
    const { companyName, logo, website, hrName } = req.body;

    const recruiter = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          "companyDetails.companyName": companyName,
          "companyDetails.logo": logo,
          "companyDetails.website": website,
          "companyDetails.hrName": hrName,
        },
      },
      { new: true }
    ).select("companyDetails");

    res.json(recruiter.companyDetails);
  } catch (err) {
    res.status(500).json({ message: "Error updating company details" });
  }
};

// ================= PREFERENCES =================
export const getRecruiterPreferences = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user._id).select("recruiterPreferences");
    res.json(recruiter.recruiterPreferences || {});
  } catch (err) {
    res.status(500).json({ message: "Error fetching preferences" });
  }
};

export const updateRecruiterPreferences = async (req, res) => {
  try {
    const { jobRoles } = req.body;

    const recruiter = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { "recruiterPreferences.jobRoles": jobRoles } },
      { new: true }
    ).select("recruiterPreferences");

    res.json(recruiter.recruiterPreferences);
  } catch (err) {
    res.status(500).json({ message: "Error updating preferences" });
  }
};

// ================= PASSWORD / SECURITY =================
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const recruiter = await User.findById(req.user._id);
    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });

    // validate current password
    const isMatch = await recruiter.authenticate(currentPassword);
    if (!isMatch.user) return res.status(400).json({ message: "Current password is incorrect" });

    // set new password
    recruiter.setPassword(newPassword, async (err) => {
      if (err) return res.status(500).json({ message: "Error setting new password" });

      await recruiter.save();
      res.json({ message: "Password updated successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating password" });
  }
};
