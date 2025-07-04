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

      const redirect = user.role === "admin" ? "/admin/dashboard" : "/dashboard";

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

export default router;
