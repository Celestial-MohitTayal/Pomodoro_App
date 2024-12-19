import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#303030",
          height: "100vh",
          width: "100vw",
          display: "flex",
        }}
      >
        <Box
          sx={{
            flex: 1, // Ensures this Box takes up remaining space
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4, // Adds spacing inside this Box
            gap: 3, // Adds spacing between elements vertically
          }}
        >
          {/* Hero Section */}
          <Box
            sx={{
              padding: 3,
              width: { lg: "60%", sm: "80%", xs: "90%" }, // More responsive width
              backgroundColor: "#3C3C3C",
              color: "#2BC59A",
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              marginBottom: 4, // Adds space below the hero section
            }}
          >
            <h1>Welcome to Focus Sessions</h1>
            <p>
              Track your tasks and stay productive with the Pomodoro technique.
            </p>
          </Box>

          {/* Two Box Sections */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // Stacks vertically on small screens
              justifyContent: "space-between",
              gap: 3, // Adds space between each Box
              width: "100%", // Ensures the boxes span the entire width
            }}
          >
            {/* First Box */}
            <Box
              sx={{
                padding: 3,
                width: { lg: "45%", sm: "48%", xs: "90%" },
                backgroundColor: "#3C3C3C",
                color: "#2BC59A",
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <h1>Task List</h1>
              <p>Track and focus on your first task.</p>
            </Box>

            {/* Second Box */}
            <Box
              sx={{
                padding: 3,
                width: { lg: "45%", sm: "48%", xs: "90%" },
                backgroundColor: "#3C3C3C",
                color: "#2BC59A",
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <h1>Task Details</h1>
              <p>Track and focus on your second task.</p>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Home;
