import styled from "@emotion/styled";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { display } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProfileDetails = () => {
  const user = useSelector((state) => state.userSignin.user);
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item sx={{}}>
            <img src={photoURL} alt={displayName} />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <Typography fontSize={30} fontWeight="bold">
              {displayName}
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileDetails;
