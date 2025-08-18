import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import * as portfolioController from "../controllers/portfolio.js";

const router = express.Router();

// Auth middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Unauthorized" });
};

router.use(isAuthenticated);

router
  .route("/")
  .post(wrapAsync(portfolioController.createPortfolio))
  .get(wrapAsync(portfolioController.getUserPortfolios));

router
  .route("/:id")
  .get(wrapAsync(portfolioController.getPortfolioById))
  .put(wrapAsync(portfolioController.updatePortfolio))
  .delete(wrapAsync(portfolioController.deletePortfolio));

export default router;
