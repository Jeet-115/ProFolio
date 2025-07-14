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
