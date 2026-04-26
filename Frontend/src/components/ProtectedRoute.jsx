import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  if (token && isLoggedIn) {
    return children;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  localStorage.removeItem("adminLoggedIn");

  return <Navigate to="/" replace />;
}

export default ProtectedRoute;