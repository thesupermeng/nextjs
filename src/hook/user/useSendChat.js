import SocketAction from '@/components/socket/socketAction';
import { useCallback } from 'react';
import useUser from './useUser';
import useSWR from 'swr';
import { URL_USER } from '@/config/url';
import { useStreamer } from './useStreamer';
import { User_Refresh_Interval } from '@/config/User/setting';
import { useDispatch, useSelector } from 'react-redux';

export const useSendChat = () => {
  const { user = {}, isLogin } = useUser();
  const { streamer } = useStreamer();
  const silentTill = useSelector((s) => s.chatRoom.silentTill);
  const sendChat = useCallback(
    (msg) => {
      const socket = SocketAction.instance.getSocket('chat');
      if (!isLogin || !socket || !streamer?.live?.chat_room) return;
      if (silentTill) {
        const nowTime = new Date();
        if (nowTime.getTime() < silentTill) {
          return 'block';
        }
      }
      const sendMessage = {
        room: streamer.live.chat_room,
        message: msg,
        nickname: user.nickname,
        user_id: user.id,
        avatar: user.avatar,
        user_type: 3,
        // timestamp: Date.now(),
        signature: user.signature,
        type: 1,
      };

      socket.emit('room', sendMessage);
    },
    [user, streamer, silentTill]
  );
  return { sendChat };
};
