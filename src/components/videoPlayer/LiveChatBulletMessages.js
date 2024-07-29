import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NewsTicker } from '../newsTicker/NewsTicker';
import { isWeb } from '@/util/common';
import { ChatRoomMsgType } from '../socket/util';

const BulletInterval = 200;
const TotalBulletsLane = 5;
const TopPercent = 10;
const BottomPercent = 85;
const LaneWidth = (BottomPercent - TopPercent) / TotalBulletsLane;
//screen 5% to 85%
export const LiveChatBulletMessages = () => {
  const bulletsBufferRef = useRef([]);
  const laneIdxRef = useRef(0);
  const laneOrdersRef = useRef([]);
  const [bulletsOnDisplay, setBulletsOnDisplay] = useState([]);
  const chatList = useSelector((s) => s.chatRoom.chatList);

  const intervalRef = useRef(null);

  const generateRandomInteger = () => {
    if (laneIdxRef.current === 0) {
      laneOrdersRef.current = new Array(TotalBulletsLane)
        .fill(0)
        .map((_, idx) => idx)
        .sort(() => Math.random() - 0.5);
    }
    laneIdxRef.current = (laneIdxRef.current + 1) % TotalBulletsLane;
    const pos =
      TopPercent +
      (laneOrdersRef.current[laneIdxRef.current] + Math.random() * 0.8 + 0.2) *
        LaneWidth;

    return pos;
  };
  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const newBullet = bulletsBufferRef.current.shift();
      if (newBullet) {
        setBulletsOnDisplay((arr) => {
          return [...arr, newBullet];
        });
      }
    }, BulletInterval);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const shouldShowBullet = (chat) => {
    return chat.user_type != 1 && chat.type !== ChatRoomMsgType.FOLLOWBET;
  };
  useEffect(() => {
    if (chatList.length > 0) {
      const chat = chatList[chatList.length - 1];
      if (shouldShowBullet(chat)) {
        bulletsBufferRef.current.push({
          ...chat,
          bulletId: `${chat.nickname}${chat.user_type}${chat.timestamp}`,
          livePosition: generateRandomInteger(),
        });
      }
    }
  }, [chatList]);

  const removeBullet = useCallback((id) => {
    setBulletsOnDisplay((arr) => {
      return arr.filter((msg) => {
        return msg.bulletId !== id;
      });
    });
  }, []);
  return (
    <div className='absolute inset-0'>
      {bulletsOnDisplay.map((msg) => {
        return (
          <ChatBullet
            key={msg.bulletId}
            msg={msg.message}
            position={msg.livePosition}
            onEnd={() => {
              removeBullet(msg.bulletId);
            }}
          />
        );
      })}
    </div>
  );
};
const ChatBullet = ({ msg = '', position = 0, onEnd = () => {} }) => {
  return (
    <div
      style={{ top: `${position}%` }}
      className={`absolute inset-x-0 h-fit animate-[fadeIn_1s_ease-in-out]`}
    >
      <NewsTicker always animateOnce onEnd={() => onEnd()}>
        <div
          className={` rounded-full py-1 px-2 ${isWeb() ? '' : 'text-[12px]'}`}
        >
          {msg}
        </div>
      </NewsTicker>
    </div>
  );
};
