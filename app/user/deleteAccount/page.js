'use client';
import { RedTickRound } from '@/asset/gif';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { OTP } from '@/componentsH5/OTP/page';
import useUser from '@/hook/user/useUser';
import { ActionType, deleteAccount, getSMSOtp } from '@/services/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { logout } from '@/services/user';

export default function DeleteAccount() {
  const router = useRouter();
  const [showOtp, setShowOtp] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [OTPs, setOTPs] = useState();
  const { user } = useUser();
  const { t } = useTranslation();

  const onRequestOtp = useCallback(() => {
    getSMSOtp(user?.country_code, user?.mobile, ActionType.deleteUser).then(
      (d) => {
        console.log('$$smsotp', d);
        setShowOtp(true);
      }
    );
  }, [user]);

  const continueOnClick = (otp) => {
    setOTPs(otp);
    setShowConfirmDelete(true);
  };

  const successfulDeletedAccount = async () => {
    //todo delete Account
    return deleteAccount(OTPs).then((data) => {
      if (data.code === 0) {
        setShowComplete(true);
        setTimeout(() => {
          router.back();
        }, 1500);
      }
    });
  };

  if (showConfirmDelete) {
    return (
      <>
        <FullPageContent>
          <NavHeader label={t('deleteAccount')} />
          <div className='rounded-3xl flex-initial flex flex-col p-8 gap-2 bg-[#121212]'>
            <div className='font-bold text-[35px] mt-1'>
              {t('confirmAccountDeletion')}
            </div>
            <div className='text-[15px] font-normal'>
              {t('uponConfirmingYourAccountDeletion')}
              {t('areYouSureYouWantToDeleteYourAccount')}
            </div>
            <button
              className='py-3 px-3.5 rounded-md mb-1 tayagradient mt-3'
              onClick={() => successfulDeletedAccount(OTPs)}
            >
              <p className='font-semibold text-[15px] text-[#FFFFFF]'>
                {t('yesDeleteMyAccount')}
              </p>
            </button>
            <button
              className='py-3 px-3.5 opacity-50 '
              // onClick={onCloseClick}
            >
              <p className='font-semibold text-[15px] text-[#FFFFFF]'>
                {t('cancel')}
              </p>
            </button>
          </div>
        </FullPageContent>

        {showComplete && (
          <FullPageContent>
            <div className='flex-1 flex flex-col items-center justify-center gap-2 z-10'>
              <div className='flex flex-col items-center justify-center'>
                <Image
                  src={RedTickRound}
                  alt='loading...'
                  width={55}
                  height={55}
                />
                <p className='font-semibold text-[15px] text-[#FFFFFF]'>
                  {t('accountDeleted')}
                </p>
              </div>
            </div>
          </FullPageContent>
        )}
      </>
    );
  } else {
    return (
      <>
        <FullPageContent>
          <NavHeader label={t('deleteAccount')} />
          <div className='flex-1 flex flex-col p-8 gap-2 bg-[#121212]'>
            <div className='font-bold text-[35px] mt-1'>
              {t('verifyYourIdentity')}
            </div>
            <div className='text-[15px] font-normal'>
              {t('toInitiateTheAccountDeletionProcess')} {user?.country_code}
              {user?.mobile} {t('forVerification')}
            </div>
            <button
              className='py-3 px-3.5 rounded-md mb-1 tayagradient mt-3'
              onClick={onRequestOtp}
            >
              <p className='font-semibold text-[15px] text-[#FFFFFF]'>
                {t('requestOtp')}
              </p>
            </button>
          </div>
        </FullPageContent>

        {/* todo h5 otp */}
        {showOtp && (
          <OTP
            countryCode={user?.country_code}
            phoneNum={user?.mobile}
            sendToTxt={`${user?.country_code} ${user?.mobile}`}
            onNext={(otp) => continueOnClick(otp)}
            // otpError={otpError}
          />
        )}
      </>
    );
  }
}
