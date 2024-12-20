import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "#303030",
        height: "100vh",
        width: "100vw",
        display: "flex",
      }}
    >
      <Navbar />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            padding: 2,
            width: { lg: "25%", sm: "45%" },
            backgroundColor: "#3C3C3C",
            color: "#2BC59A",
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <h1>User Profile</h1>
          <p>Here, you can view and edit your profile details.</p>
          <Button
            onClick={() => navigate('/home')}
            variant="contained"
            sx={{
              width: "30%",
              marginBottom: 2,
              backgroundColor: "#2BC59A",
              "&:hover": { backgroundColor: "#1AB49A" },
            }}
          >
            Back
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
