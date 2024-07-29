import { updateStakes } from '@/store/betCart';
import {
  setActiveParlay,
  setKeyboardProps,
  showKeyboard,
} from '@/store/common';
import { isWeb } from '@/util/common';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function BetCartInput({ id, sos }) {
  const [stakeValues, setStakeValues] = useState(null);
  const dispatch = useDispatch();
  const { options } = useSelector((s) => s.betCart);
  const activeParlay = useSelector((s) => s.common.activeParlay);

  const handleStakeChange = (newValue) => {
    setStakeValues(newValue);
    dispatch(
      updateStakes({
        key: sos.sn,
        unitStake: newValue,
        sos: sos,
        total: sos.sodd * newValue,
      })
    );
  };

  useEffect(() => {
    setStakeValues('');
  }, [options]);

  useEffect(() => {
    // triggerKeyboardOn();
    dispatch(setKeyboardProps(keyboardConfig));
  }, [stakeValues]);

  const keyboardConfig = {
    id: 1,
    amount: stakeValues,
    setAmount: (e) => handleStakeChange(e),
  };

  const triggerKeyboardOn = (e) => {
    e && e.stopPropagation();
    dispatch(showKeyboard(true));
    dispatch(setKeyboardProps(keyboardConfig));
    dispatch(setActiveParlay(id));
  };

  return (
    <div className='flex flex-1 items-center py-[2px] pl-[10px] max-w-[100px] justify-end'>
      <input
        hidden={!!activeParlay && activeParlay !== id}
        onClick={!isWeb() ? triggerKeyboardOn : undefined}
        readOnly={isWeb() ? false : true}
        type='text'
        key='stakeInput'
        placeholder={`${sos?.mi} - ${sos?.mx}`}
        className='w-full text-sm py-[2px] px-[10px] border border-[#313131] rounded-lg bg-[#0E0F11] text-white text-end focus:outline-none focus:border-yellow-500 placeholder:text-xs'
        value={stakeValues || ''}
        onChange={(e) => {
          const inputValue = parseInt(e.target.value);
          if (!isNaN(inputValue)) {
            handleStakeChange(inputValue);
          } else {
            handleStakeChange('');
          }
        }}
      />
    </div>
  );
}
