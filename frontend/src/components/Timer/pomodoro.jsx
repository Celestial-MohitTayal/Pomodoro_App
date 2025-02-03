import React, { useState } from "react";
import PomodoroTimer from "./pomodoroTimer";
import PomodoroStart from "./pomodoroStart";

const Pomodoro = ({ isBreak, setIsBreak }) => {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <>
      {isStarted ? (
        <PomodoroTimer setIsStarted={setIsStarted} setIsBreak={setIsBreak} isBreak={isBreak} />
      ) : (
        <PomodoroStart setIsStarted={setIsStarted} />
      )}
    </>
  );
};

export default Pomodoro;
