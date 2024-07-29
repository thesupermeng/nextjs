import { useWindowListener } from '@/hook/useWindowListener';
import { useState } from 'react';
import FullScreenModal from '.';
import { useTranslation } from 'next-i18next';

export const SessionTimeOut = () => {
  const [isShow, setIsShow] = useState(false);
  const [preLogin, setPreLogin] = useState(false);
  const { t } = useTranslation();
  useWindowListener('sessionTimeOut', () => {
    if (!isShow && preLogin) {
      setIsShow(true);
    }
    setPreLogin(false);
  });
  return isShow ? (
    <FullScreenModal>
      <div className='flex-initial flex w-[460px] flex-col gap-6 items-center rounded-3xl bg-[#121212] shadow-[0_4px_22px_6px_#00000040] py-6 px-14 text-center'>
        <div className='font-bold text-xl'>{t('sessionTimeout')}</div>
        <pre className='font-medium text-base whitespace-pre-line'>
          {t('youAreLoggedOut')}
        </pre>
        <div
          onClick={() => setIsShow(false)}
          className='w-full py-3 items-center justify-center tayagradient rounded-[6px] tex-[15px] font-semibold'
        >
          {t('ok')}
        </div>
      </div>
    </FullScreenModal>
  ) : null;
};
