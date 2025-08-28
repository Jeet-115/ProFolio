import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Signup from "./Screens/SignUp";
import RecruiterSignup from "./Screens/RecruiterSignup";
import ProtectedRoute from "./protection/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./Components/Dashboard/DashboardHome";
import AdminRoute from "./protection/AdminRoute";
import AdminDashboard from "./layouts/AdminLayout";
import AdminHome from "./Components/Admin/AdminHome";
import ResumeBuilder from "./Screens/dashboard/ResumeBuilder";
import TemplatesList from "./Screens/dashboard/TemplatesList";
import TemplateFill from "./Screens/dashboard/TemplateFill";
import TechStackSelection from "./Screens/dashboard/TechStackSelection";
import PortfolioBuilder from "./Screens/dashboard/PortfolioBuilder";
import ResumeHistory from "./Screens/dashboard/ResumeHistory";
import PortfolioHistory from "./Screens/dashboard/PortfolioHistory";
import PortfolioTemplatesList from "./Screens/dashboard/PortfolioTemplatesList";
import PortfolioFill from "./Screens/dashboard/PortfolioFill";
import UserAnalytics from "./Screens/dashboard/UserAnalytics";
import UserProfile from "./Screens/dashboard/UserProfile";
import RecruiterLayout from "./layouts/RecruiterLayout";
import RecruiterDashboardHome from "./Screens/recruiter/RecruiterDashboardHome";
import CandidateDirectory from "./Screens/recruiter/CandidateDirectory";
import CandidateProfile from "./Screens/recruiter/CandidateProfile";
import Bookmarks from "./Screens/recruiter/Bookmarks";
import RecruiterActivity from "./Screens/recruiter/RecruiterActivity";
import RecruiterSettings from "./Screens/recruiter/RecruiterSettings";
import UserManagement from "./Screens/admin/UserManagement";
import RecruiterManagement from "./Screens/admin/RecruiterManagement";
import AdminAnalytics from "./Screens/admin/AdminAnalytics";
import AdminSettings from "./Screens/admin/AdminSettings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recruiter/signup" element={<RecruiterSignup />} />
      <Route
        path="/dashboard"
        element={
          // <ProtectedRoute>
          <DashboardLayout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="resume-builder/:id?" element={<ResumeBuilder />} />
        <Route
          path="/dashboard/templates/resumes"
          element={<TemplatesList />}
        />
        <Route
          path="/dashboard/templates/resumes/:templateId/fill"
          element={<TemplateFill />}
        />
        <Route
          path="/dashboard/templates/resumes/:templateId/edit/:resumeId"
          element={<TemplateFill />}
        />
        <Route path="portfolio-techstack" element={<TechStackSelection />} />
        <Route path="portfolio-builder/:id?" element={<PortfolioBuilder />} />
        <Route path="resume-history" element={<ResumeHistory />} />
        <Route path="portfolio-history" element={<PortfolioHistory />} />
        <Route
          path="portfolio-templates"
          element={<PortfolioTemplatesList />}
        />
        <Route
          path="portfolio-templates/:templateId/fill"
          element={<PortfolioFill />}
        />
        <Route
          path="portfolio-templates/:templateId/edit/:portfolioId"
          element={<PortfolioFill />}
        />
        <Route path="analytics" element={<UserAnalytics />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
      <Route
        path="/recruiter/dashboard"
        element={
          // <ProtectedRoute>
          <RecruiterLayout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<RecruiterDashboardHome />} />
        <Route path="candidates" element={<CandidateDirectory />} />
        <Route path="candidates/:id" element={<CandidateProfile />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="reported-contacted" element={<RecruiterActivity />} />
        <Route path="settings" element={<RecruiterSettings />} />
      </Route>
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="recruiters" element={<RecruiterManagement />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
