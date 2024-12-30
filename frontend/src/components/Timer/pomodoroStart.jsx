import React from "react";
import { Typography, Button } from "@mui/material";

const PomodoroStart = ({ setIsStarted }) => {
  const startTimer = () => {
    setIsStarted(true);
  };

  return (
    <>
      <Typography variant="h5" sx={{ color: "#2BC59A", margin: "16px" }}>
        Ready, Set, Focus!
      </Typography>
      <Typography variant="body1" sx={{ color: "#2BC59A" }}>
        Achieve your goals and get more done with focus sessions.
      </Typography>
      <Button
        variant="contained"
        color="default"
        onClick={startTimer}
        sx={{
          boxShadow: 3,
          "&:hover": { boxShadow: 6 },
          fontSize: "16px",
          marginTop: "28px",
        }}
      >
        Get Started!
      </Button>
      <Typography variant="body1" sx={{ color: "#8f8f8f", marginTop: "8px",}}>
        Click on above button to start focusing.
      </Typography>
    </>
  );
};

export default PomodoroStart;
