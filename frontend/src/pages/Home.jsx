import PomodoroDetails from "../components/Timer/pomodoroDetails";
import TaskDetails from "../components/Tasks/TaskDetails";
import { Box, Typography, Button } from "@mui/material";
import Pomodoro from "../components/Timer/pomodoro";
import TaskList from "../components/Tasks/TaskList";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const openDialogBox = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#303030",
          height: "100vh",
          width: "100vw",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            gap: 3,
            overflow: "hidden",
          }}
        >
          <Typography variant="body2" sx={{ color: "#c4c4c4" }}>
            Want to know more about Pomodoron Technique?
            <Button
              onClick={openDialogBox}
              sx={{
                color: "#c4c4c4",
                fontWeight: "bold",
                paddingLeft: 1,
                paddingRight: 0,
                "&:hover": { color: "white" },
              }}
            >
              Click Here
            </Button>
          </Typography>

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
            <Pomodoro />
          </Box>

          <Typography
            variant="h3"
            component="div"
            sx={{
              fontFamily: "Times New Roman, serif",
              fontWeight: "bold",
              letterSpacing: "0.1rem",
              color: "#c4c4c4",
            }}
          >
            Task Tracker
          </Typography>

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
                padding: 2,
                width: { lg: "45%", sm: "48%", xs: "90%" },
                backgroundColor: "#3C3C3C",
                color: "#2BC59A",
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <TaskList setToggle={setToggle} toggle={toggle} />
            </Box>

            {/* Task Details */}
            <Box
              sx={{
                padding: 2,
                width: { lg: "45%", sm: "48%", xs: "90%" },
                backgroundColor: "#3C3C3C",
                color: "#2BC59A",
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <TaskDetails toggle={toggle} setToggle={setToggle} />
            </Box>
          </Box>
        </Box>

        <PomodoroDetails
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>
    </>
  );
};

export default Home;
