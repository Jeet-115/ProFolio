import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  content: { type: String, required: true }, // HTML content
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

resumeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
