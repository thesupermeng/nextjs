import { useAchievementList } from '@/hook/user/useAchievementList';
import useGetConfig from '@/hook/user/useGetConfig';
import useUser from '@/hook/user/useUser';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useAchievement = () => {
  const { isLogin } = useUser();
  const { config } = useGetConfig();
  const { completeAchievement, getAchievementObj } = useAchievementList();
  const isApp = useSelector((s) => s.common.isApp);
  const { reward_achievement_id, tutorial_achievement_id } =
    config?.static_promotion || {};
  const isUserGuideComplete = useMemo(() => {
    const rewardObj = getAchievementObj(reward_achievement_id);
    return !!rewardObj;
  }, [getAchievementObj, reward_achievement_id]);
  const isTutorialGuideCompleted = useMemo(() => {
    return getAchievementObj(tutorial_achievement_id);
  }, [getAchievementObj, tutorial_achievement_id]);
  return {
    isStaticRewardCompleted: (isLogin && isUserGuideComplete) || isApp,
    isTutorialGuideCompleted,
    completeTutorial: () => completeAchievement(tutorial_achievement_id),
    tutorial_achievement_id,
  };
};
