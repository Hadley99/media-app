import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { fetchUser } from "../redux/actions/userAction";
import Login from "./Login";

const AuthenticatedRoutes = () => {
  const userIdFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  return userIdFromLocalStorage ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRoutes;
