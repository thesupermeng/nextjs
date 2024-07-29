import React from 'react';
import { WithdrawModalType } from '../profileMenu';
import { PinModal } from '../profileMenu/topUpSlider/components/enterPin';
import ForgotPin from '../profileMenu/topUpSlider/components/forgotPin';
import VerifyOtp from '../profileMenu/topUpSlider/components/verifyOtp';
import FullScreenModal from '../FullScreenModal';
import SuccessModal from '../profileMenu/account/components/changePassword/components/successModal';
import {
  setWithdrawModal,
  setWithdrawTab,
  showRightBarContent,
} from '@/store/common';
import { WithdrawTab } from '../profileMenu/topUpSlider';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { RightSidebarContantTypes } from '../rightSideMenu';

export const WithdrawModal = () => {
  const { withdrawModal } = useSelector((s) => s.common);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      {withdrawModal === WithdrawModalType.SetUpPinModal && (
        <PinModal
          title={t('setUpPin')}
          message={t('enterYourPinToSecureAccountAndAuthorizeWithdrawals')}
        />
      )}
      {withdrawModal === WithdrawModalType.ConfirmPinModal && (
        <PinModal
          title={t('confirmPin')}
          message={t('pleaseReenterYourPinToConfirmAndProceed')}
        />
      )}

      {withdrawModal === WithdrawModalType.EnterPinModal && (
        <PinModal
          title={t('enterPin')}
          message={t('pleaseEnterYourPinToProceed')}
          isForgotPwd={true}
        />
      )}

      {withdrawModal === WithdrawModalType.ResetPinModal && (
        <PinModal title={t('resetPin')} message={t('enterYourNewPin')} />
      )}

      {withdrawModal === WithdrawModalType.ReenterPinModal && (
        <PinModal title={t('resetPin')} message={t('reEnterYourNewPin')} />
      )}

      {withdrawModal === WithdrawModalType.ForgotPinModal && <ForgotPin />}

      {withdrawModal === WithdrawModalType.OTPModal && (
        <VerifyOtp isSetPin={true} />
      )}
      {withdrawModal === WithdrawModalType.OTPModalResetPin && <VerifyOtp />}

      {withdrawModal === WithdrawModalType.SuccessfullySetUpPinModal && (
        <FullScreenModal>
          <SuccessModal
            className='bg-transparent'
            message={t('pinSetUpSuccessfully')}
            setModalOpen={() => {
              dispatch(setWithdrawModal(WithdrawModalType.CloseAll));
            }}
          />
        </FullScreenModal>
      )}

      {withdrawModal === WithdrawModalType.AddMethodSuccess && (
        <FullScreenModal>
          <SuccessModal
            className='bg-transparent'
            message={t('withdrawalMethodSuccessfullyAdded')}
            setModalOpen={() => {
              dispatch(setWithdrawTab(WithdrawTab.WITHDRAW_OPTION));
              setTimeout(() => {
                dispatch(setWithdrawModal(WithdrawModalType.CloseAll));
              }, 1000);
            }}
          />
        </FullScreenModal>
      )}

      {withdrawModal === WithdrawModalType.WITHDRAW_SUCCESS && (
        <FullScreenModal>
          <SuccessModal
            className='bg-transparent'
            message={t('withdrawSent')}
            additionalMsg={t(
              'yourWithdrawHasBeenSentAndIsAwaitingConfirmation'
            )}
            setModalOpen={() => {
              dispatch(setWithdrawTab(WithdrawTab.TOP_UP))
              dispatch(
                showRightBarContent(RightSidebarContantTypes.Transactions)
              );
              setTimeout(() => {
                dispatch(setWithdrawModal(WithdrawModalType.CloseAll));
              }, 1000);
            }}
          />
        </FullScreenModal>
      )}
    </>
  );
};
