import React, { useEffect } from 'react';
import CustomTopUpAmt from '../customTopUpAmt';
import Keyboard from '@/componentsH5/keyboard';
import { setKeyboardProps, showKeyboard } from '@/store/common';
import { useDispatch, useSelector } from 'react-redux';

export const CustomTopUpSlider = ({
  selectedAmt,
  setSelected,
  setShowCustom,
  showCustom,
}) => {
  const quickBet = useSelector((s) => s.common.quickBet);
  const dispatch = useDispatch();
  const keyboardConfig = {
    amount: selectedAmt,
    setAmount: (e) => setSelected(e),
  };

  useEffect(() => {
    if (showCustom) triggerKeyboard();
  }, []);

  useEffect(() => {
    if (showCustom) triggerKeyboard();
    return () => {
      if (!quickBet) dispatch(showKeyboard(false));
    };
  }, [selectedAmt, showCustom]);

  const triggerKeyboard = () => {
    dispatch(showKeyboard(true));
    dispatch(setKeyboardProps(keyboardConfig));
  };

  return (
    <div className='flex flex-1 flex-col'>
      <CustomTopUpAmt selectedAmt={selectedAmt} onClick={triggerKeyboard} />
      <Keyboard onClickCustom={setShowCustom} />
    </div>
  );
};
