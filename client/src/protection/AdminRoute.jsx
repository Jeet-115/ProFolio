import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (user === null) return null;
  return user?.role === 'admin' ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
