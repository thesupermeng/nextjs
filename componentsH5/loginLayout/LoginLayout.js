'use client';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import Image from 'next/image';
import { LoginFooter } from './LoginFooter';
import { LoginContent } from './LoginContent';
import { SignupContent } from './SignUpContent';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import useGetConfig from '@/hook/user/useGetConfig';
import { EastRichLogoWithText } from '@/asset/icons';
import { UserGuideRegisterNow } from '@/components/userGuide/registerNow';
import { UserGuideStages } from '@/store/userGuide';
import { useSelector } from 'react-redux';

export const LoginLayout = ({ type, children, onNext }) => {
  const [termChecked, setTermChecked] = useState(false);
  const { config } = useGetConfig();
  const { t } = useTranslation();
  const userGuideStage = useSelector((s) => s.userGuide.currentStep);
  const minAmount =
    config?.static_promotion?.static_promotion_one_time_bonus_min_amount / 100;
  const reward =
    config?.static_promotion?.static_promotion_one_time_bonus_reward_amount /
    100;

  useEffect(() => {
    if (config?.toggle?.['t&c'] === 'false') {
      setTermChecked(true);
    }
  }, [config]);

  return (
    <div className='flex flex-1 flex-col'>
      <div className='relative flex-initial aspect-[393/259] bg-tayaRed'>
        <div className='flex flex-col inset-0 text-center bg-transparent'>
          <NavHeader className={'!bg-transparent'} />
          <Image
            alt='EastRich'
            src={EastRichLogoWithText}
            className='w-[224.8px] mx-auto mt-3'
          />
          <div className='inline-block text-[15px] font-normal mt-3.5'>
            {t('playWatchWin')}
          </div>
        </div>

        {userGuideStage === UserGuideStages.Register && (
          <UserGuideRegisterNow reward={reward} minAmount={minAmount} />
        )}
      </div>
      <div className='flex-1 z-10 -mt-6 rounded-t-3xl bg-[#090909]'>
        <div className='text-xl font-bold text-center mt-[19px]'>
          {t('welcomeTo')} {t('eastrich')}
        </div>
        <div className='text-base text-center font-medium'>
          {type === 'login' ? t('loginWithPassword') : t('loginRegister')}
        </div>
        <div className='px-[30px]'>
          {type === 'signup' && (
            <SignupContent onNext={onNext} termChecked={termChecked}>
              {children}
            </SignupContent>
          )}
          {type === 'login' && (
            <LoginContent onNext={onNext} termChecked={termChecked}>
              {children}
            </LoginContent>
          )}
        </div>
      </div>
      <LoginFooter type={type} onTermsCheck={setTermChecked} />
    </div>
  );
};
