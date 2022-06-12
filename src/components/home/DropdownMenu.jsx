import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DropdownMenu = ({ content, setDialogOpen }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const user = useSelector((state) => state.userSignin.user);
  const currentUserUid = user?.uid;

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = async (id, uid) => {
    setAnchorEl(false);
  };

  return (
    <>
      <Menu
        id={content.id}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Link to={`/user/${content.createdBy?.uid}`}>Profile</Link>
        </MenuItem>
        {currentUserUid === content.createdBy?.uid && (
          <MenuItem
            onClick={() => {
              setDialogOpen(true);
              handleMenuClose();
            }}
          >
            Delete
          </MenuItem>
        )}
      </Menu>
      <IconButton onClick={handleMenuOpen} aria-label="settings">
        <MoreVertIcon />
      </IconButton>
    </>
  );
};

export default DropdownMenu;
