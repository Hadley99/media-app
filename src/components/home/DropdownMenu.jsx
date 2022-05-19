import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const DropdownMenu = ({ post, currentUserUid, handleDelete }) => {
  const [anchorEl, setAnchorEl] = useState(false);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = async (id, uid) => {
    setAnchorEl(false);
    handleDelete(id, uid);
  };

  return (
    <>
      <Menu
        id={post.id}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {currentUserUid === post.createdBy.uid && (
          <MenuItem
            onClick={() => {
              handleMenuClose(post.id, post.createdBy.uid);
            }}
          >
            Delete
          </MenuItem>
        )}
        <MenuItem>Report</MenuItem>
      </Menu>
      <IconButton onClick={handleMenuOpen} aria-label="settings">
        <MoreVertIcon />
      </IconButton>
    </>
  );
};

export default DropdownMenu;
