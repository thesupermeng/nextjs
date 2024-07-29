import React from 'react';
import { Line } from 'rc-progress';
import { calculatePercent } from '../../util/util';
import { ImageWithFallback } from '@/components/fallbackImage';
import { IconDefaultGames } from '@/asset/icons';

const Color = {
  home: '#DE173E',
  away: '#0790FF',
};

const calculateScoreData = (matchDetailsData, statName) => {
  const homeScore =
    matchDetailsData?.basketball_home_stats?.[statName] /
    matchDetailsData?.basketball_home_stats?.matches;
  const awayScore =
    matchDetailsData?.basketball_away_stats?.[statName] /
    matchDetailsData?.basketball_away_stats?.matches;

  return {
    name: statName,
    homeScore: homeScore.toFixed(1) > 0 ? homeScore.toFixed(1) : 0,
    awayScore: awayScore.toFixed(1) > 0 ? awayScore.toFixed(1) : 0,
  };
};

export default function Comparison({ matchDetailsData }) {
  const scoreStatNames = ['points', 'rebounds', 'assists', 'blocks', 'steals'];

  const scoreDataArr = scoreStatNames.map((statName, index) =>
    calculateScoreData(matchDetailsData, statName)
  );

  return (
    <div className='mt-3 p-4 rounded-md bg-[#00000033]'>
      <div className='flex justify-between'>
        <div className='flex items-center w-[50%]'>
          <span className='overflow-hidden rounded-full flex justify-center items-center w-[24px] h-[24px]'>
            <ImageWithFallback
              className='object-cover'
              src={matchDetailsData?.home?.icon}
              alt='logo'
              width={24}
              height={24}
              fallbackSrc={IconDefaultGames}
            />
          </span>
          <p className='ml-3 text-sm'>
            {matchDetailsData?.home?.short_name_en ||
              matchDetailsData?.home?.name_en}
          </p>
        </div>
        <div className='flex items-center justify-end w-[50%]'>
          <p className='mr-3 text-sm'>
            {matchDetailsData?.away?.short_name_en ||
              matchDetailsData?.away?.name_en}
          </p>
          <span className='overflow-hidden rounded-full flex justify-center items-center w-[24px] h-[24px]'>
            <ImageWithFallback
              className='object-cover'
              src={matchDetailsData?.away?.icon}
              alt='logo'
              width={24}
              height={24}
              fallbackSrc={IconDefaultGames}
            />
          </span>
        </div>
      </div>

      <div className='mt-4'>
        {scoreDataArr?.map((item, index) => (
          <div className='flex flex-col gap-2 my-3 text-sm' key={index}>
            <div className='flex justify-between'>
              <p className='w-[26px] text-right'>
                {item?.homeScore ? item?.homeScore : 0}
              </p>
              <p className='text-center text-[#D1D1D1]'>
                {item?.name?.charAt(0)?.toUpperCase() + item?.name?.slice(1)}
              </p>
              <p className='w-[26px] text-right'>
                {item?.awayScore ? item?.awayScore : 0}
              </p>
            </div>
            <div className='flex items-center'>
              <Line
                strokeColor={`${
                  item?.homeScore > 0 && item?.awayScore > 0
                    ? Color.home
                    : '#27282D'
                }`}
                trailColor='#27282D'
                className={`transform -scale-x-100 h-2`}
                strokeWidth={3}
                trailWidth={3}
                percent={calculatePercent(
                  item?.awayScore ? item?.awayScore : 0,
                  item?.homeScore ? item?.homeScore : 0
                )}
              />

              <Line
                className={`mx-2 h-2`}
                strokeWidth={3}
                trailWidth={3}
                percent={calculatePercent(
                  item?.awayScore ? item?.awayScore : 0,
                  item?.homeScore ? item?.homeScore : 0
                )}
                strokeColor={`${
                  item?.homeScore > 0 && item?.awayScore > 0
                    ? Color.away
                    : '#27282D'
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
