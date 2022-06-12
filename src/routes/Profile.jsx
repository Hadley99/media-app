import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProfileMain from "../components/profile/ProfileMain";

const Profile = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="md">
        <ProfileMain />
      </Container>
    </Box>
  );
};

export default Profile;
