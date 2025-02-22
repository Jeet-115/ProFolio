require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const dbUrl = process.env.ATLASDB_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
app.listen(8000, () => {
  console.log(`Server running on http://localhost:8000`);
});
