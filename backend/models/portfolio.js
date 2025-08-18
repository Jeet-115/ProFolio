import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "index.html", "style.css"
  content: { type: String, default: "" },
});

const portfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // project name
  files: [fileSchema], // array of files
  techStack: {
    type: String,
    enum: ["HTML-CSS-JS", "React", "Angular"],
    default: "HTML-CSS-JS",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

portfolioSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
