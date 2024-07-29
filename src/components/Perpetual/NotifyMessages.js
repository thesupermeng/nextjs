'use client';
import { useFocusStream } from '@/hook/user/useFocusStream';
import { deleteMessageById, updateSilentTime } from '@/store/chatroom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocketAction from '../socket/socketAction';
import useUser from '@/hook/user/useUser';
import { setBalance } from '@/store/user';
import { useStreamer } from '@/hook/user/useStreamer';
import { setHostRecommendationList } from '@/store/hostRecommendation';

const NotifyEventNames = {
  SilenceStatus: 'room_user_silence_status',
  DeleteMessage: 'delete_room_message',
  UpdateBalance: 'balance_change',
  RoomLiveStatus: 'room_live_status',
  BetRecommendation: 'streamer_bet_recommendation',
};
export const NotifyMessages = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();
  const { focusStream } = useFocusStream();
  const { user, mutateUser } = useUser();
  const { mutateStreamer } = useStreamer();
  const { matchId: currentMatchId } = useSelector((s) => s.common);

  const getNotifySocket = () => {
    const so = SocketAction.instance.getSocket('notify');
    if (so) {
      setSocket(so);
    } else {
      return setTimeout(getNotifySocket, 100);
    }
  };
  useEffect(() => {
    getNotifySocket();
  }, []);
  const deleteRoomMessage = (id) => {
    dispatch(deleteMessageById(id));
  };
  const updateSilent = (t) => {
    dispatch(updateSilentTime(t));
  };
  const updateRecommendationList = (list) => {
    dispatch(setHostRecommendationList(list));
  };
  const clearRecommendationList = () => {
    dispatch(setHostRecommendationList([]));
  };
  useEffect(() => {
    const roomId = 'streamer:' + focusStream?.streamer_id;
    if (focusStream?.streamer_id && socket) {
      socket.on('room', (msg) => {
        if (msg?.room === roomId) {
          if (msg?.event === NotifyEventNames.DeleteMessage) {
            deleteRoomMessage(msg.message_id);
          } else if (msg?.event === NotifyEventNames.SilenceStatus) {
            updateSilent(msg.timestamp * 1000);
          } else if (msg?.event === NotifyEventNames.RoomLiveStatus) {
            mutateStreamer();
          }
        }
      });
      socket.emit('leave', { room: roomId });
      socket.emit('join', { room: roomId, rejoin: false });
    }

    return () => {
      socket?.emit('leave', { room: roomId });
      socket?.off('room');
    };
  }, [focusStream?.streamer_id, socket, user]);

  // streamer_bet_recommendation
  useEffect(() => {
    clearRecommendationList();
    const matchId = 'match:' + currentMatchId;
    if (currentMatchId && socket) {
      socket.on('streamer_bet_recommendation', (msg) => {
        if (msg.match_id === currentMatchId)
          updateRecommendationList(msg?.recommended_details);
        else {
          socket.emit('leave', { room: msg?.room });
        }
      });
      socket.emit('leave', { room: matchId });
      socket.emit('join', { room: matchId, rejoin: false });
    }
    return () => {
      socket?.emit('leave', { room: matchId });
      socket?.off('streamer_bet_recommendation');
    };
  }, [socket, currentMatchId, focusStream?.streamer_id]);

  useEffect(() => {
    if (socket && user) {
      socket.on('room', (msg) => {
        if (msg?.event === NotifyEventNames.UpdateBalance) {
          if (msg?.room === user?.signature) {
            mutateUser();
          }
        }
      });
      socket?.emit('join', { room: user?.signature, rejoin: false });
    }
    return () => {
      socket?.emit('leave', { room: user?.signature });
    };
  }, [socket, user]);
  return <></>;
};

const msg = `
42["room",{"event":"room_user_silence_status","room":"streamer:72","timestamp":1698062506,"streamer_id":72,"user_id":19,"is_silence":true}]	1698055306.2813597
42["room",{"event":"room_user_silence_status","room":"streamer:72","timestamp":0,"streamer_id":72,"user_id":19,"is_silence":false}]	1698055311.6586893
42["room",{"event":"delete_room_message","room":"streamer:72","message_id":"653644441f3b92b2f9de6a3c","message_room":"stream:70"}]	1698055313.525375`;

const betRecommendation = {
  room: 'match:885510',
  match_id: 885510,
  recommended_details: [
    {
      mty: 1007,
      pe: 1001,
      id: 4334226,
      ty: 4,
    },
    {
      mty: 1007,
      pe: 1001,
      id: 4334226,
      ty: 5,
    },
  ],
};
