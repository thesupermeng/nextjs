import { useGuideTimerCountdown } from '@/hook/common/useGuideTimerCountdown';
import React from 'react';

function CountdownTimer({ seconds = 3600 }) {
  const { hour, min, sec } = useGuideTimerCountdown(seconds);

  return (
    <div className='my-4 flex gap-2 items-center justify-center text-[14px] font-bold'>
      <TextBg time={hour[0]} />
      <TextBg time={hour[1]} />
      <span className='text-tayaRed'>:</span>
      <TextBg time={min[0]} />
      <TextBg time={min[1]} />
      <span className='text-tayaRed'>:</span>
      <TextBg time={sec[0]} />
      <TextBg time={sec[1]} />
    </div>
  );
}

const TextBg = ({ time }) => {
  return (
    <span className='w-6 h-6 rounded-md bg-tayaRed flex items-center justify-center'>
      {time}
    </span>
  );
};

export default CountdownTimer;
