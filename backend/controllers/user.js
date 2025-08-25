import User from "../models/user.js";

export const renderSignupForm = (req, res) => {
  res.json({ message: "Render signup form (not used in API)" });
};

export const signupPage = async (req, res, next) => {
  try {
    console.log('=== SIGNUP DEBUG START ===');
    console.log('Signup request body:', req.body);
    const { email, username, password, role } = req.body;
    console.log('Extracted role from request:', role);
    
    let assignedRole = role;
    if (!["user", "recruiter"].includes(role)) {
      console.log('Invalid role detected, falling back to user. Original role was:', role);
      assignedRole = "user"; // fallback
    }
    console.log('Final assigned role:', assignedRole);

    // Create user instance WITHOUT role first (let passport-local-mongoose handle registration)
    const user = new User({ email, username });
    console.log('Created user instance without role initially');
    
    // Register user with passport-local-mongoose
    const registeredUser = await User.register(user, password);
    console.log('After User.register(), role is:', registeredUser.role);
    
    // Use findByIdAndUpdate to FORCE role assignment after registration
    // This bypasses any middleware or defaults that might interfere
    const updatedUser = await User.findByIdAndUpdate(
      registeredUser._id,
      { role: assignedRole },
      { new: true, runValidators: false } // Skip validators to avoid conflicts
    );
    console.log('After findByIdAndUpdate with role:', updatedUser.role);
    
    // Double-check by fetching the user from DB
    const verificationUser = await User.findById(updatedUser._id);
    console.log('Verification fetch - role in database:', verificationUser.role);
    console.log('=== SIGNUP DEBUG END ===');

    req.login(updatedUser, (err) => {
      if (err) return next(err);
      let redirect = "/dashboard";
      if (updatedUser.role === "admin") redirect = "/admin/dashboard";
      else if (updatedUser.role === "recruiter")
        redirect = "/recruiter/dashboard";
      return res.status(201).json({
        message: "Signup successful!",
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          role: updatedUser.role,
        },
        redirect,
      });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const renderLoginForm = (req, res) => {
  res.json({ message: "Render login form (not used in API)" });
};

export const loginPage = (req, res) => {
  let redirect = "/dashboard";
  if (req.user.role === "admin") redirect = "/admin/dashboard";
  else if (req.user.role === "recruiter") redirect = "/recruiter/dashboard";

  return res.status(200).json({
    message: "Login successful!",
    user: {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
    },
    redirect,
  });
};

export const logoutPage = (req, res) => {
  req.logout(() => {
    req.session?.destroy(() => {
      res.clearCookie("connect.sid", {
        httpOnly: true,
        sameSite: "Strict",
        secure: false, // set true in production
        path: "/",
      });
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};

// -------------------- Admin: Manage Users --------------------

export const listUsers = async (req, res) => {
  const users = await User.find({}, { hash: 0, salt: 0 }).sort({ _id: -1 });
  res.json(users);
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!role || !["user", "recruiter", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }
  const updated = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, projection: { hash: 0, salt: 0 } }
  );
  if (!updated) return res.status(404).json({ error: "User not found" });
  res.json({ message: "Role updated", user: updated });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User deleted" });
};

export const getUserReports = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate("reportsReceived.recruiterId", "fullName email role")
    .populate("reportsMade.candidateId", "fullName email role");

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({
    reportsReceived: user.reportsReceived,
    reportsMade: user.reportsMade,
  });
};

// ---------------- PROFILE ----------------

// Get logged-in user profile
export const getProfile = async (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ error: "Unauthorized" });

  const user = await User.findById(req.user._id, { hash: 0, salt: 0 });
  res.json(user);
};

// Update profile (basic info, bio, picture, socials, candidate fields)
export const updateProfile = async (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ error: "Unauthorized" });

  const {
    fullName,
    username,
    bio,
    profilePicture,
    socialLinks,
    // candidate fields
    skills,
    location,
    experienceLevel,
    education,
    headline,
  } = req.body;

  const updateData = {
    fullName,
    username,
    bio,
    profilePicture,
    socialLinks,
  };

  // If candidate, allow candidate-specific updates
  if (req.user.role === "user") {
    Object.assign(updateData, {
      skills,
      location,
      experienceLevel,
      education,
      headline,
    });
  }

  const updated = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
    projection: { hash: 0, salt: 0 },
  });

  res.json({ message: "Profile updated", user: updated });
};

// Remove profile picture
export const removeProfilePicture = async (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ error: "Unauthorized" });

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { profilePicture: "" } },
    { new: true, projection: { hash: 0, salt: 0 } }
  );

  res.json({ message: "Profile picture removed", user: updated });
};

// ---------------- SETTINGS ----------------

// Update preferences (theme, notifications, privacy)
export const updatePreferences = async (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ error: "Unauthorized" });

  const { preferences } = req.body;

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { preferences },
    { new: true, runValidators: true, projection: { hash: 0, salt: 0 } }
  );

  res.json({
    message: "Preferences updated",
    preferences: updated.preferences,
  });
};

// Delete own account
export const deleteMyAccount = async (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ error: "Unauthorized" });

  await User.findByIdAndDelete(req.user._id);
  req.logout(() => {
    req.session?.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Account deleted successfully" });
    });
  });
};
