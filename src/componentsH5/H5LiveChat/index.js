'use client';
import { LiveChatDataId, LiveChatLicense } from '@/config/common';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import { FullPageContent } from '../FullPageContent';

export const H5LiveChat = () => {
  let [dragInfo, setDragInfo] = useState(null);
  const isApp = useSelector((s) => s.common.isApp);
  const pathname = usePathname();
  const isShowLiveChat =
    !isApp &&
    !pathname.includes('/coinpal/result') &&
    (pathname === '/home' ||
      pathname === '/promotion' ||
      pathname === '/user/home' ||
      pathname === '/sports/Eastrich' ||
      pathname === '/sports/FB' ||
      pathname.includes('/live/'));

  let handleDragStart = (e, data) => {
    setDragInfo({
      x: data.x,
      y: data.y,
      time: Date.now(),
    });
  };

  let handleDragStop = (e, data) => {
    if (!dragInfo) return;
    let change = {
      x: Math.abs(data.x - dragInfo.x),
      y: Math.abs(data.y - dragInfo.y),
      time: Date.now() - dragInfo.time,
    };
    if (change.x + change.y <= 10 && change.time < 300) e.srcElement?.click?.();
  };

  return (
    <FullPageContent className='bg-transparent pointer-events-none'>
      <Draggable
        axis='y'
        onStart={handleDragStart}
        onStop={handleDragStop}
        allowAnyClick={true}
        bounds='parent'
      >
        <div
          style={{ pointerEvents: 'auto' }}
          className={`${
            isShowLiveChat ? 'visible' : 'hidden'
          } p-1 absolute right-0 bottom-60 bg-tayaRed items-center w-[34px] h-[34px] rounded-full z-50`}
        >
          <div data-id={LiveChatDataId} className='livechat_button'>
            <a
              href={`https://www.livechat.com/?utm_source=chat_button&utm_medium=referral&utm_campaign=lc_${LiveChatLicense}`}
            ></a>
          </div>
        </div>
      </Draggable>
    </FullPageContent>
  );
};
