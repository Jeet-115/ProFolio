import mongoose from "mongoose";

const templateResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  templateId: { type: String, required: true },   // ✅ added
  templateName: { type: String, required: true }, // which template they picked
  name: { type: String, required: true },         // user friendly name
  fields: { type: Object, required: true },       // JSON of filled data
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

templateResumeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const TemplateResume = mongoose.model("TemplateResume", templateResumeSchema);
export default TemplateResume;
