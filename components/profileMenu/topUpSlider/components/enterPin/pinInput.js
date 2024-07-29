import React from 'react';
import { useTranslation } from 'next-i18next';
import OTPInput from 'react-otp-input';

export const PinInput = ({
  val,
  valOnChange,
  isInvalid,
  errorMsg,
  containerStyle,
  inputStyle = '',
}) => {
  const { t } = useTranslation();

  return (
    <>
      <OTPInput
        shouldAutoFocus
        inputType='number'
        value={val}
        onChange={valOnChange}
        numInputs={6}
        containerStyle={`${containerStyle}`}
        renderInput={(props) => (
          <input
            {...props}
            type='text'
            className={`rounded-md ${inputStyle} px-3 py-2 mx-1 ${
              val.length === 6 && isInvalid ? 'bg-tayaRed/[.12]' : 'bg-tayaGrey'
            } text-tayaRed`}
          />
        )}
      />
      {isInvalid && (
        <p className='text-tayaRed text-[13px] mt-3'>
          {errorMsg ? errorMsg : t('pinsDoNotMatch')}
        </p>
      )}
    </>
  );
};
