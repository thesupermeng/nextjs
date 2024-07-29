import Image from 'next/image';
import { Line } from 'rc-progress';
import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { calculatePercent } from '../../util/util';
import { isWeb } from '@/util/common';

export default function ScoreInformation({
  matchUpdateData,
  matchDetailsData,
}) {
  const { t } = useTranslation();

  const scoreData = matchUpdateData?.basketball_match_live?.players?.total;

  const scoreDataArr = [
    {
      name: '3 Pointers',
      home_score: scoreData && scoreData[4].home,
      away_score: scoreData && scoreData[4].away,
    },
    {
      name: '2 Pointers',
      home_score: scoreData && scoreData[20].home,
      away_score: scoreData && scoreData[20].away,
    },
    {
      name: t('freeThrow'),
      home_score: scoreData && scoreData[7].home,
      away_score: scoreData && scoreData[7].away,
    },
    {
      name: t('freeThrowPercentage'),
      home_score: scoreData && scoreData[9].home,
      away_score: scoreData && scoreData[9].away,
    },
  ];

  return (
    <div className='rounded-md bg-[#00000033] mt-4 px-5'>
      <div className='flex justify-between'>
        <div className='flex items-center text-xs'>
          <span className='w-[30px] h-[30px] mr-2 rounded-full overflow-hidden'>
            {matchDetailsData?.home?.icon && (
              <Image
                alt='icon'
                src={matchDetailsData?.home?.icon}
                width={30}
                height={30}
              />
            )}
          </span>

          <p>{matchDetailsData?.home?.name_en}</p>
        </div>
        <div className='flex items-center text-xs'>
          <p>{matchDetailsData?.away?.name_en}</p>
          <span className='w-[30px] h-[30px] ml-2 rounded-full overflow-hidden'>
            {matchDetailsData?.away?.icon && (
              <Image
                alt='icon'
                src={matchDetailsData?.away?.icon}
                width={30}
                height={30}
              />
            )}
          </span>
        </div>
      </div>

      <div className='flex justify-between my-5'>
        <div className='flex'>
          <div className='flex flex-col w-[80px] text-xs text-center gap-2'>
            <p className='text-[#96979B]'>{t('currentQuarterFouls')}</p>
            <p className='text-[#D1D1D1]'>
              {matchUpdateData?.basketball_match_live?.stats[4].home || '-'}
            </p>
          </div>
          <div className='flex flex-col w-[80px] text-xs text-center gap-2'>
            <p className='text-[#96979B]'>{t('remainingTimeOut')}</p>
            <p className='text-[#D1D1D1]'>
              {matchUpdateData?.basketball_match_live?.stats[3].home || '-'}
            </p>
          </div>
        </div>

        <div className='inline-block h-[25px]  w-0.5 self-stretch bg-[#27282D]'></div>

        <div className='flex '>
          <div className='flex flex-col w-[80px] text-xs text-center gap-2'>
            <p className='text-[#96979B]'>{t('currentQuarterFouls')}</p>
            <p className='text-[#D1D1D1]'>
              {matchUpdateData?.basketball_match_live?.stats[4].away || '-'}
            </p>
          </div>
          <div className='flex flex-col w-[80px] text-xs text-center gap-2'>
            <p className='text-[#96979B]'>{t('remainingTimeOut')}</p>
            <p className='text-[#D1D1D1]'>
              {matchUpdateData?.basketball_match_live?.stats[3].away || '-'}
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5 mt-4'>
        {scoreDataArr &&
          scoreDataArr.map((item, index) => (
            <div className='flex flex-col gap-2 text-sm' key={index}>
              <div className='flex justify-between'>
                <p className='w-[26px]'>
                  {item.home_score ? item.home_score : 0}
                </p>
                <p className='text-center text-[#D1D1D1]'>{item.name}</p>
                <p>{item.away_score ? item.away_score : 0}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Line
                  className={`transform -scale-x-100 ${isWeb() ? 'h-2.5' : 'h-1.5'}`}
                  strokeWidth={4}
                  trailWidth={4}
                  percent={calculatePercent(
                    item.away_score ?? 0,
                    item.home_score ?? 0
                  )}
                  strokeColor={`${
                    (item.home_score === 0 && item.away_score === 0) ||
                    (!item.home_score && !item.away_score)
                      ? '#27282D'
                      : '#DE173E'
                  }`}
                  trailColor='#27282D'
                />
                <Line
                  className={`${isWeb() ? 'h-2.5' : 'h-1.5'}`}
                  strokeWidth={4}
                  trailWidth={4}
                  percent={calculatePercent(
                    item.away_score ?? 0,
                    item.home_score ?? 0
                  )}
                  strokeColor={`${
                    (item.home_score === 0 && item.away_score === 0) ||
                    (!item.home_score && !item.away_score)
                      ? '#27282D'
                      : '#227CFF'
                  }`}
                  trailColor='#27282D'
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
