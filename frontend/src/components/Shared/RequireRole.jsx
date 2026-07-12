import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Shared/Loader";

export default function RequireRole({ allowed, children }) {
  const { currentUser, role, loading } = useAuth();

  // Wait until Firebase finishes checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowed && !allowed.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}