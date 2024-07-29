import { addZero } from '@/util/date';
import { useEffect, useState } from 'react';

export const CountDown = ({ text, endTime, onCountdownEnd = () => {} }) => {
  return (
    <div className='flex items-center mb-4'>
      <div>{text}</div>
      <div className='ml-3'>
        <CountdownTimer endTime={endTime} onCountdownEnd={onCountdownEnd} />
      </div>
    </div>
  );
};

const CountdownTimer = ({ endTime, onCountdownEnd }) => {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const endTimestamp = new Date(endTime).getTime() * 1000;
    return Math.max(0, endTimestamp - now);
  };

  const [time, setTime] = useState(calculateTimeRemaining);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(calculateTimeRemaining);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTime(0);
      onCountdownEnd();
    }
  }, [time]);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor((seconds % 3600) / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    const spanTwClass =
      'bg-tayaRed inline-flex items-center justify-center rounded px-1 min-w-[30px]';

    return (
      <>
        {days > 0 && (
          <>
            <span className={spanTwClass}>{addZero(days)}</span> :{' '}
          </>
        )}
        <span className={spanTwClass}>{addZero(remainingHours)}</span> :{' '}
        <span className={spanTwClass}>{addZero(remainingMinutes)}</span> :{' '}
        <span className={spanTwClass}>{addZero(remainingSeconds)}</span>
      </>
    );
  };

  return (
    <div className={`min-w-[90px] ${time === 0 ? 'opacity-50' : ''}`}>
      {formatTime(time)}
    </div>
  );
};
