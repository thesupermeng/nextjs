import { URL_USER } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import useSWR from 'swr';
import useUser from './useUser';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setErrorModalProps,
  setShowErrorModal,
  showTopUpRedirect,
} from '@/store/common';
import { getTopUpOrder } from '@/services/user';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { useAchievement } from '@/components/Perpetual/useAchievement';

const EmptyArray = [];
export default function useWithdrawInfo() {
  const { isLogin } = useUser();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const { completeTutorial } = useAchievement();

  const { data: withdrawAcc, mutate: mutateWithdrawAcc } = useSWR(
    isLogin ? URL_USER.withdrawAcc : null,
    (url) => UserApi(url, {}, { method: 'GET' }),
    {
      revalidateOnFocus: false,
    }
  );
  const { data: withdrawMethod, mutate: mutateWithdrawMethod } = useSWR(
    isLogin ? URL_USER.getWithdrawMethod : null,
    (url) => UserApi(url, {}, { method: 'GET' }),
    {
      revalidateOnFocus: false,
    }
  );

  const { data: topupMethod } = useSWR(
    isLogin ? URL_USER.getTopUpMethod : null,
    (url) => UserApi(url, {}, { method: 'GET' }),
    {
      revalidateOnFocus: false,
    }
  );

  const processTop = useCallback(
    async (amount, topupId) => {
      dispatch(showTopUpRedirect(true));
      return await getTopUpOrder({
        amount: parseFloat(amount),
        method_id: topupId?.id || topupMethod?.data?.[0]?.id,
      }).then((data) => {
        if (data.code === 0) {
          completeTutorial();
          const redirectUrl = data.data.topup_data;
          router.push(`${redirectUrl}`);
          dispatch(showTopUpRedirect(false));
        } else {
          dispatch(showTopUpRedirect(false));
          dispatch(
            setErrorModalProps({ title: t('error'), message: data?.msg })
          );
          dispatch(setShowErrorModal(true));
        }
      });
    },
    [topupMethod, t, router]
  );
  return {
    processTopup: topupMethod?.data ? processTop : null,
    topupMethod: topupMethod?.data || EmptyArray,
    withdrawAcc: withdrawAcc?.data || EmptyArray,
    withdrawMethod: withdrawMethod?.data || EmptyArray,
    mutateWithdrawAcc,
    mutateWithdrawMethod,
  };
}
