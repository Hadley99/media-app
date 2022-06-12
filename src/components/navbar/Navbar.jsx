import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { logout } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { grey } from "@mui/material/colors";
import useScrollTrigger from "@mui/material/useScrollTrigger";
//import HideOnScroll from "./HideOnScroll";

import Slide from "@mui/material/Slide";
import AvatarIcon from "./AvatarIcon";
function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = (props) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <HideOnScroll {...props}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Link to="/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "flex" } }}
              >
                InstaClone
              </Typography>
            </Link>
            <AvatarIcon />
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
