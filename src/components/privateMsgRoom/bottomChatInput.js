import { CHAT } from '@/config/User/setting';
import React from 'react';

export const BottomChatInput = ({ input, setInput }) => {
  return (
    <div className='w-full bg-white/10 rounded-[10px] p-2 flex flex-row text-white/50 '>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Say Something...'
        className='text-white placeholder:text-white/50 text-[16px] bg-transparent w-full focus:border-0 focus:outline-none'
      />
      <p>
        {input.length}/{CHAT.MAX_CHAR}
      </p>
    </div>
  );
};
