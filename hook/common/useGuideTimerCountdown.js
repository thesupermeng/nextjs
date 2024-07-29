import React, { useEffect, useState } from 'react';

export const useGuideTimerCountdown = (totalSec) => {
  const [time, setTime] = useState(totalSec); // Convert total minutes to seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  useEffect(() => {
    setTime(totalSec);
  }, [totalSec]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (time <= 0) {
        clearInterval(timer);
        setIsTimeUp(true);
        //reset timer when time is finish
        // setTime(totalSec);
      } else {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formatTime = (num) => {
    return num.toString().padStart(2, '0');
  };

  const hour = formatTime(hours).split('');
  const min = formatTime(minutes).split('');
  const sec = formatTime(seconds).split('');

  return {
    hour,
    min,
    sec,
    isTimeUp,
  };
};
