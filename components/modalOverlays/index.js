'use client'

import 'react-spring-bottom-sheet/dist/style.css'
import YingshiLoginBottomSheet from '@/componentsH5/yingshiLoginBottomSheet';
import { useLoginOpen } from '@/hook/yingshiScreenState/useLoginOpen';
import LoginSuccess from '@/components/login/loginSuccess';
import PinSuccess from '@/components/login/pinSuccess';
import WithdrawalSuccess from '@/components/login/withdrawalSuccess';

import { useLoginSuccessOpen } from '@/hook/yingshiScreenState/useLoginSuccessOpen';
import { usePinSuccessOpen } from '@/hook/yingshiScreenState/usePinSuccessOpen';
import { useWithdrawalSuccessOpen } from '@/hook/yingshiScreenState/useWithdrawalSuccessOpen';

import { useEffect, useLayoutEffect, useState } from 'react';
import LoginFlow from '@/components/login/loginFlow';
import PaymentModal from '@/components/payment/paymentModal';
import { usePaymentOpen } from '@/hook/yingshiScreenState/usePaymentOpen';
import PaymentPendingModal from '@/components/payment/paymentPendingModal';
import { usePaymentPendingOpen } from '@/hook/yingshiScreenState/usePaymentPendingOpen';

import { useSessionExpiredOpen } from '@/hook/yingshiScreenState/useSessionExpiredOpen';
import SessionExpired from '@/components/login/sessionExpired';

import {logout} from '@/services/yingshiUser';
import { useDispatch } from 'react-redux';
import { setAhaToken, setYingshiUserInfo, setYingshiUserToken } from '@/store/yingshiUser';

export default function ModalOverlays() {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const [isOpenLogin, setIsOpenLogin] = useLoginOpen();
  const [isLoginSuccess, setIsLoginSuccess] = useLoginSuccessOpen()
  const [isPinSuccess, setIsPinSuccess] = usePinSuccessOpen()
  const [isWithdrawalSuccess, setIsWithdrawalSuccess] = useWithdrawalSuccessOpen()
  const [isOpenPayment, setIsOpenPayment] = usePaymentOpen();
  const [isShowPaymentPending, setShowPaymentPending] = usePaymentPendingOpen()
  const [isSessionExpired, setIsSessionExpired] = useSessionExpiredOpen()

  useEffect(() => {
   

    if(isSessionExpired == true)
      {
        logout()
        dispatch(setYingshiUserInfo(null))
        dispatch(setYingshiUserToken(null))
        dispatch(setAhaToken(null))
      }
    
  }, [isSessionExpired])

  

  return (
    <>
      {isMobile &&
        <YingshiLoginBottomSheet
          visible={isOpenLogin}
          onDismiss={() => setIsOpenLogin(false)}
        />
      }
      {!isMobile &&
        <LoginFlow />
      }
      {!isMobile &&
        <>
          <PaymentModal
            open={isOpenPayment}
            handler={() => setIsOpenPayment(false)}
          />
          <PaymentPendingModal
            open={isShowPaymentPending}
            handler={() => setShowPaymentPending(false)}
          />
        </>
      }
      <LoginSuccess
        open={isLoginSuccess}
        handler={() => setIsLoginSuccess(false)}
        msg={'登录成功'}
      />
      <PinSuccess
        open={isPinSuccess}
        handler={() => setIsPinSuccess(false)}
        msg={'安全PIN码设置成功'}
      />
      <WithdrawalSuccess
        open={isWithdrawalSuccess}
        handler={() => setIsWithdrawalSuccess(false)}
        msg={'提款申请已提交'}
      />
       <SessionExpired
        open={isSessionExpired}
        handler={() => setIsSessionExpired(false)}
        msg={'会话已过期'}
      />
    </>
  )

}
