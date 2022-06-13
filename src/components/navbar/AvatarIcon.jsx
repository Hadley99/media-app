import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userAction";
import ProfileDetailsDropdown from "./ProfileDetailsDropdown";

const AvatarIcon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userSignin.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return <>{user && <ProfileDetailsDropdown handleLogout={handleLogout} />}</>;
};

export default AvatarIcon;
