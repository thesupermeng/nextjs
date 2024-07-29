import { IconSendChat, IconSendChatActive, ImportImg } from '@/asset/icons';
import Image from 'next/image';
import React, { useState } from 'react';
import { BottomChatInput } from './bottomChatInput';
import { QuickQuestion } from './quickQuestion';

export const BottomPrivateMsgRow = () => {
  const [input, setInput] = useState('');

  return (
    <div className='py-2 bg-[#020202] w-full flex flex-col gap-2 items-center'>
      <QuickQuestion setInput={setInput} />
      <div className='w-full flex flex-row p-3 gap-2 items-center'>
        <label className='flex flex-col items-center'>
          <Image src={ImportImg} alt='import' width={50} height={50} />
          <input
            type='file'
            accept='image/*'
            // onChange={handleFileChange}
            className='hidden'
          />
        </label>
        <BottomChatInput input={input} setInput={setInput} />
        <Image
          src={input.length > 0 ? IconSendChatActive : IconSendChat}
          width={30}
          height={30}
          alt='iconSendChat'
        />
      </div>
    </div>
  );
};
