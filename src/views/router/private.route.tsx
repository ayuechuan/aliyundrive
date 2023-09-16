import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts";

export function PrivateRoute(): JSX.Element {
  const auth = useAuth();
  return auth.user?.userid ? <Outlet /> : <Navigate to="/sign" replace />;
}