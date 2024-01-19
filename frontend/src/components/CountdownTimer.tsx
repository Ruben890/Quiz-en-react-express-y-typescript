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
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalSeconds((prevTotalSeconds) => {
        if (prevTotalSeconds <= 0) {
          clearInterval(intervalId);
          setTimerFinished(true);
          return 0;
        }
        return prevTotalSeconds - 1;
      });
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [initialHours, initialMinutes]);

  return (
    <div>
      {timerFinished ? (
        <div className='fixed  w-screen h-screen z-20 bg-opacity-75 bg-black top-0 left-0'>
          <div className='flex items-center justify-center h-full'>
            <div className='shadow-gray-900 shadow-lg p-5 rounded-lg bg-white text-black'>
              <i className="fa-sharp fa-regular fa-clock text-9xl text-red-500  flex w-full justify-center mb-10 mt-5 fa-beat"></i>
              <h1 className='font-bold text-4xl'>¡Se ha agotado el tiempo!</h1>
              <div className='flex w-full justify-center text-white text-center'>
                <button type='button' className='btn btn-error rounded-lg mt-6 text-white text-2xl '>Ver puntuacion</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span>{formatTime(totalSeconds)}</span>
      )}
    </div>
  );
};
