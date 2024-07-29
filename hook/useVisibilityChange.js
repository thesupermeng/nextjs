'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useSendLog } from './useSendLog';
import { GenericActionType } from '@/util/genericAction';
import { useFocusRoomId } from './user/useFocusRoomId';

export const useVisibilityChange = () => {
  const { roomId, streamerId } = useFocusRoomId();
  const roomIdRef = useRef(roomId);
  const streamerIdRef = useRef(streamerId);
  const { sendLogs } = useSendLog();

  const pathname = usePathname();
  const isStreamRoom = useRef(false);

  const isLive =
    pathname.includes('/stream/') || pathname.includes('/liveplay/');

  const timerType = {
    stayDuration: 'stayDuration',
    webOnPage: 'webOnPage',
  };
  const startTimes = {
    stayDuration: useRef(null),
    webOnPage: useRef(null),
  };
  const times = {
    stayDuration: useRef(0),
    webOnPage: useRef(0),
  };

  useEffect(() => {
    roomIdRef.current = roomId;
    streamerIdRef.current = streamerId;
  }, [roomId, streamerId]);

  const startTimer = (timer) => {
    startTimes[timer].current = Date.now();
  };

  const stopTimer = (timer) => {
    if (startTimes[timer].current) {
      times[timer].current += Math.floor(
        (Date.now() - startTimes[timer].current) / 1000
      );
      startTimes[timer].current = null;
    }
  };

  const onVisibilityChange = () => {
    const hidden =
      window.document.hidden ||
      window.document.mozHidden ||
      window.document.msHidden ||
      window.document.webkitHidden;

    if (hidden) {
      stopTimer(timerType.webOnPage);
      stopTimer(timerType.stayDuration);

      if (isStreamRoom.current && times.webOnPage.current > 0) {
        sendLogs(GenericActionType.WEB_ONPAGE, roomIdRef.current, {
          duration: times.webOnPage.current,
          streamerId: streamerIdRef.current
            ? parseInt(streamerIdRef.current)
            : 0,
        });
        times.webOnPage.current = null;
      }
      sendLogs(GenericActionType.STAY_DURATION, null, {
        duration: times.stayDuration.current,
      });
      times.stayDuration.current = null;
    } else {
      startTimer(timerType.webOnPage);
      startTimer(timerType.stayDuration);
    }
  };

  useEffect(() => {
    startTimer(timerType.stayDuration);
    return () => stopTimer(timerType.stayDuration);
  }, []);
  useEffect(() => {
    if (isLive) {
      isStreamRoom.current = true;
      startTimer(timerType.webOnPage);
    }

    return () => {
      if (isLive) {
        stopTimer(timerType.webOnPage);
        sendLogs(GenericActionType.WEB_ONPAGE, roomIdRef.current, {
          duration: times.webOnPage.current,
          streamerId: streamerIdRef.current
            ? parseInt(streamerIdRef.current)
            : 0,
        });
        times.webOnPage.current = null;
        isStreamRoom.current = false;
      }
    };
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('beforeunload', onVisibilityChange);
    return () => {
      window.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('beforeunload', onVisibilityChange);
    };
  }, []);
};
