import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, stopChecking } from "./redux/authSlice";
import { getProfile } from "./service/authService";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        dispatch(setCredentials({ user: res.user }));

        // ✅ Auto-redirect after cookie-based login
        if (window.location.pathname === "/") {
          if (res.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }
      } catch (err) {
        console.log("Session expired or not logged in");
        dispatch(stopChecking());
      }
    };

    fetchProfile();
  }, [dispatch, navigate]);

  if (checkingAuth) return <div className="text-center mt-20">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
