import User from "../models/user.js";
import Resume from "../models/resume.js";
import TemplateResume from "../models/templateResume.js";
import Portfolio from "../models/portfolio.js";
import TemplatePortfolio from "../models/templatePortfolio.js";

export const getUserAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const [resumes, templateResumes, portfolios, templatePortfolios, user] =
      await Promise.all([
        Resume.find({ user: userId }),
        TemplateResume.find({ user: userId }),
        Portfolio.find({ user: userId }),
        TemplatePortfolio.find({ user: userId }),
        User.findById(userId),
      ]);

    res.json({
      resumes: resumes.length,
      templateResumes: templateResumes.length,
      portfolios: portfolios.length,
      templatePortfolios: templatePortfolios.length,
      totalResumes: resumes.length + templateResumes.length,
      totalPortfolios: portfolios.length + templatePortfolios.length,
      lastResumeUpdated:
        [...resumes, ...templateResumes].sort(
          (a, b) => b.updatedAt - a.updatedAt
        )[0]?.updatedAt || null,
      lastPortfolioUpdated:
        [...portfolios, ...templatePortfolios].sort(
          (a, b) => b.updatedAt - a.updatedAt
        )[0]?.updatedAt || null,
      skillsCount: user.skills?.length || 0,
      experienceLevel: user.experienceLevel,
      recruiterConsent: user.preferences?.privacy?.recruiterConsent || false,
      reportsReceived: user.reportsReceived?.length || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecruiterAnalytics = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const recruiter = await User.findById(recruiterId);

    if (!recruiter || !["recruiter", "admin"].includes(recruiter.role)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json({
      viewedCandidates: recruiter.viewedCandidates.length,
      bookmarkedCandidates: recruiter.bookmarkedCandidates.length,
      contactedCandidates: recruiter.contactedCandidates.length,
      contactedByMethod: {
        email: recruiter.contactedCandidates.filter((c) => c.method === "email")
          .length,
        message: recruiter.contactedCandidates.filter(
          (c) => c.method === "message"
        ).length,
      },
      reportsMade: recruiter.reportsMade.length,
      jobRoles: recruiter.recruiterPreferences.jobRoles.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdminAnalytics = async (req, res) => {
  try {
    const [
      userCount,
      recruiterCount,
      adminCount,
      resumeCount,
      templateResumeCount,
      portfolioCount,
      templatePortfolioCount,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      User.countDocuments({ role: "recruiter" }),
      User.countDocuments({ role: "admin" }),
      Resume.countDocuments(),
      TemplateResume.countDocuments(),
      Portfolio.countDocuments(),
      TemplatePortfolio.countDocuments(),
    ]);

    const allRecruiters = await User.find({ role: "recruiter" });

    const totalViews = allRecruiters.reduce(
      (acc, r) => acc + r.viewedCandidates.length,
      0
    );
    const totalBookmarks = allRecruiters.reduce(
      (acc, r) => acc + r.bookmarkedCandidates.length,
      0
    );
    const totalContacts = allRecruiters.reduce(
      (acc, r) => acc + r.contactedCandidates.length,
      0
    );

    const totalReports = await User.aggregate([
      {
        $project: {
          reportsReceivedSize: { $size: { $ifNull: ["$reportsReceived", []] } },
          reportsMadeSize: { $size: { $ifNull: ["$reportsMade", []] } },
        },
      },
      {
        $group: {
          _id: null,
          totalReportsReceived: { $sum: "$reportsReceivedSize" },
          totalReportsMade: { $sum: "$reportsMadeSize" },
        },
      },
    ]);

    res.json({
      users: {
        userCount,
        recruiterCount,
        adminCount,
        total: userCount + recruiterCount + adminCount,
      },
      content: {
        resumes: resumeCount,
        templateResumes: templateResumeCount,
        portfolios: portfolioCount,
        templatePortfolios: templatePortfolioCount,
      },
      recruiterActivity: { totalViews, totalBookmarks, totalContacts },
      reports: totalReports[0] || {
        totalReportsReceived: 0,
        totalReportsMade: 0,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
