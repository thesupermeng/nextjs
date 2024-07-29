import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import {
  useCurrentPromotion,
  usePostPromotion,
} from '@/hook/user/usePromotions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideRightBarContent, setShowToast } from '@/store/common';
import { isWeb } from '@/util/common';
import { BtnStyle, RedeemBtnStyle } from './Card';
import SuccessModal from '@/components/profileMenu/account/components/changePassword/components/successModal';
import { useTranslation } from 'next-i18next';
import { handleInAppWebview } from '@/util/inAppHandler';

export const RedeemButton = ({ type, text }) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [isRedeemSuccess, setIsRedeemSuccess] = useState(false);
  const dispatch = useDispatch();
  const { currentPromotion, mutateCurrentPromotion } = useCurrentPromotion();
  const { postPromotion } = usePostPromotion();
  const router = useRouter();
  const { t } = useTranslation();
  const goToSports = () => {
    router.push('/sports/Eastrich');
    if (isWeb()) {
      dispatch(hideRightBarContent(RightSidebarContantTypes.Promotion));
    }
  };

  const redeemPromo = () => {
    const promoId = currentPromotion?.id;

    setBtnDisabled(true);
    postPromotion(promoId).then((data) => {
      if (data.code === 0) {
        setBtnDisabled(false);
        setIsRedeemSuccess(true);
        setSuccessMsg(data.msg);
      } else {
        setIsRedeemSuccess(false);
        dispatch(setShowToast(data.msg));
        console.error(data);
      }
      mutateCurrentPromotion();
    });
  };

  const onClick = () => {
    if (type === RedeemBtnStyle.ACTION) {
      redeemPromo();
    } else if (type === RedeemBtnStyle.USENOW) {
      if (window.flutter_inappwebview?.callHandler) {
        handleInAppWebview('goToSport');
      } else goToSports();
    }
  };

  return (
    <>
      <button
        className={`rounded p-3 w-full disabled:opacity-50 ${BtnStyle[type].btnTw}`}
        disabled={
          btnDisabled ||
          (type !== RedeemBtnStyle.ACTION && type !== RedeemBtnStyle.USENOW)
        }
        onClick={onClick}
      >
        {text}
      </button>
      {isRedeemSuccess && (
        <SuccessModal
          message={t('claimSucessful')}
          additionalMsg={successMsg}
          setModalOpen={() => {
            setIsRedeemSuccess(false);
            if (isWeb())
              dispatch(hideRightBarContent(RightSidebarContantTypes.Promotion));
            else {
              router.back();
            }
          }}
        />
      )}
    </>
  );
};
