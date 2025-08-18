import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Signup from "./Screens/SignUp";
import ProtectedRoute from "./protection/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./Components/Dashboard/DashboardHome";
import AdminRoute from "./protection/AdminRoute";
import AdminDashboard from "./layouts/AdminLayout";
import AdminHome from "./Components/Admin/AdminHome";
import ResumeBuilder from "./Screens/dashboard/ResumeBuilder";
import TemplatesList from "./Screens/dashboard/TemplatesList";
import TemplateFill from "./Screens/dashboard/TemplateFill";

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          // <ProtectedRoute>
            <DashboardLayout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="resume-builder" element={<ResumeBuilder />} />
        <Route path="/dashboard/templates/resumes" element={<TemplatesList />} />
        <Route path="/dashboard/templates/resumes/:templateId/fill" element={<TemplateFill />} />
      </Route>
      <Route
        path="/admin"
        element={
          // <ProtectedRoute>
            // <AdminRoute>
              <AdminDashboard />
            // </AdminRoute>
          // </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
