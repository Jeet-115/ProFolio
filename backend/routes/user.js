import express from "express";
import passport from "passport";

import wrapAsync from "../utils/wrapAsync.js";
import { saveRedirectUrl } from "../middleware/middlewares.js";
import * as userController from "../controllers/user.js";

const router = express.Router();

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signupPage));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        error: info?.message || "Invalid username or password",
      });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      const redirect =
        user.role === "admin" ? "/admin/dashboard" : "/dashboard";

      return res.status(200).json({
        message: "Login successful!",
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
        redirect,
      });
    });
  })(req, res, next);
});

router.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

router.get("/logout", userController.logoutPage);

// Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => {
    // Redirect or respond as needed
    res.redirect("/profile"); // or send a token/JSON
  }
);

// GitHub OAuth
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  (req, res) => {
    // Redirect or respond as needed
    res.redirect("/profile"); // or send a token/JSON
  }
);

export default router;
