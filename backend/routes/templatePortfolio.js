import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import * as templatePortfolioController from "../controllers/templatePortfolio.js";

const router = express.Router();

// Auth middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Unauthorized" });
};

router.use(isAuthenticated);

router
  .route("/")
  .post(wrapAsync(templatePortfolioController.createTemplatePortfolio))
  .get(wrapAsync(templatePortfolioController.getTemplatePortfolios));

router
  .route("/:id")
  .get(wrapAsync(templatePortfolioController.getTemplatePortfolioById))
  .put(wrapAsync(templatePortfolioController.updateTemplatePortfolio))
  .delete(wrapAsync(templatePortfolioController.deleteTemplatePortfolio));

export default router;
