import { useEffect, useRef } from 'react';
import { GenericActionType } from '@/util/genericAction';
import { useSendLog } from './useSendLog';
import { useFocusRoomId } from './user/useFocusRoomId';
import { useSelector } from 'react-redux';

export const useGenericLogs = () => {
  const user = useSelector((s) => s.user.userInfo);
  const roomIdRef = useRef(null);
  const pauseRef = useRef(null);
  const { sendLogs } = useSendLog();
  const { roomId } = useFocusRoomId();
  const interval = useRef(null);
  const isCountingDown = useRef(false);

  useEffect(() => {
    if (roomId && !isCountingDown.current) {
      if (roomIdRef.current === roomId) return;
      roomIdRef.current = roomId;

      sendLogs(GenericActionType.CURRENT_VIEW, roomId, {
        duration: 0,
      });

      isCountingDown.current = true;
      setTimeout(() => {
        isCountingDown.current = false;
      }, 1000);
    }
  }, [roomId, user]);

  useEffect(() => {
    if (roomId) {
      interval.current = setInterval(() => {
        if (pauseRef.current) return;
        sendLogs(GenericActionType.CURRENT_VIEW, roomId, {
          duration: 60,
        });
      }, 60000);
    }
    return () => {
      clearInterval(interval.current);
      roomIdRef.current = null;
    };
  }, [roomId]);

  const onVisibilityChange = () => {
    const hidden =
      window.document.hidden ||
      window.document.mozHidden ||
      window.document.msHidden ||
      window.document.webkitHidden;

    if (hidden) {
      pauseRef.current = true;
    } else {
      pauseRef.current = false;
    }
  };

  useEffect(() => {
    window.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);
};
