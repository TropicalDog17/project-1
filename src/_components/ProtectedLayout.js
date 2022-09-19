import { Navigate, Outlet } from "react-router-dom";
import { authAtom } from "../state";
import Navbar from "../_components/ui/Navbar";
export const ProtectedLayout = () => {
  const user = useRecoilValue(authAtom);

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
