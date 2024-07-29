import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { basketballHomeTeam } from '../assets/assets';
import { isWeb } from '@/util/common';

function PlayerComponent(props) {
  const {
    homeTopPlayer,
    awayTopPlayer,
    homeHeight,
    awayHeight,
    homeRank,
    awayRank,
    homeScore,
    awayScore,
    homeImage,
    awayImage,
    title,
  } = props;
  return (
    <div className='my-5'>
      <div className='flex relative justify-between'>
        <div className={`flex flex-col ${isWeb() ? 'w-[160px]' : ''}`}>
          <div
            className={`flex ${
              !isWeb() ? 'w-[130px]' : ''
            } justify-between border-b-2 border-tayaRed`}
          >
            <p> {homeScore}</p>
            <div className='relative flex items-end gap-2'>
              <div
                className=' bottom-0 bg-tayaRed w-[30px] rounded-t-sm'
                style={{
                  height: homeHeight,
                }}
              ></div>
            </div>
          </div>

          <div className='flex items-center gap-2 mt-2'>
            <div className='bg-[#7D0018] flex items-center justify-center rounded-full overflow-hidden h-[30px] w-[30px]'>
              <Image
                width={25}
                height={25}
                src={homeImage}
                className='object-cover scale-[180%]'
                alt='icon'
              />
            </div>
            <div className='flex flex-col mt-01 text-sm'>
              <p className=''>{homeTopPlayer}</p>
              <p className='text-[#96979B]'>{homeRank}</p>
            </div>
          </div>
        </div>

        <p className='text-[#96979B] text-xs absolute left-1/2 -translate-x-1/2'>{title}</p>

        <div className={`flex flex-col ${isWeb() ? 'w-[160px]' : ''}`}>
          <div
            className={`flex ${
              !isWeb() ? 'w-[130px]' : ''
            } justify-between border-b-2 border-[#0790FF]`}
          >
            <div className='relative flex items-end gap-2'>
              <div
                className=' bottom-0 bg-[#0790FF] w-[30px] rounded-t-sm'
                style={{
                  height: awayHeight,
                }}
              ></div>
            </div>
            <p>{awayScore}</p>
          </div>
          <div className='flex items-center justify-end gap-2 mt-2 text-right'>
            <div className='flex flex-col text-sm'>
              <p>{awayTopPlayer}</p>
              <p className='text-[#96979B]'>{awayRank}</p>
            </div>
            <div className='bg-[#004781] flex items-center justify-center rounded-full overflow-hidden h-[30px] w-[30px]'>
              <Image
                width={34}
                src={awayImage}
                height={34}
                alt='awayImage'
                className='scale-[130%]'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopPlayerStatistic({ data }) {
  const { t } = useTranslation();
  const calHomeStat = (homeStat, awayStat) =>
    homeStat / (homeStat + awayStat) > 0 ? homeStat / (homeStat + awayStat) : 0;

  const calAwayStat = (homeStat, awayStat) =>
    awayStat / (homeStat + awayStat) > 0 ? awayStat / (homeStat + awayStat) : 0;
  return (
    <div className={`w-full ${isWeb() ? 'p-3' : ''} `}>
      <div className='flex flex-col w-full bg-200 rounded-[8px] p-3'>
        <p className='text-md'>Game Leaders</p>

        {data?.home_top_scorer?.length > 0 &&
          data?.away_top_scorer?.length > 0 && (
            <PlayerComponent
              title={t('points')}
              homeTopPlayer={data?.home_top_scorer[3]}
              awayTopPlayer={data?.away_top_scorer[3]}
              homeScore={data?.home_top_scorer[6][19]}
              awayScore={data?.away_top_scorer[6][19]}
              homeHeight={
                45 *
                calHomeStat(
                  data?.home_top_scorer[6][19],
                  data.away_top_scorer[6][19]
                )
              }
              awayHeight={
                45 *
                calAwayStat(
                  data?.home_top_scorer[6][19],
                  data.away_top_scorer[6][19]
                )
              }
              homeImage={
                data?.home_top_scorer?.[4]?.length > 0
                  ? data?.home_top_scorer[4]
                  : basketballHomeTeam.src
              }
              awayImage={
                data?.away_top_scorer?.[4]?.length > 0
                  ? data?.away_top_scorer[4]
                  : basketballHomeTeam.src
              }
              homeRank={
                data?.home_top_scorer?.[5].length > 0 &&
                `#${data?.home_top_scorer[5]}`
              }
              awayRank={
                data?.away_top_scorer?.[5].length > 0 &&
                `#${data?.away_top_scorer[5]}`
              }
            />
          )}

        {/* Rebounds */}

        {data?.home_top_rebound?.length > 0 &&
          data?.away_top_rebound?.length > 0 && (
            <PlayerComponent
              title={t('rebounds')}
              homeTopPlayer={data?.home_top_rebound[3]}
              awayTopPlayer={data?.away_top_rebound[3]}
              homeScore={data?.home_top_rebound[6][12]}
              awayScore={data?.away_top_rebound[6][12]}
              homeHeight={
                45 *
                calHomeStat(
                  data?.home_top_rebound[6][12],
                  data.away_top_rebound[6][12]
                )
              }
              awayHeight={
                45 *
                calAwayStat(
                  data?.home_top_rebound[6][12],
                  data.away_top_rebound[6][12]
                )
              }
              homeImage={
                data?.home_top_rebound[4] != undefined &&
                data?.home_top_rebound[4].length > 0
                  ? data?.home_top_rebound[4]
                  : basketballHomeTeam.src
              }
              awayImage={
                data?.away_top_rebound?.[4]?.length > 0
                  ? data?.away_top_rebound[4]
                  : basketballHomeTeam.src
              }
              homeRank={
                data?.home_top_rebound?.[5]?.length > 0 &&
                `#${data?.home_top_rebound[5]}`
              }
              awayRank={
                data?.away_top_rebound?.[5]?.length > 0 &&
                `#${data?.away_top_rebound[5]}`
              }
            />
          )}

        {/* Assists */}

        {data?.home_top_assist?.length > 0 &&
          data?.away_top_assist?.length > 0 && (
            <PlayerComponent
              title={t('assists')}
              homeTopPlayer={data?.home_top_assist[3]}
              awayTopPlayer={data?.away_top_assist[3]}
              homeScore={data?.home_top_assist[6][13]}
              awayScore={data?.away_top_assist[6][13]}
              homeHeight={
                45 *
                calHomeStat(
                  data?.home_top_assist[6][13],
                  data.away_top_assist[6][13]
                )
              }
              awayHeight={
                45 *
                calAwayStat(
                  data?.home_top_assist[6][13],
                  data.away_top_assist[6][13]
                )
              }
              homeImage={
                data?.home_top_assist?.[4]?.length > 0
                  ? data?.home_top_assist[4]
                  : basketballHomeTeam.src
              }
              awayImage={
                data?.away_top_assist?.[4]?.length > 0
                  ? data?.away_top_assist[4]
                  : basketballHomeTeam.src
              }
              homeRank={
                data?.home_top_assist?.[5]?.length > 0 &&
                `#${data?.home_top_assist[5]}`
              }
              awayRank={
                data?.away_top_rebound?.[5]?.length > 0 &&
                `#${data?.away_top_assist[5]}`
              }
            />
          )}
      </div>
    </div>
  );
}
