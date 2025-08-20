import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "../services/axiosInstance";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // Try to access an admin endpoint to check if user is admin
        await axios.get("/admin/users");
        setIsAdmin(true);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
