import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileDetailsDropdown = ({ handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const user = useSelector((state) => state.userSignin.user);
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`/user/${user.uid}`}>Profile</Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar
          aria-label="profile"
          sx={{ width: 35, height: 35 }}
          src={user.photoURL}
        />
      </IconButton>
    </>
  );
};

export default ProfileDetailsDropdown;
