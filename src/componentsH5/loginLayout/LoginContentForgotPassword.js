import { ProfileModalType } from '@/components/profileModal';
import { setProfileModal } from '@/store/common';
import { isWeb } from '@/util/common';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

export const LoginContentForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onForgotPassClick = () => {
    isWeb()
      ? dispatch(setProfileModal(ProfileModalType.forgotPasswordModal))
      : router.replace('/user/forgotPassword');
  };
  return (
    <button
      onClick={onForgotPassClick}
      className='block ml-auto text-sm text-white mt-2 mr-2'
    >
      {t('forgotPassword')}?
    </button>
  );
};
