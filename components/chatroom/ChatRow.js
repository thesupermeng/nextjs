import { Avatar, EastRichWhiteLogo } from '@/asset/icons';
import { isWeb } from '@/util/common';
import React, { memo } from 'react';
import { ImageWithFallback } from '../fallbackImage';

// todo flv buffer seek latest
function ChatRow({ msg }) {
  return (
    <div
      data-msgid={msg?._id || msg?.timestamp}
      className={`flex self-stretch flex-initial items-start gap-3 py-1 ${
        isWeb() ? 'px-[8px]' : 'px-0'
      }`}
    >
      <div
        className={`relative flex rounded-full shrink-0 ${
          isWeb() ? 'w-10 h-10' : 'w-[30px] h-[30px]'
        }`}
      >
        <ImageWithFallback
          alt='avatar'
          fill
          sizes='50px'
          src={msg.avatar}
          className={`rounded-full`}
          fallbackSrc={Avatar}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <p
          className={`leading-tight font-semibold text-white ${
            isWeb() ? 'text-sm' : 'text-xs'
          }`}
        >
          {msg.nickname}
        </p>
        <p
          style={{ wordBreak: 'break-word' }}
          className={`text-gray-200 font-normal leading-tight whitespace-normal ${
            isWeb() ? 'text-sm' : 'text-xs'
          }`}
        >
          {msg.message}
        </p>
      </div>
    </div>
  );
}

export default memo(ChatRow);
