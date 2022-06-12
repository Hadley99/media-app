import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { fetchUser } from "../redux/actions/userAction";
import Login from "./Login";

const useAuth = () => {
  const user = useSelector((state) => state.userSignin.user);
  return user;
};

const AuthenticatedRoutes = () => {
  //  const user = useSelector((state) => state.userSignin.user);
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRoutes;
