'use client';
import { RedTickRound } from '@/asset/gif';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { ReferralCode } from '@/componentsH5/loginLayout/ReferralCode';
import { ResetPassword } from '@/componentsH5/resetPassword/ResetPassword';
import { finishSetup } from '@/services/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { SetUserName } from './SetUserName';
import { StepBar } from './StepBar';
import { LocalStorageKeys } from '@/config/common';
import { useDispatch } from 'react-redux';
import { setShowToast } from '@/store/common';

export default function Page() {
  const [curStep, setCurStep] = useState(1);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isAllDone, setIsAllDone] = useState(false);
  const [isReferralErr, setIsReferralErr] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onUsername = (name) => {
    setUserName(name);
    setCurStep(2);
  };

  const onFinish = useCallback(
    (password, ref) => {
      const params = {
        username: username,
        password: password,
        currency_id: sessionStorage.getItem(LocalStorageKeys.SiteCurrency),
        code: ref,
      };

      finishSetup(params).then((data) => {
        if (data.code === 0) {
          setIsAllDone(true);
          setTimeout(() => {
            router.push('/');
          }, 1000);
        } else {
          //todo setup err finishsetup
          setIsReferralErr(true);
          dispatch(setShowToast(data?.msg));
        }
      });
    },
    [username]
  );

  const onPassword = (pwd) => {
    console.log('pwd', pwd);
    setPassword(pwd);
    // setCurStep(3);
    onFinish(pwd, '');
  };

  return (
    <FullPageContent>
      {isAllDone ? (
        <div className='flex-1 flex flex-col items-center justify-center gap-5'>
          <Image alt='tick' src={RedTickRound} className='w-[60px] h-[60px]' />
          <div className='text-base font-semibold'>
            {t('thanksForSigningUp')}
          </div>
        </div>
      ) : (
        <>
          <NavHeader showBack={false} label={t('personalInfo')} />
          <div className='p-8'>
            <StepBar current={curStep} total={2} />
            {curStep === 1 && (
              <SetUserName
                onUsername={(name) => {
                  onUsername(name);
                }}
              />
            )}

            {curStep === 2 && (
              <div className='flex-1 flex flex-col rounded-3xl mt-10 gap-2'>
                <div className='font-bold text-[35px] mt-1'>
                  {t('createPassword')}
                </div>

                <ResetPassword onSubmit={onPassword} />
              </div>
            )}

            {curStep === 3 && (
              <ReferralCode
                isError={isReferralErr}
                onSubmit={onFinish}
                setIsReferralErr={setIsReferralErr}
              />
            )}
          </div>
        </>
      )}
    </FullPageContent>
  );
}
