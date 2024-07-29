import { BackHover } from '@/asset/icons';
import Image from 'next/image';
import React from 'react';

export const RightMenuSubpageHeader = ({ label, onBack, right = null }) => {
  return (
    <div
      className={`flex justify-between bg-opacity-10 bg-[#0909091A] shadow-md pb-5`}
    >
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-2'>
          <Image
            src={BackHover}
            alt='back'
            width={40}
            height={40}
            onClick={onBack}
            className='w-10 h-10 opacity-20 hover:opacity-100 cursor-pointer'
          />
          <p className='text-base'>{label}</p>
        </div>
        {right}
      </div>
    </div>
  );
};
