import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes: number;
}

const formatTime = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialHours = 0, initialMinutes }) => {
  const [totalSeconds, setTotalSeconds] = useState(initialHours * 3600 + initialMinutes * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalSeconds((prevTotalSeconds) => {
        if (prevTotalSeconds === 0) {
          clearInterval(intervalId);
          // Puedes manejar alguna acción después de que el tiempo llega a cero
        }
        return prevTotalSeconds - 1;
      });
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [initialHours, initialMinutes]);

  return (
    <div>
      <span>{formatTime(totalSeconds)}</span>
    </div>
  );
};

