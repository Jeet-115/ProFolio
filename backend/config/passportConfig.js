import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js";

// Custom strategy: allow login with username OR email
passport.use(
  new LocalStrategy({ usernameField: "username" }, async (usernameOrEmail, password, done) => {
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
  })
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// 🧩 Future setup for Google Strategy (placeholder)
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // Find or create user logic here
//     }
//   )
// );

// 🧩 Future setup for GitHub Strategy (placeholder)
// import { Strategy as GitHubStrategy } from "passport-github2";
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // Find or create user logic here
//     }
//   )
// );
