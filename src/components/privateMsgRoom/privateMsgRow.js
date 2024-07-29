import { convertTimeStampToDateTime } from '@/util/date';
import { AuthorType } from '@/util/liveChatConst';
import React from 'react';

export const PrivateMsgRow = ({ chatInfo }) => {
  const { minutes, hours, ampm } = convertTimeStampToDateTime(
    chatInfo?.timestamp,
    true
  );
  return (
    <div
      style={{ maxWidth: '80%' }}
      className={`flex flex-col ${
        chatInfo?.authorType === AuthorType.Agent ? 'self-start' : 'self-end'
      } `}
    >
      <div
        className={`${
          chatInfo?.authorType === AuthorType.Agent
            ? 'bg-[#191A1D]'
            : 'bg-[#242B3E]'
        }  p-3 rounded-xl flex text-13`}
      >
        {chatInfo?.data}
      </div>
      <div
        className={`flex px-2 mt-1 ${
          chatInfo?.authorType === AuthorType.Agent ? 'self-start' : 'self-end'
        } `}
      >
        <div className='text-[11px] text-white/50'>
          {hours}:{minutes}
          {ampm}
        </div>
      </div>
    </div>
  );
};
