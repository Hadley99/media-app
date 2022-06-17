import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoutes = () => {
  const userIdFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  return userIdFromLocalStorage ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRoutes;
