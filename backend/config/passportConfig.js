import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

// Custom strategy: allow login with username OR email
passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (usernameOrEmail, password, done) => {
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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Google Strategy
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID_PLACEHOLDER",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET_PLACEHOLDER",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find user by Google ID or email
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            email: profile.emails[0].value,
            username: profile.displayName || profile.emails[0].value,
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

// GitHub Strategy
import { Strategy as GitHubStrategy } from "passport-github2";
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "GITHUB_CLIENT_ID_PLACEHOLDER",
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET || "GITHUB_CLIENT_SECRET_PLACEHOLDER",
      callbackURL: "/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // GitHub may not always provide email directly
        const email =
          profile.emails && profile.emails[0]
            ? profile.emails[0].value
            : `${profile.username}@github.com`;
        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            email,
            username: profile.username,
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
