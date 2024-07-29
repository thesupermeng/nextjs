import { Line } from 'rc-progress';
import React from 'react';
import { useTranslation } from 'next-i18next';
import vars from '../../soccer/lineUpPage/vars';

export default function MatchStatisticComponent({ index, data, sportType }) {
  const { t } = useTranslation();
  const { away, home, type } = data;

  const homePercent = () =>
    (Number(home) / (Number(home) + Number(away))) * 100
      ? `${(Number(home) / (Number(home) + Number(away))) * 100}%`
      : '0%';

  const awayPercent = () =>
    (Number(away) / (Number(home) + Number(away))) * 100
      ? `${(Number(away) / (Number(home) + Number(away))) * 100}%`
      : '0%';

  function calculatePercent() {
    if (!away && !home) {
      return 50;
    } else {
      const newAway = parseInt(away);
      const newHome = parseInt(home);
      const total = newHome + newAway;
      const percent = (newHome / total) * 100;
      return percent;
    }
  }

  return (
    <div key={`matchAverage-${index}`} className='text-sm font-thin'>
      <div className='flex justify-center text-center'>
        {/* TODO: fix undefined t */}
        <p>{sportType == 1 ? t(vars.footballMatchStats[type]) : type}</p>
      </div>
      <div className='flex items-center'>
        <p>{data.home}</p>

        <Line
          className='mx-2'
          strokeWidth={2}
          trailWidth={2}
          percent={calculatePercent()}
          strokeColor={`${
            data.home === 0 && data.away === 0 ? '#7A8997' : '#227CFF'
          }`}
          trailColor='#F3293A'
        />
        <p className='w-[26px]'>{data.away ? data.away : 0}</p>
      </div>
    </div>
  );
}
