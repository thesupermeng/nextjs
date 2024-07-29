import { URL_USER } from '@/config/url';
import { getSilenceUntil } from '@/services/user';
import { updateSilentTime } from '@/store/chatroom';
import { setMatchId } from '@/store/common';
import { UserApi } from '@/util/UserApi';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import useUser from './useUser';

export const useStreamer = (recommend_count) => {
  const dispatch = useDispatch();
  const { isLogin } = useUser();
  const focusStreamId = useSelector((s) => s.streams.focusStreamId);
  const { data, mutate, isLoading } = useSWR(
    focusStreamId
      ? [
          URL_USER.getSteamer,
          { id: focusStreamId, recommend_count: recommend_count || 10 },
        ]
      : null,
    ([url, param]) => UserApi(url, param, { method: 'GET' })
  );
  const pathname = usePathname();
  const isSportsPage = pathname.startsWith('/sports');

  useEffect(() => {
    if (!isSportsPage) {
      dispatch(setMatchId(data?.data?.live?.match?.match_id));
    }
  }, [data?.data]);

  useEffect(() => {
    const getSilenceTill = async (id) => {
      getSilenceUntil(id).then((res) => {
        dispatch(updateSilentTime(res.data * 1000));
      });
    };
    if (isLogin && data?.data?.live?.streamer_id) {
      getSilenceTill(data.data.live.streamer_id);
    } else {
      dispatch(updateSilentTime(0));
    }
  }, [isLogin, data?.data?.live?.streamer_id]);

  return {
    streamer: data?.data || { id: focusStreamId, streamerVoid: true },
    mutateStreamer: mutate,
    isLoading,
  };
};
