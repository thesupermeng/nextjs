import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { isWeb } from '@/util/common';
import ChatRow from './ChatRow';
import { NewMessage } from './NewMessage';
import SendChat from './sendChat';
import { FollowBet } from '../followBet';
import { ChatRoomMsgType } from '../socket/util';

//todo try to reverse list, render btm first
export default function Chatroom({ ...props }) {
  const scrollRef = useRef(null);
  const chatList = useSelector(
    (state) => state.chatRoom.chatList,
    shallowEqual
  );
  const [showNewMsg, setShowNewMsg] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const isReachBottom = useRef(true);

  const goToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;

      scrollContainer.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth',
      });
      setShowNewMsg(false);
    }
  };

  useEffect(() => {
    if (isReachBottom.current) {
      goToBottom();
    } else {
      setShowNewMsg(true);
    }
  }, [scrollHeight]);

  const checkOnScroll = () => {
    const bottom =
      parseFloat(scrollRef.current.scrollHeight) -
        parseFloat(scrollRef.current.clientHeight) <=
      parseFloat(scrollRef.current.scrollTop) + 50;

    if (bottom) {
      isReachBottom.current = true;
    } else {
      isReachBottom.current = false;
    }
  };
  useEffect(() => {
    if (scrollRef.current) setScrollHeight(scrollRef.current.scrollHeight);
  }, [chatList]);

  return (
    <div className='flex flex-1 flex-col px-3 w-full' {...props}>
      <div
        className={`relative flex flex-[1_0_0] flex-col gap-3 overflow-y-auto w-full mb-3 ${
          showNewMsg ? '' : ''
        }`}
        ref={scrollRef}
        onScroll={checkOnScroll}
      >
        <div className='h-3'></div>
        {chatList.map((c, index) => {
          if (c.type === ChatRoomMsgType.FOLLOWBET) {
            return <FollowBet msg={c} key={c._id || `${c.user_id}${index}`} />;
          } else {
            return <ChatRow msg={c} key={c._id || `${c.user_id}${index}`} />;
          }
        })}
      </div>
      {showNewMsg && <NewMessage onClick={goToBottom} />}
      {isWeb() && <SendChat />}
    </div>
  );
}
