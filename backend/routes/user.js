import express from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";
import * as userController from "../controllers/user.js";
import { uploadProfilePicture } from "../middleware/multer.js";

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

      let redirect = "/dashboard";
      if (user.role === "admin") redirect = "/admin/dashboard";
      else if (user.role === "recruiter") redirect = "/recruiter/dashboard";

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

router.post("/logout", userController.logoutPage);

// Admin-only guard
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user?.role === "admin") return next();
  return res.status(403).json({ error: "Forbidden" });
};

// Manage Users (admin)
router.get("/admin/users", isAdmin, wrapAsync(userController.listUsers));
router.put(
  "/admin/users/:id/role",
  isAdmin,
  wrapAsync(userController.updateUserRole)
);
router.delete(
  "/admin/users/:id",
  isAdmin,
  wrapAsync(userController.deleteUser)
);

// Get user reports
router.get(
  "/admin/users/:id/reports",
  isAdmin,
  wrapAsync(userController.getUserReports)
);

function getRedirectPath(role) {
  if (role === "admin") return "/admin";
  if (role === "recruiter") return "/recruiter/dashboard";
  return "/dashboard"; // default for user
}

// Google OAuth
router.get("/auth/google", (req, res, next) => {
  // Get role from query, default to 'user'
  const role =
    req.query.role === "recruiter"
      ? "recruiter"
      : req.query.role === "admin"
      ? "admin"
      : "user";

  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: role, // Pass role as state
  })(req, res, next);
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: true,
  }),
  (req, res) => {
    req.session.save(() => {
      const redirectPath = getRedirectPath(req.user.role);

      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.status(200).json({
          message: "Google login successful!",
          user: {
            id: req.user._id,
            username: req.user.username,
            role: req.user.role,
          },
          redirect: redirectPath,
        });
      }

      res.send(`
        <script>
          const data = ${JSON.stringify({
            user: {
              id: req.user._id,
              username: req.user.username,
              role: req.user.role,
            },
            message: "Google login successful!",
            redirect: redirectPath,
          })};
          if (window.opener) {
            window.opener.postMessage(data, "${
              process.env.CLIENT_URL || "http://localhost:5173"
            }");
            window.close();
          } else {
            window.addEventListener('DOMContentLoaded', function() {
              window.location.href = "${
                process.env.CLIENT_URL || "http://localhost:5173"
              }${redirectPath}";
            });
          }
        </script>
      `);
    });
  }
);

// GitHub OAuth
router.get("/auth/github", (req, res, next) => {
  // Get role from query, default to 'user'
  const role =
    req.query.role === "recruiter"
      ? "recruiter"
      : req.query.role === "admin"
      ? "admin"
      : "user";

  passport.authenticate("github", {
    scope: ["user:email"],
    state: role, // Pass role as state
  })(req, res, next);
});

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173/login",
    session: true,
  }),
  (req, res) => {
    req.session.save(() => {
      const redirectPath = getRedirectPath(req.user.role);

      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.status(200).json({
          message: "GitHub login successful!",
          user: {
            id: req.user._id,
            username: req.user.username,
            role: req.user.role,
          },
          redirect: redirectPath,
        });
      }

      res.send(`
        <script>
          const data = ${JSON.stringify({
            user: {
              id: req.user._id,
              username: req.user.username,
              role: req.user.role,
            },
            message: "GitHub login successful!",
            redirect: redirectPath,
          })};
          if (window.opener) {
            window.opener.postMessage(data, "${
              process.env.CLIENT_URL || "http://localhost:5173"
            }");
            window.close();
          } else {
            window.addEventListener('DOMContentLoaded', function() {
              window.location.href = "${
                process.env.CLIENT_URL || "http://localhost:5173"
              }${redirectPath}";
            });
          }
        </script>
      `);
    });
  }
);

// Profile
router.get("/me", wrapAsync(userController.getProfile));
router.put("/me", wrapAsync(userController.updateProfile));
router.post(
  "/me/profile-picture",
  uploadProfilePicture.single("profilePicture"),
  wrapAsync(userController.uploadProfilePicture)
);
router.delete(
  "/me/profile-picture",
  wrapAsync(userController.removeProfilePicture)
);

// Settings
router.put("/me/preferences", wrapAsync(userController.updatePreferences));
router.delete("/me", wrapAsync(userController.deleteMyAccount));

export default router;
