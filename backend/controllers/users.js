const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

module.exports.renderSignupForm = (req, res) => {
  // Not used in API, but kept for compatibility
  res.json({ message: "Render signup form (not used in API)" });
};

module.exports.signupPage = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email or username already exists." });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create and save the user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Signup failed" });
  }
};

module.exports.renderLoginForm = (req, res) => {
  // Not used in API, but kept for compatibility
  res.json({ message: "Render login form (not used in API)" });
};

module.exports.loginPage = async (req, res) => {
  // If this function is called, authentication was successful.
  // req.user contains the authenticated user.
  res.status(200).json({ message: "Login successful!", user: req.user });
};

module.exports.logoutPage = (req, res) => {
  // Implement your logout logic here
  res.status(200).json({ message: "Logout logic not implemented yet" });
};
