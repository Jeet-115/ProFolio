import mongoose from "mongoose";

const templatePortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  templateId: { type: String, required: true },   // which template file
  templateName: { type: String, required: true }, // display name of template
  name: { type: String, required: true },         // user friendly name
  fields: { type: Object, required: true },       // JSON filled by user
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

templatePortfolioSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const TemplatePortfolio = mongoose.model("TemplatePortfolio", templatePortfolioSchema);
export default TemplatePortfolio;
