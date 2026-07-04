import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Usage: <RequireRole allowed={["admin"]}><AdminPanel /></RequireRole>
// Also handles the base "must be logged in at all" case automatically.
export default function RequireRole({ allowed, children }) {
  const { currentUser, role } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowed && !allowed.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}