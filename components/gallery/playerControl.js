import { Play, Reload, ViewerIcon } from '@/asset/icons';
import Image from 'next/image';
import React from 'react';
import Mute from '../videoPlayer/controlElements/Mute';

export default function PlayerControl() {
  return (
    <div className='flex flex-row items-start self-stretch justify-around flex-initial gap-4'>
      <div className='flex flex-col flex-1 gap-3'>
        <div className='flex items-center flex-initial gap-3'>
          <div className='flex-1 bg-tayaRed rounded-[5rem] h-1'></div>
        </div>
        <div className='flex justify-between flex-initial'>
          <div className='flex flex-row items-center'>
            <div className='ml-3 py-1 px-2 items-center rounded-[6.25rem] bg-black/50 backdrop-blur-[2px] flex flex-row gap-1'>
              <Image alt='viewer' src={Play} className='w-[20px] h-[20px]' />
            </div>
            <div className='ml-3 py-1 px-2 items-center rounded-[6.25rem] bg-black/50 backdrop-blur-[2px] flex flex-row gap-1'>
              <Image alt='viewer' src={Reload} className='w-[20px] h-[20px]' />
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <Mute />
          </div>
        </div>
      </div>
    </div>
  );
}
