import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ErLivechat } from '.';
import Image from 'next/image';
import { CrossWhite, DragChatIcon } from '@/asset/icons';
import { useDispatch, useSelector } from 'react-redux';
import { togglePrivateRoom } from '@/store/livechat';

export const WebDraggableChat = () => {
  let [dragInfo, setDragInfo] = useState(null);
  const dispatch = useDispatch();
  const showPrivateRoom = useSelector((e) => e.livechat.privateRoom);

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
    <Draggable
      axis='both'
      onStart={handleDragStart}
      onStop={handleDragStop}
      allowAnyClick={true}
      bounds='parent'
    >
      <div
        className={`absolute bottom-10 left-20 z-30 bg-[#28292B] rounded-xl overflow-hidden ${
          showPrivateRoom ? 'visible' : 'invisible'
        }`}
      >
        <div className='flex items-center justify-center'>
          <Image
            src={DragChatIcon}
            alt='DragChatIcon'
            width={36}
            height={11}
            className='my-5'
            draggable={false}
          />
        </div>

        <Image
          onClick={() => dispatch(togglePrivateRoom(false))}
          src={CrossWhite}
          alt='CrossWhite'
          width={33}
          height={33}
          className='absolute right-3 top-3 opacity-20 hover:opacity-100 cursor-pointer'
        />
        <ErLivechat />
      </div>
    </Draggable>
  );
};
