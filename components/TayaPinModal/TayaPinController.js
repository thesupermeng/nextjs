import { useState, useEffect } from 'react';
import {
  ActionType,
  getSMSOtp,
  setSecondaryPwd as setSecondaryPwdTaya,
} from '@/services/user';
import { setOtpProp, setSecondaryPwd } from '@/store/user';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useUser from '@/hook/user/useUser';
import { WithdrawModalType } from '../profileMenu';
import { hideRightBarContent, setWithdrawModal } from '@/store/common';

const useTayaPinModalController = () => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [label, setLabel] = useState('');
  const [desc, setDesc] = useState('');
  const [val, setVal] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    if (isConfirm) {
      setLabel(t('confirmPin'));
      setDesc(t('enterYourPinAgain'));
    } else {
      setLabel(t('setUpPin'));
      setDesc(t('enterYourPin'));
    }
  }, [isConfirm]);

  const onRequestOtp = () => {
    getSMSOtp(
      user?.country_code,
      user?.mobile,
      ActionType.setSecondaryPassword
    ).then((d) => {
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
        setErrorMsg(d.msg);
      }
    });
  };

  const valOnChange = (val) => {
    setIsInvalid(false);
    setVal(val);

    if (!isConfirm) {
      setPin(val);
      if (val.length === 6) {
        setConfirm(true);
        setVal('');
      }
    } else {
      setConfirmPin(val);
      if (val.length === 6) {
        if (pin === val) {
          dispatch(setSecondaryPwd(pin));
          onRequestOtp();
        } else {
          setIsInvalid(true);
        }
      }
    }
  };

  const otp = useSelector((s) => s.user.otp);
  useEffect(() => {
    if (otp) {
      setUpPin(otp);
    }
  }, [otp]);

  const setUpPin = (otp) => {
    setSecondaryPwdTaya({ otp: otp, secondary_password: pin }).then((d) => {
      if (d.code === 0) {
        dispatch(setOtpProp({}));
        dispatch(setWithdrawModal(WithdrawModalType.SuccessfullySetUpPinModal));
        dispatch(hideRightBarContent('All'));
      } else {
        dispatch(
          setOtpProp({
            errorMsg: d?.msg,
            phoneNum: user?.mobile,
            countryCode: user?.country_code,
            actionType: ActionType.setSecondaryPassword,
          })
        );
      }
    });
  };

  return {
    label,
    desc,
    pin,
    val,
    confirmPin,
    isInvalid,
    errorMsg,
    isConfirm,
    valOnChange,
  };
};

export default useTayaPinModalController;
