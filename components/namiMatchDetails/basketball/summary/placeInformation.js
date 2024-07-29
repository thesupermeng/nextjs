import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { CourtBg, Fouls, Rebounds, turnOver } from '../assets/assets';
import './style.css';

export default function PlaceInformation({ matchUpdateData }) {
  const { t } = useTranslation();

  const totalDataTemp =
    matchUpdateData?.basketball_match_live?.players?.total ?? [];

  const homeShot = totalDataTemp[20]?.home ?? 0;
  const homeShotAll = totalDataTemp[21]?.home ?? 0;
  const homeShotPerc = totalDataTemp[22]?.home ?? 0;
  const homeFoulShot = totalDataTemp[7]?.home ?? 0;
  const homeFoulShotAll = totalDataTemp[8]?.home ?? 0;
  const homeFoulShotPerc = totalDataTemp[9]?.home ?? 0;
  const homeThirdPoint = totalDataTemp[4]?.home ?? 0;
  const homeThirdPointAll = totalDataTemp[5]?.home ?? 0;
  const homeThirdPointPerc = totalDataTemp[6]?.home ?? 0;

  const awayShot = totalDataTemp[20]?.away ?? 0;
  const awayShotAll = totalDataTemp[21]?.away ?? 0;
  const awayShotPerc = totalDataTemp[22]?.away ?? 0;
  const awayFoulShot = totalDataTemp[7]?.away ?? 0;
  const awayFoulShotAll = totalDataTemp[8]?.away ?? 0;
  const awayFoulShotPerc = totalDataTemp[9]?.away ?? 0;
  const awayThirdPoint = totalDataTemp[4]?.away ?? 0;
  const awayThirdPointAll = totalDataTemp[5]?.away ?? 0;
  const awayThirdPointPerc = totalDataTemp[6]?.away ?? 0;

  const homeFoul = totalDataTemp[16]?.home ?? 0;
  const homeMiss = totalDataTemp[15]?.home ?? 0;
  const homeUB = totalDataTemp[11]?.home ?? 0;

  const awayFoul = totalDataTemp[16]?.away ? totalDataTemp[16]?.away : 0;
  const awayMiss = totalDataTemp[15]?.away ? totalDataTemp[15]?.away : 0;
  const awayUB = totalDataTemp[11]?.away ? totalDataTemp[11]?.away : 0;

  const bottomContent = [
    {
      title: t('rebounds'),
      icon: Rebounds,
      home: homeUB,
      away: awayUB,
    },
    {
      title: t('turnOver'),
      icon: turnOver,
      home: homeMiss,
      away: awayMiss,
    },
    {
      title: t('fouls'),
      icon: Fouls,
      home: homeFoul,
      away: awayFoul,
    },
  ];

  return (
    <div className='flex flex-col items-center px-5 my-8'>
      <div className='relative rounded-md'>
        <Image alt='bg' src={CourtBg.src} width={456} height={407} />

        <div className='red-circle rounded-full absolute top-[15%] left-[10%]'>
          <p>
            {homeShot}-{homeShotAll}
          </p>
          <p>{homeShotPerc}%</p>
        </div>
        <div className='red-circle rounded-full absolute top-[40%] left-[25%]'>
          <p>
            {homeFoulShot}-{homeFoulShotAll}
          </p>
          <p>{homeFoulShotPerc}%</p>
        </div>
        <div className='red-circle rounded-full absolute top-[65%] left-[10%]'>
          <p>
            {homeThirdPoint}-{homeThirdPointAll}
          </p>
          <p>{homeThirdPointPerc}%</p>
        </div>
        <div className='blue-circle rounded-full absolute top-[15%] right-[10%]'>
          <p>
            {awayShot}-{awayShotAll}
          </p>
          <p>{awayShotPerc}%</p>
        </div>
        <div className='blue-circle rounded-full absolute top-[40%] right-[25%]'>
          <p>
            {awayFoulShot}-{awayFoulShotAll}
          </p>
          <p>{awayFoulShotPerc}%</p>
        </div>
        <div className='blue-circle rounded-full absolute top-[65%] right-[10%]'>
          <p>
            {awayThirdPoint}-{awayThirdPointAll}
          </p>
          <p>{awayThirdPointPerc}%</p>
        </div>
      </div>

      <div className='flex w-full gap-3 my-5'>
        {bottomContent?.map((t, index) => {
          return (
            <div
              key={index}
              className='flex-1 bg-[#27282D] text-sm rounded-[5px] flex gap-2 flex-col py-3'
            >
              <p className='text-center text-[#D1D1D1]'>{t.title}</p>
              <div className='flex justify-around gap-3'>
                <p className='text-tayaRed'>{t.home}</p>
                <span>
                  <Image src={t.icon} alt='rebound' width={22} height={22} />
                </span>
                <p className='text-[#0790FF]'>{t.away}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
