import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PomodoroTimer from "../components/Timer/pomodoroTimer";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

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
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            gap: 3,
          }}
        >
          {/* Timer Section */}
          <Box
            sx={{
              padding: 3,
              width: { lg: "60%", sm: "80%", xs: "90%" },
              backgroundColor: "#3C3C3C",
              color: "#2BC59A",
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            <PomodoroTimer />
          </Box>

          {/* Task Sections */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 3,
              width: "100%",
            }}
          >
            {/* Task List */}
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

            {/* Task Details */}
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
