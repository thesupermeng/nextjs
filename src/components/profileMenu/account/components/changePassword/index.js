import useUser from '@/hook/user/useUser';
import {
  ActionType,
  checkPassword,
  getSMSOtp,
  setPassword,
} from '@/services/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import SuccessModal from './components/successModal';
import { ResetPassword } from '@/componentsH5/resetPassword/ResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { setOtpProp } from '@/store/user';
import { hideRightBarContent } from '@/store/common';

const ChangePasswword = () => {
  const { t } = useTranslation();
  const [chgPassOtpOpen, setChgPassOtpOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const otp = useSelector((s) => s.user.otp);
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    if (otp && newPassword) {
      dispatch(setOtpProp({}));
      const params = {
        password: newPassword,
        otp,
      };
      setPassword(params).then((data) => {
        if (data.code === 0) {
          setSuccessModal(true);

          setTimeout(() => {
            dispatch(hideRightBarContent('All'));
          }, 3000);
        } else {
          setErrorMsg(data.msg);
        }
      });
    }
  }, [otp, newPassword]);
  const onChgPassClick = (password) => {
    setErrorMsg('');
    checkPassword(password).then((res) => {
      if (res.code === 0) {
        getSMSOtp(
          user?.country_code,
          user?.mobile,
          ActionType.setPassword
        ).then((d) => {
          console.log('$$smsotp', d);
          if (res.code === 0) {
            setChgPassOtpOpen(true);
            setNewPassword(password);
            dispatch(
              setOtpProp({
                countryCode: user?.country_code,
                phoneNum: user?.mobile,
                actionType: ActionType.setPassword,
              })
            );
          } else {
            setErrorMsg(res.msg);
            setNewPassword('');
          }
        });
      } else {
        setErrorMsg(res.msg);
      }
    });
  };

  return (
    <div className='flex flex-col flex-1'>
      <div className='overflow-y-auto flex-initial flex flex-col p-8 gap-2'>
        <div className='font-bold text-[35px] mt-1'>
          {t('createNewPassword')}
        </div>
        <div className='text-[15px] font-normal text-white'>
          {t('pleaseEnsureThatYourNewPasswordIsDistinct')}
        </div>
        <ResetPassword
          submitText={t('changePassword')}
          onSubmit={onChgPassClick}
          errorMsg={errorMsg}
        />
      </div>

      <div className='mt-5'></div>

      {successModal && (
        <SuccessModal
          message={t('newPasswordChanged')}
          setModalOpen={setSuccessModal}
          modal={successModal}
        />
      )}
    </div>
  );
};

export default ChangePasswword;
