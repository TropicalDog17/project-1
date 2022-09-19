import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../_components/ui/Navbar";
export const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
