import { FullPageContent } from '@/componentsH5/FullPageContent';
import { Button } from '@/componentsH5/button';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { WithdrawConfirm } from '../withdrawConfirm';
import BetError from '@/components/betCart/BetError';
import { useDispatch, useSelector } from 'react-redux';
import { setWithdrawModal } from '@/store/common';
import { WithdrawModalType } from '@/components/profileMenu';
import useUser from '@/hook/user/useUser';
import { isWeb } from '@/util/common';
import { useRouter } from 'next/navigation';
import { RouterH5 } from '@/util/routes';
import { IconRoundWarningSign } from '@/asset/icons';
import { getCurrentFormattedDateTime } from '@/util/date';
import { Unit } from '@/config/User/setting';

export const WithdrawSummary = () => {
  const { selectedAcc, withdrawAmt } = useSelector((s) => s.withdraw);
  const { user } = useUser();

  const [showSuccessfulModal, setShowSuccessfulModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const tw = 'font-semibold text-[15px]';
  const contentTw = 'text-[#AEAEAE] font-medium text-sm';
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const date = new Date();
  const [year, month, day, hour, minutes] = [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
    date.getHours().toString().padStart(2, '0'),
    date.getMinutes().toString().padStart(2, '0'),
  ];

  // console.log({selectedAcc})
  const onConfirmClick = () => {
    if (isWeb()) {
      if (user?.has_set_secondary_pwd) {
        dispatch(setWithdrawModal(WithdrawModalType.EnterPinModal));
      } else {
        dispatch(setWithdrawModal(WithdrawModalType.SetUpPinModal));
      }
    } else {
      if (user?.has_set_secondary_pwd) {
        router.push(RouterH5.enterPin);
      } else {
        router.push(RouterH5.setUpPin);
      }
    }
  };

  return (
    <>
      <div className={`${isWeb() ? 'p-3' : 'px-5 py-3'} flex flex-col flex-1`}>
        <p className='text-sm'>{t('paymentDetails')}</p>
        <div className='bg-tayaGrey p-5 my-3 flex flex-col gap-3'>
          <span>
            <p className={`${tw}`}>{t('paymentMethod')}</p>
            <p className={`${contentTw}`}>Crypto - USDT</p>
          </span>
          <span>
            <p className={`${tw}`}>{t('paymentTime')} </p>
            <p className={`${contentTw}`}>{getCurrentFormattedDateTime()}</p>
          </span>
          <span>
            <p className={`${tw}`}>{t('walletAddress')}</p>
            <p className={`${contentTw}`}>{selectedAcc?.account_number}</p>
          </span>
          <span>
            <p className={`${tw}`}>{t('walletLabel')} </p>
            <p className={`${contentTw} truncate`}>
              {selectedAcc?.account_name}
            </p>
          </span>
          <span>
            <p className={`${tw}`}>{t('withdrawAmount')}</p>
            <p className={`${contentTw}`}>
              {withdrawAmt} {Unit}
            </p>
          </span>
        </div>

        <div className='my-2'>
          <div className='flex items-center'>
            <Image src={IconRoundWarningSign} alt='warning' />
            <p className='ml-2 text-[13px]'>
              {t('confirmYourWithdrawalAddress')}
            </p>
          </div>
          <div className=' text-white/50 text-[13px] leading-[18px]'>
            {t('withdrawConfirmMessage1')}
          </div>
          <div className=' text-white/50 text-[13px]'>
            {t('withdrawConfirmMessage2')}
          </div>
        </div>
      </div>

      <>
        <Button onClick={onConfirmClick}>{t('confirm')}</Button>
      </>

      {showSuccessfulModal && (
        <FullPageContent>
          <WithdrawConfirm />
        </FullPageContent>
      )}
      {showErrorModal && (
        <BetError
          message={errorMsg}
          title={t('withdrawFailed')}
          setShowErrorModal={setShowErrorModal}
        />
      )}
    </>
  );
};
