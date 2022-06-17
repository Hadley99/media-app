import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useScrollTrigger from "@mui/material/useScrollTrigger";

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
                color={props.themeToggler ? "primary" : ""}
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "flex" } }}
              >
                InstaClone
              </Typography>
            </Link>
            <Box>
              <IconButton onClick={props.handleThemeToggler}>
                {props.themeToggler ? (
                  <LightModeIcon color="primary" />
                ) : (
                  <DarkModeIcon color="secondary" />
                )}
              </IconButton>
              <AvatarIcon />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
