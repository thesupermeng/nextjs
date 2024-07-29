import { CrossWhite } from '@/asset/icons';
import FullScreenModal from '@/components/FullScreenModal';
import { ActionType, getSMSOtp } from '@/services/user';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ProfileMenuConstantType } from '..';
import PhoneInput from '../phoneInput';

const ForgotPasswordModal = ({
  setModalNum,
  emitPhoneNum,
  emitSelectedCountry,
}) => {
  const [ismobileValidated, setMobileValidated] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const { t } = useTranslation();

  const receivePhoneNum = (value) => {
    setPhoneNum(value);
  };

  const receiveCountryCode = (value) => {
    setSelectedCountry(value);
  };

  const onContClick = () => {
    if (ismobileValidated) {
      getSMSOtp(selectedCountry.code, phoneNum, ActionType.setPassword).then(
        (d) => {
          console.log('$$smsotp', d);
          emitSelectedCountry(selectedCountry);
          emitPhoneNum(phoneNum);
          setModalNum(ProfileMenuConstantType.ForgotPassOtpModal);
        }
      );
    }
  };

  const onClose = () => {
    setModalNum(ProfileMenuConstantType.CloseAll);
  };

  return (
    <FullScreenModal>
      <div className='w-[480px] p-7 bg-[#121212] rounded-3xl'>
        <div className='flex justify-between'>
          <div></div>
          <div className='ml-9'>
            <div className='text-xl  font-bold'>{t('forgotPassword')}</div>
            <div className='text-base text-center  font-medium'>
              {t('resetPassword')}
            </div>
          </div>
          <div>
            <button onClick={onClose}>
              <Image
                className='w-9 h-9 opacity-20 hover:opacity-100'
                src={CrossWhite}
                alt='close'
              />
            </button>
          </div>
        </div>
        <div className=' mt-3 mb-2'>
          {t('pleaseEnterMobileNumberWhere')}
          {t('eastrich')}
          {t('canSendYouAVerificationCode')}
        </div>
        <PhoneInput
          isValidPhone={setMobileValidated}
          emitPhoneNum={receivePhoneNum}
          emitSelectedCountry={receiveCountryCode}
        />
        {ismobileValidated ? (
          <button
            className='mt-3 rounded-md h-11 w-full tayagradient'
            onClick={onContClick}
          >
            {t('continue_')}
          </button>
        ) : (
          <button
            className='mt-3 rounded-md h-11 w-full tayagradient opacity-50'
            disabled
          >
            {t('continue_')}
          </button>
        )}
      </div>
    </FullScreenModal>
  );
};

export default ForgotPasswordModal;
