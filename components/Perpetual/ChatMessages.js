'use client';
import { useFocusStream } from '@/hook/user/useFocusStream';
import {
  addFollowBetList,
  addNewMessage,
  clearAllFollowList,
  clearAllMessage,
} from '@/store/chatroom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SocketAction from '../socket/socketAction';
import { ChatRoomMsgType } from '../socket/util';

export const ChatMessages = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();
  const { focusStream } = useFocusStream();

  const getChatSocket = () => {
    const so = SocketAction.instance.getSocket('chat');
    if (so) {
      setSocket(so);
    } else {
      return setTimeout(getChatSocket, 100);
    }
  };
  useEffect(() => {
    getChatSocket();
  }, []);
  useEffect(() => {
    const roomId = focusStream?.chat_room;
    if (roomId && socket) {
      dispatch(clearAllMessage());
      dispatch(clearAllFollowList());
      // socket?.io?.on('reconnect', () => {
      //   socket.emit('join', { room: roomId, rejoin: true });
      // });

      socket.on('room', (msg) => {
        if (msg.type === ChatRoomMsgType.TEXT) {
          // 自己发的消息也会通过socket获取
          dispatch(addNewMessage({ message: msg }));
        }
        if (msg.type === ChatRoomMsgType.FOLLOWBET) {
          dispatch(addNewMessage({ message: msg }));
          dispatch(addFollowBetList(msg));
        }
      });
      socket.emit('leave', { room: roomId });
      socket.emit('join', { room: roomId, rejoin: false });
    }
    return () => {
      socket?.emit('leave', { room: roomId });
      socket?.off('room');
    };
  }, [focusStream?.chat_room, socket]);
  return <></>;
};

const followBetData = {
  room: 'stream:7560',
  message: {
    amount: 90,
    match_id: 939785,
    mg_id: 5429691,
    ty: 1,
    op_od: 1.14,
    op_nm: '-0/0.5',
    nm: 'Manchester City vs Manchester United',
    op_na: 'Manchester City',
    mg_nm: 'Handicap',
    sid: 1,
    ms: 3,
    lg_na: 'NBA',
    bt: 1710234440,
  },
  nickname: 'moises',
  avatar:
    'https://avatars.steamstatic.com/0026a214927e7d3b7c67c47cd807657600b5253c_full.jpg',
  user_id: -1,
  user_type: 2,
  type: -2,
  timestamp: 1710470162,
  datetime: '2024-03-15 02:36:02',
};
