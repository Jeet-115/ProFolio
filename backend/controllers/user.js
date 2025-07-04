const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.json({ message: "Render signup form (not used in API)" });
};

module.exports.signupPage = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.json({ message: "Render login form (not used in API)" });
};

module.exports.loginPage = async (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  // delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logoutPage = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out!");
    res.redirect("/listings");
  });
};
