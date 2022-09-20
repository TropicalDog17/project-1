import { Navigate, Outlet } from "react-router-dom";
import { authAtom } from "../state";
import { useRecoilValue } from "recoil";
import Navbar from "../_components/ui/Navbar";
export const ProtectedLayout = () => {
  const auth = useRecoilValue(authAtom);
  if (!auth) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
