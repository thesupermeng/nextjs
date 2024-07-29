import Image from 'next/image';
import React from 'react';
import { InjuryV2 } from '../assets/assets';

export default function InjurieSusp({ homePlayerList, awayPlayerList }) {
  return (
    <div className='mt-4'>
      <h1 className='mb-4 text-lg font-medium'>Injuries & Suspensions</h1>
      <div className='grid grid-cols-2 gap-4'>
        {homePlayerList &&
          homePlayerList.map((item, index) => (
            <div className='flex' key={index}>
              <div className='relative'>
                <Image
                  className='w-[30px] h-[30px] rounded-full bg-[#5C0012]'
                  src={item.player.icon}
                  alt='avatar'
                  width={30}
                  height={30}
                />
                <Image
                  className=' w-[14px] h-[14px] absolute bottom-[2px] right-[-2px]'
                  src={InjuryV2.src}
                  alt='avatar'
                  width={14}
                  height={14}
                />
              </div>
              <div className='flex flex-col ml-2'>
                <p className='font-medium truncate'>
                  {item.player.short_name_en
                    ? item.player.short_name_en
                    : item.player.name_en}
                </p>
                <small className='text-xs text-[#717698]'>{item.reason}</small>
              </div>
            </div>
          ))}
        {awayPlayerList &&
          awayPlayerList.map((item, index) => (
            <div className='flex' key={index}>
              <div className='relative'>
                <Image
                  className='w-[30px] h-[30px] rounded-full bg-[#013C6B]'
                  src={item.player.icon}
                  alt='avatar'
                  width={30}
                  height={30}
                />
                <Image
                  className=' w-[14px] h-[14px] absolute bottom-[2px] right-[-2px]'
                  src={InjuryV2.src}
                  alt='avatar'
                  height={14}
                  width={14}
                />
              </div>
              <div className='flex flex-col ml-2'>
                <p className='font-medium truncate'>
                  {item.player.short_name_en
                    ? item.player.short_name_en
                    : item.player.name_en}
                </p>
                <small className='text-xs text-[#717698]'>{item.reason}</small>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
