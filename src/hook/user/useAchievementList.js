import { URL_USER } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import useSWR from 'swr';
import useUser from './useUser';
import { useCallback } from 'react';

export const useAchievementList = () => {
  const { isLogin } = useUser();
  const { data, mutate } = useSWR(
    isLogin ? URL_USER.getAchievementList : null,
    (url) => UserApi(url, {}, { method: 'GET' }),
    {
      revalidateOnFocus: false,
    }
  );

  const completeAchievement = async (id) => {
    const achivementObj = await getAchievementObj(id);
    if (achivementObj?.achievement_id == id) {
      return false;
    } else {
      return UserApi(
        URL_USER.completeAchievement,
        { achievement_id: parseInt(id) },
        { method: 'POST' }
      ).then((res) => {
        console.log(res);
        setTimeout(() => mutate());
      });
    }
  };

  const getAchievementObj = useCallback(
    (id) => {
      if (id && data?.data?.achievements) {
        const found = data?.data?.achievements?.find(
          ({ achievement_id }) => achievement_id == id
        );
        return found;
      } else {
        return false;
      }
    },
    [data?.data?.achievements]
  );

  return {
    achievedList: data?.data?.achievements,
    completeAchievement,
    getAchievementObj,
  };
};
