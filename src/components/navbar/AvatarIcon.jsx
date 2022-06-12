import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import ProfileDetailsDropdown from "./ProfileDetailsDropdown";

const AvatarIcon = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  return <>{user && <ProfileDetailsDropdown handleLogout={handleLogout} />}</>;
};

export default AvatarIcon;
