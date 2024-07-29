import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import MatchHistoryItem from './MatchHistoryItem';
import { IconArrowWhite } from '@/asset/icons';
import { isWeb } from '@/util/common';

export default function MatchHistory({
  title,
  id,
  team,
  totalData,
  data,
  sportType,
}) {
  const [isExpand, setIsExpand] = useState(true);
  const { t } = useTranslation();
  return (
    <div className={`${isWeb() ? '' : 'px-3'}`}>
      <div className='rounded-md bg-[#00000033]'>
        <h1 className='mb-4 text-lg font-medium'>{title}</h1>
        {sportType === 1 && (
          <div className='flex items-center justify-around mt-3'>
            <span className='bg-white rounded-full w-[50px] h-[50px] flex justify-center items-center'>
              <Image
                className='w-[40px] h-[40px] object-contain'
                src={team?.icon}
                width={50}
                height={50}
                alt='logo'
              />
            </span>

            <div className='flex flex-col gap-1 text-xs text-center'>
              <div className='flex items-center gap-2'>
                <p className='text-sm'>{t('goals')}</p>
                <p className='text-[22px] font-bold'>
                  {totalData?.goals_scored + totalData?.goals_conceded}
                </p>
              </div>
              <p className='text-[#6F7076] text-sm'>
                G{totalData?.goals_scored}-c{totalData?.goals_conceded}
              </p>
            </div>
            <div className='flex flex-col gap-1 text-xs text-center'>
              <div className='flex items-center gap-2'>
                <p className='text-sm'>{t('goals')}</p>
                <p className='text-[22px] font-bold'>{totalData?.win_rate}%</p>
              </div>
              <span className='text-[#717698] text-sm'>
                <span className='text-[#0AFF5F]'>
                  {totalData?.wins}
                  {t('w')}
                </span>
                <span>-{totalData?.draws}D-</span>
                <span className='text-tayaRed'>
                  {totalData?.losses}
                  {t('l')}
                </span>
              </span>
            </div>

            <div className='font-bold rounded-md border-[#27282D] border-2 text-center w-[64px] text-[11px]'>
              <p className='bg-[#27282D] py-2'>{t('matches')}</p>
              <p className='py-2'>
                {t('last')} {data?.length}
              </p>
            </div>
          </div>
        )}
        {sportType === 2 && (
          <div className='flex justify-between mt-3'>
            <div className='flex items-center gap-5'>
              <span className='bg-white rounded-full w-[50px] h-[50px] flex justify-center items-center'>
                <Image
                  className='object-contain '
                  src={team?.icon}
                  alt='logo'
                  width={40}
                  height={40}
                />
              </span>

              <div className='flex flex-col text-sm'>
                <div className='flex gap-3'>
                  <p>Win</p>
                  <p className='text-[22px] font-bold'>
                    {totalData?.win_rate} %
                  </p>
                </div>

                <span className='text-[#717698] mt-2 text-xs'>
                  <span className='text-[#0AFF5F]'>
                    {totalData?.wins}
                    {t('w')}{' '}
                  </span>
                  <span>
                    {' '}
                    - {totalData?.draws}
                    {t('d')} -{' '}
                  </span>
                  <span className='text-tayaRed'>
                    {totalData?.losses}
                    {t('l')}
                  </span>
                </span>
              </div>
            </div>
            <div className='font-bold rounded-md border-[#27282D] border-2 text-center w-[64px] text-[11px]'>
              <p className='bg-[#27282D] py-2'>{t('matches')}</p>
              <p className='py-2'>
                {t('last')} {data?.length}
              </p>
            </div>
          </div>
        )}
      </div>

      <ul className='flex flex-col gap-3 bg-tayaGrey p-3 mt-2 rounded-[12px]'>
        <span
          className='flex justify-between mt-2 cursor-pointer'
          onClick={() => setIsExpand(!isExpand)}
        >
          <div className='flex gap-3'>
            <span className='w-[24px] h-[24px] bg-white rounded-full flex items-center justify-center overflow-hidden'>
              <Image
                src={data && data[0]?.competition?.icon}
                alt='icon'
                width={16}
                height={16}
              />
            </span>

            <p className='text-[15px]'>
              {(data && data?.[0]?.competition?.name_en) ||
                data?.[0]?.competition?.name_en_short}
            </p>
          </div>

          <Image
            className={`flex-initial transition-transform duration-500 ease-in-out ${
              isExpand ? 'rotate-180' : 'rotate-0'
            }`}
            src={IconArrowWhite}
            alt='expand'
            width={18}
            height={18}
          />
        </span>

        {data &&
          data
            .slice(!isExpand && data.length)
            .map((item, index) => (
              <MatchHistoryItem
                key={`${item?.competition_id} ${item?.match_time_ts}`}
                item={item}
                sportType={sportType}
                id={id}
              />
            ))}
      </ul>
    </div>
  );
}
