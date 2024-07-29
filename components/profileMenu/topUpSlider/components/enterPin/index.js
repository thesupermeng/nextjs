import { CrossWhite } from '@/asset/icons';
import FullScreenModal from '@/components/FullScreenModal';
import { WithdrawModalType } from '@/components/profileMenu';
import { setWithdrawModal } from '@/store/common';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOtpProp, setSecondaryPwd } from '@/store/user';
import {
  ActionType,
  getSMSOtp,
  sendWithdrawOrder,
  setSecondaryPwd as setSecondaryPwdApi,
} from '@/services/user';
import useUser from '@/hook/user/useUser';
import { PinInput } from './pinInput';

export const PinModal = ({ title, message, isForgotPwd }) => {
  const [val, setVal] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const dispatch = useDispatch();
  const { user } = useUser();
  const { withdrawModal } = useSelector((s) => s.common);
  const { secondaryPwd } = useSelector((s) => s.user);
  const { selectedAcc, withdrawAmt } = useSelector((s) => s.withdraw);
  const [errorMsg, setErrorMsg] = useState('');
  const { mutateUser } = useUser();

  const onRequestOtp = useCallback(() => {
    getSMSOtp(
      user?.country_code,
      user?.mobile,
      ActionType.setSecondaryPassword
    ).then((d) => {
      console.log('$$smsotp', d);
      if (d.code === 0) {
        dispatch(
          setOtpProp({
            countryCode: user?.country_code,
            phoneNum: user?.mobile,
            actionType: ActionType.setSecondaryPassword,
          })
        );
      } else {
        setIsInvalid(true);
        setErrorMsg(d?.msg);
      }
    });
  }, [user]);

  const sendOrder = (val) => {
    sendWithdrawOrder({
      amount: withdrawAmt,
      account_binding_id: selectedAcc?.id,
      secondary_password: val,
    }).then((data) => {
      if (data.code === 0) {
        dispatch(setWithdrawModal(WithdrawModalType.WITHDRAW_SUCCESS));
      } else {
        setErrorMsg(data?.msg);
        setIsInvalid(true);
      }
    });
  };

  const valOnChange = (val) => {
    setVal(val);
    setIsInvalid(false);
    if (val.length == 6) {
      if (withdrawModal === WithdrawModalType.EnterPinModal) {
        sendOrder(val);
      }

      if (withdrawModal === WithdrawModalType.ConfirmPinModal) {
        if (secondaryPwd === val) {
          onRequestOtp();
        } else {
          setIsInvalid(true);
        }
      } else if (withdrawModal === WithdrawModalType.SetUpPinModal) {
        dispatch(setSecondaryPwd(val));
        dispatch(setWithdrawModal(WithdrawModalType.ConfirmPinModal));
      }
    }
  };

  const closeModal = () => {
    dispatch(setWithdrawModal(WithdrawModalType.CloseAll));
  };

  const otp = useSelector((s) => s.user.otp);
  useEffect(() => {
    if (otp) {
      console.log('otp', otp);
      setUpPin(otp);
    }
  }, [otp]);

  const setUpPin = (otp) => {
    setSecondaryPwdApi({ otp: otp, secondary_password: secondaryPwd }).then(
      (d) => {
        if (d.code === 0) {
          mutateUser();
          dispatch(setOtpProp({}));
          dispatch(
            setWithdrawModal(WithdrawModalType.SuccessfullySetUpPinModal)
          );
        } else {
          //TODO: failed error
        }
      }
    );
  };

  return (
    <FullScreenModal>
      <div className='w-[500px] flex-initial flex flex-col rounded-3xl bg-[#121212] p-7 text-center relative'>
        <Image
          alt='close'
          src={CrossWhite}
          className='absolute w-9 h-9 opacity-20 hover:opacity-100 self-end cursor-pointer'
          onClick={closeModal}
        />
        <p className='tracking-tight text-xl font-bold mb-10'>{title}</p>
        <p className='mb-5 px-10 text-lg'>{message}</p>
        <PinInput
          title={title}
          message={message}
          val={val}
          valOnChange={valOnChange}
          isInvalid={isInvalid}
          errorMsg={errorMsg}
          containerStyle={'justify-center mt-2'}
          inputStyle={'!w-12 h-12'}
        />
      </div>
    </FullScreenModal>
  );
};
