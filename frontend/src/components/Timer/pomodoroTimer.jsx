import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, Snackbar } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const PomodoroTimer = ({ setIsStarted }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [count, setCount] = useState(0);
  const [minute, setMinute] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [sessionMessage, setSessionMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      if (isBreak) {
        if (count === 3) {
          setCount(0);
          setIsStarted(false);
        } else {
          setCount((prevCount) => prevCount + 1);
          setMinute(5);
          setSeconds(0);
        }
      } else {
        setMinute(25);
        setSeconds(0);
      }
    }
  }, [isBreak]);

  useEffect(() => {
    if (isRunning) {
      const intervalPom = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }

        if (seconds === 0) {
          setMinute((prevMinute) => prevMinute - 1);
          setSeconds(59);
        }

        if (minute === 0 && seconds === 0) {
          setIsRunning(false);
          setOpenSnackbar(true);
          if (!isBreak) {
            if (count === 3) {
              setMinute(0);
              setSeconds(0);
              setSessionMessage(
                "Yayy! You did good! - Now take a long break and comeback later"
              );
            } else {
              setMinute(0);
              setSeconds(0);
              setSessionMessage(
                "Focus session is over! Please take a 5-minute break."
              );
            }
          } else {
            setMinute(0);
            setSeconds(0);
            setSessionMessage("Break session is over! Please start focusing.");
          }
          setTimeout(() => {
            setIsBreak((prevIsBreak) => !prevIsBreak);
            setOpenSnackbar(false);
            setSessionMessage("");
          }, 3000);
        }
      }, 0.5);
      return () => clearInterval(intervalPom);
    }
  }, [isRunning, seconds, minute, isBreak]);

  const startTimer = () => {
    setIsRunning(true);
    setSessionMessage("");
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSessionMessage("");
    if (isBreak) {
      setMinute(5);
      setSeconds(0);
    } else {
      setMinute(25);
      setSeconds(0);
    }
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{ marginBottom: 2, fontWeight: "bold", fontFamily: "unset" }}
      >
        {isBreak ? `Break Session - ${count}` : `Focus Session - ${count + 1}`}
      </Typography>

      <Typography
        color="#D3D3D3"
        variant="h3"
        sx={{ marginBottom: 3, fontFamily: "unset" }}
      >
        {minute < 10 ? `0${minute}` : minute} :{" "}
        {seconds < 10 ? `0${seconds}` : seconds}
      </Typography>

      {sessionMessage && (
        <Typography
          variant="body1"
          sx={{
            color: "#c4c4c4",
            fontWeight: "bold",
            margin: "20px",
          }}
        >
          {sessionMessage}
        </Typography>
      )}

      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="default"
            onClick={startTimer}
            startIcon={<PlayArrowIcon />}
            sx={{
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
              fontSize: "16px",
            }}
          >
            Start
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="default"
            onClick={pauseTimer}
            startIcon={<PauseIcon />}
            sx={{
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
              fontSize: "16px",
            }}
          >
            Pause
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="default"
            onClick={resetTimer}
            startIcon={<RestartAltIcon />}
            sx={{
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
              fontSize: "16px",
            }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar Popup for session over message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={sessionMessage}
      />
    </>
  );
};

export default PomodoroTimer;
