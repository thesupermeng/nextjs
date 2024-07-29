import { Config } from '@/util/config';
import { useEffect, useState } from 'react';

const useFakeUserCount = () => {
  const startingCount = Math.floor(Math.random() * (40001 - 30000)) + 30000; // staring value between 30000 to 40000
  const [count, setCount] = useState(startingCount);
  const max = 6; //range 1-5 count
  const refreshSec = 3000; //update count in 3sec

  useEffect(() => {
    const intervalId = setInterval(() => {
      const rand = Math.floor(Math.random() * (max - 1)) + 1;
      setCount((prevCount) => {
        const newCount = prevCount + rand;
        return newCount < Config.userGuideSlots ? newCount : prevCount;
      });
    }, refreshSec);

    return () => clearInterval(intervalId);
  }, [refreshSec]);

  return count;
};

export default useFakeUserCount;
