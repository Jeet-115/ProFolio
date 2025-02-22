// const express = require("express");
// const router = express.Router();
// const User = require("../models/user.js");
// const passport = require("passport");

// router.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     // Handle signup logic (hash password, save to DB, etc.)
//     const user = new User({ username, email, password });
//     await user.save();
//     res.status(200).send("User created");
//   } catch (err) {
//     res.status(500).send("Error creating user");
//   }
// });

// router.post("/login", passport.authenticate("local", {
//   failureRedirect: "/login",
//   failureFlash: true,
// }), async (req, res) => {
//   res.status(200).send("User logged in");
// });

// module.exports = router;

const express = require("express");
const router = express.Router({});
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middlewares.js");

const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signupPage));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.loginPage)
  );

router.get("/logout", userController.logoutPage);

module.exports = router;