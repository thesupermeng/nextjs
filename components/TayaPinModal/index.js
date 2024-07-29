import React from 'react';
import useTayaPinModalController from './TayaPinController';
import { PinInput } from '../profileMenu/topUpSlider/components/enterPin/pinInput';

const TayaPinModal = () => {
  const { isInvalid, errorMsg, val, label, desc, valOnChange } =
    useTayaPinModalController();

  return (
    <div className='flex flex-col gap-2 p-4'>
      <p className='text-[22px] font-bold'>{label}</p>
      <p className='text-[15px]'>{desc}</p>
      <PinInput
        title={label}
        message={desc}
        val={val}
        valOnChange={valOnChange}
        errorMsg={errorMsg}
        isInvalid={isInvalid}
        containerStyle={'m-0'}
        inputStyle='!w-[60px] h-[60px]'
      />
    </div>
  );
};

export default TayaPinModal;
