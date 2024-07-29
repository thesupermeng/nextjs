import useUser from '@/hook/user/useUser';
import { getCounter } from '@/services/user';
import React, { useEffect, useState } from 'react';

export const CounterType = {
  0: 'notification',
  1: 'order',
  2: 'transaction',
};

export const Count = ({ type, className }) => {
  const { isLogin } = useUser();
  const [counter, setCounter] = useState(null);
  const call = async () => {
    await getCounter().then((data) => {
      if (data.code === 0) setCounter(data?.data);
    });
  };

  useEffect(() => {
    if (type != undefined && isLogin) call();
  }, [type, isLogin]);

  const widthClass =
    counter?.[CounterType?.[type]]?.toString().length > 1
      ? 'w-7 -right-3'
      : 'w-4';

  if (type === undefined || counter?.[CounterType?.[type]] <= 0 || !counter)
    return <></>;

  return (
    <div
      className={`${className} bg-[#DE173E] rounded-full p-2 h-4 ${widthClass} flex items-center justify-center`}
    >
      <p className='text-[9px]'>
        {counter?.[CounterType?.[type]] > 99
          ? '99+'
          : counter?.[CounterType?.[type]]}
      </p>
    </div>
  );
};
