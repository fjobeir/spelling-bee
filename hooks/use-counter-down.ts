import { useCallback, useEffect, useState } from "react";

const useCounterDown = (initialTime: number) => {
    const [time, setTime] = useState<number>(initialTime);
    // in case we want to pause the game or not start it immediately
    const [isActive, setIsActive] = useState<boolean>(true);

    useEffect(() => {
    let timer = null;

    if (isActive && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive, time]);

  const addTime = useCallback((seconds: number) => {
    setTime((prevTime) => prevTime + seconds);
  }, []);

  const resetTime = useCallback(() => {
    setTime(initialTime);
  }, [initialTime]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return { time, isActive, setIsActive, addTime, resetTime, formattedTime: formatTime(time) };
}

export default useCounterDown;