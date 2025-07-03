require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

const app = express();

const dbUrl = process.env.ATLASDB_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "yourSecretKey", // use a strong secret in production!
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require("./passportConfig");

// Import and use user routes
const userRoutes = require("./routes/user");
app.use("/", userRoutes);

// Database Connection
main()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// Routes
app.get("/", (req, res) => {
  res.send("Backend for Profolio is running!");
});

// Start Server
app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
