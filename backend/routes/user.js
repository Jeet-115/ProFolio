import express from "express";
import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";
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

      const redirect = user.role === "admin" ? "/admin" : "/dashboard";

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

router.get("/logout", userController.logoutPage);

// Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: true,
  }),
  (req, res) => {
    req.session.save(() => {
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
          redirect: "/dashboard",
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
            redirect: "/dashboard",
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
              }/dashboard";
            });
          }
        </script>
      `);
    });
  }
);

// GitHub OAuth
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173/login",
    session: true,
  }),
  (req, res) => {
    req.session.save(() => {
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
          redirect: "/dashboard",
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
            redirect: "/dashboard",
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
              }/dashboard";
            });
          }
        </script>
      `);
    });
  }
);

export default router;
