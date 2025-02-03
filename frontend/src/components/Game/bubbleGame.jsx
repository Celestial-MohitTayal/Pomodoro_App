import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const Game = () => {
  const [timer, setTimer] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [hitNumber, setHitNumber] = useState(0);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
    if (timer === 0) {
      setGameOver(true);
    }
  }, [timer, gameOver]);

  const generateBubbles = () => {
    const newBubbles = [];
    for (let i = 0; i < 33; i++) {
      newBubbles.push({
        id: uuidv4(),
        value: Math.floor(Math.random() * 10),
      });
    }
    setBubbles(newBubbles);
  };

  const handleBubbleClick = (clickedNumber) => {
    if (clickedNumber === hitNumber) {
      setScore((prevScore) => prevScore + 10);
      generateBubbles();
      setHitNumber(Math.floor(Math.random() * 10));
    }
  };

  useEffect(() => {
    if (!gameOver) {
      generateBubbles();
      setHitNumber(Math.floor(Math.random() * 10));
    }
  }, [gameOver]);

  const resetGame = () => {
    setTimer(60);
    setScore(0);
    setGameOver(false);
    generateBubbles();
    setHitNumber(Math.floor(Math.random() * 10));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="40vh"
      padding={2}
      sx={{ overflow: "hidden" }}
    >
      <Box
        width="100%"
        height="90%"
        backgroundColor="#fff"
        borderRadius="10px"
        overflow="hidden"
        sx={{
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        {/* Timer, Score, and Hit Number */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "rgb(40, 83, 40)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "10px",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" fontSize={{ xs: "14px", sm: "16px" }}>
              HIT
            </Typography>
            <Box
              sx={{
                padding: "8px 15px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgb(50, 83, 50)",
              }}
            >
              {hitNumber}
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" fontSize={{ xs: "14px", sm: "16px" }}>
              TIMER
            </Typography>
            <Box
              sx={{
                padding: "8px 15px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgb(50, 83, 50)",
              }}
            >
              {timer}
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" fontSize={{ xs: "14px", sm: "16px" }}>
              SCORE
            </Typography>
            <Box
              sx={{
                padding: "8px 15px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgb(50, 83, 50)",
              }}
            >
              {score}
            </Box>
          </Box>
        </Box>

        {/* Bubbles or Game Over */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          height="calc(100% - 140px)"
          sx={{
            padding: 2,
            gap: 1,
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          {gameOver ? (
            <>
              <Typography
                variant="h4"
                color="red"
                textAlign="center"
                sx={{ width: "100%" }}
              >
                Game Over!
              </Typography>
              <Button
                variant="contained"
                onClick={resetGame}
                color="default"
                sx={{
                  boxShadow: 3,
                  "&:hover": { boxShadow: 6 },
                  fontSize: { xs: "14px", sm: "16px" },
                  marginTop: 2,
                }}
              >
                Restart Game
              </Button>
            </>
          ) : (
            bubbles.map((bubble) => (
              <Button
                key={bubble.id}
                variant="contained"
                onClick={() => handleBubbleClick(bubble.value)}
                sx={{
                  width: { lg: 60, sm: 50, xs: 40 },
                  height: { lg: 60, sm: 50, xs: 40 },
                  borderRadius: "50%",
                  backgroundColor: "rgb(79, 126, 79)",
                  color: "#fff",
                  margin: 1,
                  fontWeight: 500,
                  fontSize: { xs: "16px", sm: "22px" },
                  "&:hover": {
                    backgroundColor: "rgb(55, 82, 55)",
                  },
                }}
              >
                {bubble.value}
              </Button>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Game;
