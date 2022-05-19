import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProfileDetails from "../components/ProfileDetails";

const Profile = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="lg">
        <ProfileDetails />
      </Container>
    </Box>
  );
};

export default Profile;
