'use client';
import { SpeechBubbleIcon } from '@/asset/icons';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { togglePrivateRoom } from '@/store/livechat';
import { getMobileOperatingSystem, isWeb } from '@/util/common';
import Image from 'next/image';
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';

const UnreadMsg = () => {
  const newMessageCount = useSelector((s) => s.livechat.newMsgCount);

  if (newMessageCount <= 0) return null;
  return (
    <div
      className={`absolute -top-2 -right-1 ${
        newMessageCount < 100 ? 'w-[21px]' : 'w-[26px]'
      }  h-[21px] bg-tayaRed rounded-full flex justify-center items-center text-[10px] font-extrabold`}
    >
      {newMessageCount < 100 ? newMessageCount : '99+'}
    </div>
  );
};
export const SpeechBubble = () => {
  const dispatch = useDispatch();
  const privateRoom = useSelector((s) => s.livechat.privateRoom);
  const [dragInfo, setDragInfo] = useState(null);

  let handleDragStart = (e, data) => {
    setDragInfo({
      x: data.x,
      y: data.y,
      time: Date.now(),
    });
  };

  let handleDragStop = (e, data) => {
    if (!dragInfo) return;
    if (!isWeb() && getMobileOperatingSystem() === 'iOS') {
      const change = {
        x: Math.abs(data.x - dragInfo.x),
        y: Math.abs(data.y - dragInfo.y),
        time: Date.now() - dragInfo.time,
      };
      if (change.x + change.y <= 10 && change.time < 300)
        e.srcElement?.click?.();
    }
  };

  return (
    <FullPageContent
      className='bg-transparent pointer-events-none'
      full={!isWeb()}
    >
      <Draggable
        axis='both'
        allowAnyClick={true}
        bounds='parent'
        cancel='on-drag'
        onStart={handleDragStart}
        onStop={handleDragStop}
      >
        <div
          className={`on-drag fixed bottom-10 z-50`}
          style={{ pointerEvents: 'auto' }}
        >
          <div
            onClick={() => dispatch(togglePrivateRoom(!privateRoom))}
            className='cursor-pointer  bg-white rounded-full w-[46px] h-[46px] flex items-center justify-center'
          >
            <UnreadMsg />
            <Image
              src={SpeechBubbleIcon}
              alt='SpeechBubbleIcon'
              width={22}
              height={22}
              draggable={false}
            />
          </div>
        </div>
      </Draggable>
    </FullPageContent>
  );
};
