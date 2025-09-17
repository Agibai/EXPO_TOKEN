import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // сохраняем роль при логине

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role!)) return <Navigate to="/trips" replace />;

  return children;
}
