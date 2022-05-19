import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProfileDetails from "../components/profile/ProfileDetails";

const Profile = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="md">
        <ProfileDetails />
      </Container>
    </Box>
  );
};

export default Profile;
