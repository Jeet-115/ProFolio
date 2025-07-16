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
