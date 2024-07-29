'use client';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import FullScreenModal from '../FullScreenModal';
import { SetUserName } from '@/app/user/finish_setup/SetUserName';
import { ModalCloseBtn } from './ModalCloseBtn';
import { useRouter } from 'next/navigation';
import { StepBar } from '@/app/user/finish_setup/StepBar';
import { ResetPassword } from '@/componentsH5/resetPassword/ResetPassword';
import { ReferralCode } from '@/componentsH5/loginLayout/ReferralCode';
import { finishSetup } from '@/services/user';
import { isWeb } from '@/util/common';
import { useDispatch } from 'react-redux';
import { setProfileModal } from '@/store/common';
import { RedTickRound } from '@/asset/gif';
import { H5Only } from '../Fragments/EnvComponent';
import { LocalStorageKeys } from '@/config/common';
import useUser from '@/hook/user/useUser';

export const FinishSetupModal = () => {
  const { mutateUser } = useUser();
  const [curStep, setCurStep] = useState(1);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isAllDone, setIsAllDone] = useState(false);
  const [isReferralErr, setIsReferralErr] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onUsername = (name) => {
    setUserName(name);
    setCurStep(2);
  };
  const onFinish = (ref) => {
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
          if (isWeb()) {
            dispatch(setProfileModal(null));
            mutateUser();
          } else {
            router.back();
          }
        }, 2000);
      } else {
        //todo setup err finishsetup
        setIsReferralErr(true);
      }
    });
  };
  const onPassword = (pwd) => {
    setPassword(pwd);
    // setCurStep(3);
    onFinish(pwd, '');
  };

  return (
    <>
      <FullScreenModal>
        <div className='relative flex flex-col items-stretch justify-center p-7 bg-[#121212] rounded-3xl overflow-visible w-[500px]'>
          <H5Only>
            <ModalCloseBtn />
          </H5Only>
          {isAllDone ? (
            <div className='flex-1 flex flex-col items-center justify-center gap-5'>
              <Image
                alt='tick'
                src={RedTickRound}
                className='w-[60px] h-[60px]'
              />
              <div className='text-base font-semibold'>
                {t('thanksForSigningUp')}
              </div>
            </div>
          ) : (
            <>
              <div className='p-8 '>
                <StepBar current={curStep} total={2} />
                {curStep === 1 && (
                  <SetUserName
                    onUsername={(name) => {
                      onUsername(name);
                    }}
                  />
                )}
                {curStep === 2 && (
                  <div className='rounded-3xl flex-initial flex flex-col p-8 gap-2 bg-[#121212]'>
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
        </div>
      </FullScreenModal>
    </>
  );
};
