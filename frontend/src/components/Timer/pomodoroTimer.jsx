import React, { useEffect, useState } from "react";
import { Button, Box, Grid, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const PomodoroTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [count, setCount] = useState(0);
  const [minute, setMinute] = useState(25);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      if (isBreak) {
        if (count === 3) {
          // Take a long break and come back later for the next session.
          setIsBreak(false);
          setCount(0);
          setMinute(5);
          setSeconds(0);
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
          setIsBreak((prevIsBreak) => !prevIsBreak);
        }
      }, 1000); // Update every second
      return () => clearInterval(intervalPom);
    }
  }, [isRunning, seconds, minute]);

  // Start timer
  const startTimer = () => {
    setIsRunning(true);
  };

  // Pause timer
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
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
        {minute} : {seconds < 10 ? `0${seconds}` : seconds}
      </Typography>

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
    </>
  );
};

export default PomodoroTimer;
