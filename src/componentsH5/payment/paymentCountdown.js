import {useEffect, useRef, useState} from 'react';

const secondsToHHMMSS = (seconds) => {
  // Convert seconds to integer
  seconds = parseInt(seconds);

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format hours, minutes, and remaining seconds as HH:MM:SS
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return formattedTime;
};

export default function PaymentCountdown({className}) {
  const [timeLeft, setTimeLeft] = useState(3600);
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);

    }, 1000)
    return () => {
      clearInterval(timerRef.current)
    }
  })

  const formattedTime = secondsToHHMMSS(timeLeft);

  return (
    <div className={`flex gap-[12px] items-center ${className}`}>
      <span className={'text-[#D3AC7B] text-[20px] font-semibold'}>限时订阅优惠</span>
      <div className={'flex gap-1'}>
        {
          formattedTime.split('').map((char, index) => {
            if (/[0-9]/.test(char)) {
              return (<span key={index} className={'bg-[#F4DBBA] h-[24px] w-[24px] p-[3px]  text-[14px] text-[#1D2023] font-extrabold text-center rounded-[6px]'}>{char}</span>)
            } else {
              return (<span key={index} className={'text-[14px] text-[#F4DBBA] font-extrabold px-px'}>{char}</span>)
            }
          })
        }
      </div>
    </div>
  )
}

