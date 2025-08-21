import Resume from "../models/resume.js";
import TemplateResume from "../models/templateResume.js";
import Portfolio from "../models/portfolio.js";
import TemplatePortfolio from "../models/templatePortfolio.js";

// Get full analytics for logged-in user
export const getUserAnalytics = async (req, res) => {
  const userId = req.user._id;

  // Fetch all user content
  const [builderResumes, templateResumes, builderPortfolios, templatePortfolios] = await Promise.all([
    Resume.find({ user: userId }),
    TemplateResume.find({ user: userId }),
    Portfolio.find({ user: userId }),
    TemplatePortfolio.find({ user: userId }),
  ]);

  // Totals (with safe defaults if fields not added yet)
  const totalDownloads =
    builderResumes.reduce((acc, r) => acc + (r.downloads || 0), 0) +
    templateResumes.reduce((acc, r) => acc + (r.downloads || 0), 0);

  const totalViews =
    builderPortfolios.reduce((acc, p) => acc + (p.views || 0), 0) +
    templatePortfolios.reduce((acc, p) => acc + (p.views || 0), 0);

  // Resume analytics
  const resumeEdits =
    builderResumes.reduce((acc, r) => acc + (r.edits || 0), 0) +
    templateResumes.reduce((acc, r) => acc + (r.edits || 0), 0);

  const topResume =
    [...builderResumes, ...templateResumes].sort(
      (a, b) => (b.downloads || 0) - (a.downloads || 0)
    )[0] || null;

  const resumeTrend = [...builderResumes, ...templateResumes].map(r => ({
    name: r.name,
    createdAt: r.createdAt,
    downloads: r.downloads || 0,
  }));

  // Portfolio analytics
  const portfolioEngagements =
    [...builderPortfolios, ...templatePortfolios].reduce((acc, p) => acc + (p.clicks || 0), 0);

  const topPortfolio =
    [...builderPortfolios, ...templatePortfolios].sort(
      (a, b) => (b.views || 0) - (a.views || 0)
    )[0] || null;

  const portfolioTrend = [...builderPortfolios, ...templatePortfolios].map(p => ({
    name: p.name,
    createdAt: p.createdAt,
    views: p.views || 0,
  }));

  // Distribution
  const contentDistribution = {
    builderResumes: builderResumes.length,
    templateResumes: templateResumes.length,
    builderPortfolios: builderPortfolios.length,
    templatePortfolios: templatePortfolios.length,
  };

  // Recent activity (latest 10)
  const recentActivity = [
    ...builderResumes.map(r => ({ type: "resume-builder", action: "created", name: r.name, date: r.createdAt })),
    ...templateResumes.map(r => ({ type: "resume-template", action: "created", name: r.name, date: r.createdAt })),
    ...builderPortfolios.map(p => ({ type: "portfolio-builder", action: "created", name: p.name, date: p.createdAt })),
    ...templatePortfolios.map(p => ({ type: "portfolio-template", action: "created", name: p.name, date: p.createdAt })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  // Response
  res.json({
    overview: {
      totalResumes: builderResumes.length + templateResumes.length,
      totalPortfolios: builderPortfolios.length + templatePortfolios.length,
      totalDownloads,
      totalViews,
    },
    resumes: {
      builder: builderResumes.length,
      templates: templateResumes.length,
      edits: resumeEdits,
      downloads: totalDownloads,
      topResume,
      trend: resumeTrend,
    },
    portfolios: {
      builder: builderPortfolios.length,
      templates: templatePortfolios.length,
      views: totalViews,
      engagements: portfolioEngagements,
      topPortfolio,
      trend: portfolioTrend,
    },
    comparative: {
      distribution: contentDistribution,
      activity: {
        downloads: totalDownloads,
        views: totalViews,
      },
    },
    recentActivity,
  });
};
