import { UserGuideStages, setUserGuideStep } from '@/store/userGuide';
import { UserGuideBanner } from '../userGuide/userGuideBanner';
import { HomeGuide } from '../userGuide/userGuideSteps/homeGuide';
import useGetConfig from '@/hook/user/useGetConfig';
import useUser from '@/hook/user/useUser';
import { useDispatch, useSelector } from 'react-redux';
import useWithdrawInfo from '@/hook/user/useWithdrawInfo';
import { useCallback, useEffect } from 'react';
import { DepositGuide } from '../userGuide/userGuideSteps/depositGuide';
import { usePathname, useRouter } from 'next/navigation';
import { useAchievement } from './useAchievement';
import { CounterFAB } from '../userGuide/counterFAB';

export const UserGuides = () => {
  const { config } = useGetConfig();
  const { isLogin } = useUser();
  const { isTutorialGuideCompleted, tutorial_achievement_id } =
    useAchievement();
  const userGuideStage = useSelector((s) => s.userGuide.currentStep);
  const dispatch = useDispatch();
  const router = useRouter();
  const { processTopup } = useWithdrawInfo();
  const pathname = usePathname();

  const minAmount =
    config?.static_promotion?.static_promotion_one_time_bonus_min_amount / 100;
  const reward =
    config?.static_promotion?.static_promotion_one_time_bonus_reward_amount /
    100;

  useEffect(() => {
    if (tutorial_achievement_id) {
      if (isTutorialGuideCompleted?.achievement_id == tutorial_achievement_id) {
        dispatch(setUserGuideStep(UserGuideStages.Depositing));
      } else {
        dispatch(setUserGuideStep(UserGuideStages.Banner));
      }
    }
  }, [isTutorialGuideCompleted, tutorial_achievement_id]);

  useEffect(() => {
    if (userGuideStage === UserGuideStages.Register) {
      if (!isLogin && pathname === '/user/deposit') {
        router.push('/user/signup');
      } else if (processTopup) {
        processUserGuideTopup();
        dispatch(setUserGuideStep(UserGuideStages.Depositing));
      }
    }
  }, [isLogin, processTopup, userGuideStage, router]);
  const processUserGuideTopup = useCallback(async () => {
    processTopup(minAmount).then(() => {
      dispatch(setUserGuideStep(UserGuideStages.DepositDone));
    });
  }, [processTopup, minAmount]);

  const onTimeup = useCallback(() => {
    dispatch(setUserGuideStep(''));
  }, []);

  return (
    <>
      {userGuideStage === UserGuideStages.Banner &&
      // currentPromotion?.reward &&
      minAmount ? (
        <UserGuideBanner
          config={config}
          reward={reward}
          minAmount={minAmount}
        />
      ) : null}
      {userGuideStage === UserGuideStages.HomeGuide && <HomeGuide />}
      {userGuideStage === UserGuideStages.DepositGuide && (
        <DepositGuide reward={reward} minAmount={minAmount} />
      )}
      {/* {userGuideStage === UserGuideStages.Register && (
        <UserGuideRegisterNow reward={reward} minAmount={minAmount} />
      )} */}
      {isLogin && userGuideStage === UserGuideStages.Depositing && (
        <CounterFAB
          startTime={isTutorialGuideCompleted?.created_at}
          reward={reward}
          minAmount={minAmount}
          onTimeup={onTimeup}
        />
      )}
    </>
  );
};
