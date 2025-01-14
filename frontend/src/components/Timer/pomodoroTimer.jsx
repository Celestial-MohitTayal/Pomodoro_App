import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, Typography, Snackbar } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import alarmSound from "../../assets/alarm_beeps.mp3";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const PomodoroTimer = ({ setIsStarted, isBreak, setIsBreak }) => {
  const [sessionMessage, setSessionMessage] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinute] = useState(25);
  const [count, setCount] = useState(0);
  const alarmRef = useRef();

  const handleToggleMute = () => {
    if (alarmRef.current) {
      setIsMuted((prev) => {
        alarmRef.current.muted = !prev;
        return !prev;
      });
    }
  };

  useEffect(() => {
    if (!isRunning) {
      if (isBreak) {
        setCount((prevCount) => prevCount + 1);
        setMinute(5);
        setSeconds(0);
        setIsRunning(true);
      } else {
        setMinute(25);
        setSeconds(0);
        setIsRunning(true);
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
          alarmRef.current.play();
          if (!isBreak) {
            if (count === 3) {
              setMinute(0);
              setSeconds(0);
              setSessionMessage(
                "Yayy! You did good! - Now take a long break and comeback later."
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
            alarmRef.current.pause();
            setSessionMessage("");
            if (count == 3 && !isBreak) {
              setIsBreak(false);
              setCount(0);
              setIsStarted(false);
            }
          }, 3000);
        }
      }, 1000);
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
      <div>
        <button
          onClick={handleToggleMute}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </button>
      </div>
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

      {sessionMessage ? (
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
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {!isRunning ? (
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
          ) : (
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
          )}

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
      )}

      {/* Alarm Clock */}
      <audio src={alarmSound} ref={alarmRef}></audio>
    </>
  );
};

export default PomodoroTimer;
