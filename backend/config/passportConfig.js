import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

// ---------------- Local Strategy ----------------
passport.use(
  new LocalStrategy(
    { usernameField: "username", passReqToCallback: true }, // add req
    async (req, usernameOrEmail, password, done) => {
      try {
        // Find by username OR email
        const user = await User.findOne({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        // Authenticate using passport-local-mongoose method
        const authResult = await user.authenticate(password);
        if (!authResult.user) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ---------------- Google Strategy ----------------
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID_PLACEHOLDER",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET_PLACEHOLDER",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Read role from state param (OAuth best practice)
        const roleFromState = req.query.state || req.body.state;
        let assignedRole = ["user", "recruiter"].includes(roleFromState)
          ? roleFromState
          : "user";

        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            email: profile.emails[0].value,
            username: profile.displayName || profile.emails[0].value,
            role: assignedRole,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ---------------- GitHub Strategy ----------------
import { Strategy as GitHubStrategy } from "passport-github2";
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "GITHUB_CLIENT_ID_PLACEHOLDER",
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET || "GITHUB_CLIENT_SECRET_PLACEHOLDER",
      callbackURL: process.env.GITHUB_CALLBACK_URL || "/auth/github/callback",
      scope: ["user:email"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails && profile.emails[0]
            ? profile.emails[0].value
            : `${profile.username}@github.com`;

        // Read role from state param
        const roleFromState = req.query.state || req.body.state;
        let assignedRole = ["user", "recruiter"].includes(roleFromState)
          ? roleFromState
          : "user";

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            email,
            username: profile.username,
            role: assignedRole,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ---------------- Serialize / Deserialize ----------------
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
