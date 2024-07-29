'use client';
import { RedTickRound } from '@/asset/gif';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { OTP } from '@/componentsH5/OTP/page';
import { ResetPassword } from '@/componentsH5/resetPassword/ResetPassword';
import useUser from '@/hook/user/useUser';
import { ActionType, getSMSOtp, setPassword } from '@/services/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function ChangePassword() {
  const router = useRouter();
  const [showOtp, setShowOtp] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [otpError, setOtpError] = useState('');
  const { user } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    if (isChanged) {
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  }, [isChanged]);

  const onRequestOtp = useCallback(
    (pswd) => {
      setNewPassword(pswd);
      getSMSOtp(user?.country_code, user?.mobile, ActionType.setPassword).then(
        (d) => {
          console.log('$$smsotp', d);
          setShowOtp(true);
        }
      );
    },
    [user]
  );

  const continueOnClick = useCallback(
    (otp) => {
      const params = {
        password: newPassword,
        otp,
      };
      setPassword(params).then((data) => {
        if (data.code === 0) {
          setIsChanged(true);
        } else {
          setOtpError(data.msg);
        }
      });
    },
    [newPassword]
  );

  if (isChanged) {
    return (
      <FullPageContent>
        <div className='flex-1 flex flex-col items-center justify-center gap-5'>
          <Image alt='tick' src={RedTickRound} className='w-[60px] h-[60px]' />
          <div className='text-base font-semibold'>
            {t('newPasswordChanged')}
          </div>
        </div>
      </FullPageContent>
    );
  } else {
    return (
      <>
        <FullPageContent>
          <NavHeader label={t('resetPassword')} />
          <div className='overflow-y-auto  flex-1 flex flex-col p-8 gap-2 bg-[#121212]'>
            <div className='font-bold text-[35px] mt-1'>
              {t('createNewPassword')}
            </div>
            <div className='text-[15px] font-normal'>
              Please ensure that your new password is distinct from your
              previous one.
            </div>
            <ResetPassword
              submitText={t('requestOtp')}
              onSubmit={onRequestOtp}
            />
          </div>
        </FullPageContent>
        {/* todo h5 otp */}
        {showOtp && (
          <OTP
            countryCode={user?.country_code}
            phoneNum={user?.mobile}
            sendToTxt={`${user?.country_code} ${user?.mobile}`}
            onNext={(otp) => continueOnClick(otp)}
            otpError={otpError}
          />
        )}
      </>
    );
  }
}
