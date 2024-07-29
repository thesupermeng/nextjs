import React from 'react';
import NavHeader from '../headerH5/NavHeader';
import OTPInput from 'react-otp-input';

export const WithdrawPinModal = ({
  label = '',
  title = '',
  desc = '',
  val = '',
  valOnChange = () => {},
  isInvalid = false,
}) => {
  return (
    <>
      <NavHeader label={label} />

      <div className='flex flex-col px-10 mt-20'>
        <p className='text-[35px] font-bold'>{title}</p>
        <p className='text-[15px]'>{desc}</p>
      </div>

      <OTPInput
        shouldAutoFocus
        inputType='number'
        inputStyle='inputStyle'
        value={val}
        onChange={valOnChange}
        numInputs={6}
        containerStyle='justify-center mt-2'
        renderInput={(props) => (
          <input
            {...props}
            type='text'
            className={`rounded-md !w-12 h-12 px-3 py-2 mx-1 ${
              val?.length === 6 && isInvalid
                ? 'bg-tayaRed/[.12]'
                : 'bg-tayaGrey'
            } text-tayaRed`}
          />
        )}
      />
    </>
  );
};
