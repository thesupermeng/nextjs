import { useRouter } from 'next/navigation';
import { isWeb } from '@/util/common';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import {
  setErrorModalProps,
  setProfileModal,
  setShowErrorModal,
  setWithdrawTab,
  showTopUpRedirect,
} from '@/store/common';
import { WithdrawTab } from '../..';
import { getTopUpOrder } from '@/services/user';
import { Button } from '@/componentsH5/button';
import { useState } from 'react';
import TopUpAttention from './TopupAttention';
import useUser from '@/hook/user/useUser';
import { ProfileModalType } from '@/components/profileModal';

export default function AbsoluteModal(props) {
  const { amount, profileMenuSelected, isDisabled } = props;
  const [showTopupAttention, setTopupAttention] = useState(false);
  const { selectedMethodId } = useSelector((s) => s.withdraw);
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLogin } = useUser();

  const processTop = async () => {
    dispatch(showTopUpRedirect(true));
    getTopUpOrder({
      amount: parseFloat(amount),
      method_id: selectedMethodId?.id,
    }).then((data) => {
      if (data.code === 0) {
        const redirectUrl = data.data.topup_data;
        router.push(`${redirectUrl}`);
        dispatch(showTopUpRedirect(false));
      } else {
        dispatch(showTopUpRedirect(false));
        dispatch(setErrorModalProps({ title: t('error'), message: data?.msg }));
        dispatch(setShowErrorModal(true));
      }
    });
  };
  const onTopUpClick = () => {
    if (!isLogin) {
      if (isWeb()) {
        dispatch(setProfileModal(ProfileModalType.LoginModal));
      } else {
        router.push('/user/login');
      }
    } else {
      if (profileMenuSelected === 1) {
        setTopupAttention(true);
      } else if (profileMenuSelected === 2) {
        if (isWeb()) {
          dispatch(setWithdrawTab(WithdrawTab.WITHDRAW_SUMMARY));
        } else {
          router.push('/user/withdraw/summary');
        }
      }
    }
  };

  return (
    <>
      <Button
        onClick={onTopUpClick}
        disabled={isDisabled}
        id='deposit-now-button'
      >
        {profileMenuSelected === 1 ? t('deposit') : t('continue_')}
      </Button>
      {showTopupAttention && (
        <TopUpAttention
          onConfirm={() => {
            setTopupAttention(false);
            processTop();
          }}
        />
      )}
    </>
  );
}
