import PomodoroDetails from "../components/Timer/pomodoroDetails";
import TaskDetails from "../components/Tasks/TaskDetails/TaskDetails";
import { Box, Typography, Button } from "@mui/material";
import Pomodoro from "../components/Timer/pomodoro";
import TaskList from "../components/Tasks/TaskList/TaskList";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Game from "../components/Game/bubbleGame";

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
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
  // return (
  //   <Game />
  // )
  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#303030",
          overflow: "hidden",
          display: "flex",
          height: { lg: "100vh", sm: "100vh", xs: "100%" },
          width: "100vw",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: { lg: 4, sm: 4, xs: 24 },
          gap: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "#c4c4c4", textAlign: "center" }}
        >
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
            width: { lg: "60%", sm: "80%", xs: "70%" },
            backgroundColor: "#3C3C3C",
            color: "#2BC59A",
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          <Pomodoro isBreak={isBreak} setIsBreak={setIsBreak} />
        </Box>

        {isBreak ? (
          <>
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
              Break Time
            </Typography>
            <Box
                sx={{
                  width: { lg: "60%", sm: "90%", xs: "90%" },
                  backgroundColor: "#3C3C3C",
                  color: "#2BC59A",
                  borderRadius: 2,
                  boxShadow: 3,
                  textAlign: "center",
                  marginBottom: 6,
                }}
              >
                <Game />
              </Box>
          </>
        ) : (
          <>
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

            {toggle ? (
              <Box
                sx={{
                  padding: 3,
                  width: { lg: "40%", sm: "60%", xs: "70%" },
                  backgroundColor: "#3C3C3C",
                  color: "#2BC59A",
                  borderRadius: 2,
                  boxShadow: 3,
                  textAlign: "center",
                  marginBottom: 6,
                }}
              >
                <TaskList setToggle={setToggle} toggle={toggle} />
              </Box>
            ) : (
              <Box
                sx={{
                  padding: 3,
                  width: { lg: "40%", sm: "60%", xs: "70%" },
                  backgroundColor: "#3C3C3C",
                  color: "#2BC59A",
                  borderRadius: 2,
                  boxShadow: 3,
                  textAlign: "center",
                  marginBottom: 6,
                }}
              >
                <TaskDetails toggle={toggle} setToggle={setToggle} />
              </Box>
            )}
          </>
        )}
      </Box>

      <PomodoroDetails openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

export default Home;
