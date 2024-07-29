import Image from 'next/image';
import React from 'react';
import { basketballHomeAway, basketballHomeTeam } from '@/assets/assets';
import vars from '@/global/vars';

export default function InjuryComponent({ data, isHome = true }) {
  return (
    <div className='flex'>
      <div className='relative'>
        <Image
          src={isHome ? basketballHomeTeam : basketballHomeAway}
          width={30}
          height={30}
          alt='team'
        />
        <p className='absolute top-1 left-1'>{data?.player?.shirt_number}</p>
      </div>
      <div className='flex flex-col'>
        <p className=' w-[100px] truncate font-thin text-md'>
          {data?.player?.name_en_short?.length > 0
            ? data?.player?.name_en_short
            : data?.player?.short_name_en?.length > 0
            ? data?.player?.short_name_en
            : data?.player?.name_en}
        </p>
        <p className='font-thin text-theme-sub w-[100px] truncate text-sm'>
          {vars.basketballPosition[data?.player?.position]}
        </p>
      </div>
    </div>
  );
}
