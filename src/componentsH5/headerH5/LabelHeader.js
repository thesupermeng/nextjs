'use client';
import React from 'react';
import HeaderBetSlip from '../headerBetSlip';
import { useOffsetPosition } from '@/hook/useOffsetPosition';

export default function LabelHeader({ label, withBetSlip = true }) {
  const { checkOffset } = useOffsetPosition();

  return (
    <>
      <div
        style={{ top: `${checkOffset(3)}rem` }}
        className={`common-transition fixed bg-black flex items-center flex-initial pl-5 object-contain justify-between w-full z-10 opacity-1`}
      >
        <div className='text-[22px] font-bold'>{label}</div>

        <div className='flex items-center'>
          {withBetSlip && <HeaderBetSlip />}
        </div>
      </div>
    </>
  );
}
