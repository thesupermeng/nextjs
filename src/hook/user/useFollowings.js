import { URL_USER } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import { useCallback } from 'react';
import useSWR from 'swr';
import useUser from './useUser';

export default function () {
  const { isLogin } = useUser();

  const { data, mutate } = useSWR(
    isLogin ? URL_USER.followings : false,
    (url) => UserApi(url, {}, { method: 'GET' })
  );

  const followStreamer = useCallback(async (id = null) => {
    return UserApi(URL_USER.followStreamer, { streamer_id: id }).then((res) => {
      setTimeout(() => mutate());
    });
  }, []);

  const unFollowStreamer = async (id = null) => {
    return UserApi(
      URL_USER.followStreamer,
      { streamer_id: id },
      { method: 'DELETE' }
    ).then((res) => {
      setTimeout(() => mutate());
    });
  };

  return {
    data: data?.data || [],
    followList: data?.data || [],
    mutateFollowing: mutate,
    followStreamer: followStreamer,
    unFollowStreamer: unFollowStreamer,
  };
}
