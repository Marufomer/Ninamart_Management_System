import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/dashboard" : "/staff/pos"}
        replace
      />
    );
  }

  return <>{children}</>;
}
