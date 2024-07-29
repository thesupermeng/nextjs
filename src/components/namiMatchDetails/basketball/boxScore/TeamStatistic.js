import React, { useState } from 'react';
import MatchStatistic from './MatchStatistic';
import { useTranslation } from 'next-i18next';

export default function TeamStatistic({ showTitle = true, data, sportType }) {
  const { t } = useTranslation();
  const TeamStatisticTitle = [
    t('fieldGoals'),
    t('totalFieldGoals'),
    t('fieldGoalPercentage'),
    t('threePointer'),
    t('totalThreePointer'),
    t('threePointerPercent'),
    t('freeThrow'),
    t('totalFreeThrow'),
    t('freeThrowPercent'),
    t('offensiveRebounds'),
    t('defensiveRebounds'),
    t('rebounds'),
    t('assists'),
    t('steals'),
    t('blocks'),
    t('turnovers'),
    t('fouls'),
    t('points'),
  ];
  const [viewMore, setViewMore] = useState(true);

  const filteredData = () => {
    if (data != undefined && data.length > 0) {
      const filterData = data.filter(
        (item, index) => index != 0 && index != data.length - 5
      );
      const structuredData = [];
      filterData.forEach((item, index) => {
        if (index < filterData.length - 3) {
          structuredData.push({
            away: item.away,
            home: item.home,
            type: TeamStatisticTitle[index],
          });
        }
      });
      return structuredData;
    }
  };

  return (
    <div>
      <div className='flex flex-col w-full bg-200 rounded-[8px] p-3'>
        <p className='text-md'>{t('team')} {t('statistics')}</p>
        <div className='flex flex-col gap-2'>
          <MatchStatistic
            statisticData={filteredData()}
            sportType={sportType}
            viewMore={viewMore}
          />
        </div>
      </div>
      <div
        onClick={() => {
          setViewMore(!viewMore);
        }}
        className='flex justify-center w-full bg-gradient-button-active rounded-[6px] text-center p-2 mt-2 text-[12px]'
      >
        {viewMore ? `<p>${t('viewLess')}</p>` :  `<p>${t('viewMore')}</p>`}
        {viewMore ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
          >
            <path
              d='M8.97117 5.39131L12.5761 8.78261C13.0152 9.19565 13.1132 9.66826 12.87 10.2004C12.6269 10.7326 12.1939 10.9991 11.5709 11L4.43033 11C3.80639 11 3.37288 10.7335 3.12977 10.2004C2.88667 9.66739 2.98511 9.19478 3.4251 8.78261L7.03004 5.39131C7.16869 5.26087 7.3189 5.16304 7.48066 5.09783C7.64242 5.03261 7.81574 5 8.0006 5C8.18547 5 8.35879 5.03261 8.52055 5.09783C8.68231 5.16304 8.83251 5.26087 8.97117 5.39131Z'
              fill='white'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
          >
            <path
              d='M7.02883 10.6087L3.42389 7.21739C2.98483 6.80435 2.88685 6.33174 3.12995 5.79957C3.37305 5.26739 3.80611 5.00087 4.42912 5H11.5697C12.1936 5 12.6271 5.26652 12.8702 5.79957C13.1133 6.33261 13.0149 6.80522 12.5749 7.21739L8.96996 10.6087C8.8313 10.7391 8.6811 10.837 8.51934 10.9022C8.35758 10.9674 8.18426 11 7.9994 11C7.81453 11 7.64121 10.9674 7.47945 10.9022C7.31769 10.837 7.16749 10.7391 7.02883 10.6087Z'
              fill='white'
            />
          </svg>
        )}
      </div>
    </div>
  );
}
