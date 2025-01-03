import React, { useState } from "react";
import PomodoroTimer from "./pomodoroTimer";
import PomodoroStart from "./pomodoroStart";

const Pomodoro = ({isStarted, setIsStarted}) => {
  return (
    <>
      {isStarted ? (
        <PomodoroTimer setIsStarted={setIsStarted} />
      ) : (
        <PomodoroStart setIsStarted={setIsStarted} />
      )}
    </>
  );
};

export default Pomodoro;
