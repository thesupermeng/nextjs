import { setPassword } from '@/services/user';
import { setProfileModal, setShowToast } from '@/store/common';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import FullScreenModal from '../FullScreenModal';
import { ModalCloseBtn } from './ModalCloseBtn';
import SuccessModal from '../profileMenu/account/components/changePassword/components/successModal';
import { ResetPassword } from '@/componentsH5/resetPassword/ResetPassword';

export const ResetPasswordModal = () => {
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const otp = useSelector((s) => s.user.otp);
  const continueOnClick = useCallback(
    (pass) => {
      const params = {
        password: pass,
        otp,
      };
      setPassword(params).then((data) => {
        if (data.code === 0) {
          setIsChanged(true);
        } else {
          dispatch(setShowToast(data.msg));
        }
      });
    },
    [otp]
  );

  return (
    <FullScreenModal>
      <div className='relative flex flex-col items-stretch justify-center p-7 bg-[#121212] rounded-3xl overflow-visible'>
        <div className='text-[20px] font-bold text-white self-center'>
          {t('resetPassword')}
        </div>
        <div className='text-base font-medium text-white self-center'>
          {t('createPassword')}
        </div>
        <div className='h-7' />
        <ResetPassword onSubmit={continueOnClick} />
        <ModalCloseBtn />
      </div>

      {isChanged && (
        <SuccessModal
          message={t('passwordChanged')}
          setModalOpen={() => {
            setIsChanged(false);
            dispatch(setProfileModal(null));
          }}
        />
      )}
    </FullScreenModal>
  );
};
