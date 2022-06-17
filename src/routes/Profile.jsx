import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
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
