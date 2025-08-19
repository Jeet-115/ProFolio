import User from "../models/user.js";

export const renderSignupForm = (req, res) => {
  res.json({ message: "Render signup form (not used in API)" });
};

export const signupPage = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      return res.status(201).json({
        message: "Signup successful!",
        user: { id: registeredUser._id, username: registeredUser.username },
        redirect: "/dashboard",
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
  const redirect =
    req.user.role === "admin" ? "/admin/dashboard" : "/dashboard";

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
  if (!role || !["user", "admin"].includes(role)) {
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
