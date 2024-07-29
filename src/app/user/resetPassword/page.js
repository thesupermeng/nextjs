'use client';
import { RedTickRound } from '@/asset/gif';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { ResetPassword } from '@/componentsH5/resetPassword/ResetPassword';
import {
  checkPassword,
  finishSetup,
  logout,
  setPassword,
} from '@/services/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isChanged, setIsChanged] = useState(false);
  const { t } = useTranslation();

  const { otp } = useSelector((s) => s.user);

  useEffect(() => {
    if (isChanged) {
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [isChanged]);

  const continueOnClick = useCallback(
    (pass) => {
      const params = {
        password: pass,
        otp,
      };
      setPassword(params).then((data) => {
        if (data.code === 0) {
          setIsChanged(true);
        }
        //todo error case reset password
      });
    },
    [otp]
  );

  if (isChanged) {
    return (
      <FullPageContent>
        <div className='flex-1 flex flex-col items-center justify-center gap-5'>
          <Image alt='tick' src={RedTickRound} className='w-[60px] h-[60px]' />
          <div className='text-base font-semibold'>{t('passwordChanged')}</div>
        </div>
      </FullPageContent>
    );
  } else {
    return (
      <FullPageContent>
        <NavHeader label={t('resetPassword')} />
        <div className='rounded-3xl flex-initial flex flex-col p-8 gap-2 bg-[#121212]'>
          <div className='font-bold text-[35px] mt-1'>
            {t('createPassword')}
          </div>
          <div className='text-[15px] font-normal'>
            {t('enterYourPassword')}
          </div>
          <ResetPassword onSubmit={continueOnClick} />
        </div>
      </FullPageContent>
    );
  }
}
