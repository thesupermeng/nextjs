import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveParlay, showKeyboard } from '@/store/common';
import remove from './remove.svg';

export default function Keyboard({
  onClickCustom = () => {},
  isQuickBet = false,
}) {
  const dispatch = useDispatch();
  const isShow = useSelector((s) => s.common.isShowKeyboard);
  const keyboardProps = useSelector((s) => s.common.keyboardProps);
  const { t } = useTranslation();
  const { amount, setAmount, isSingleBet } = keyboardProps;

  const onClick = () => {
    dispatchEvent(new Event('buttonClick'));
    if (!isSingleBet) {
      dispatch(setActiveParlay(undefined));
      dispatch(showKeyboard(false));
    }
  };

  const Key = ({ label, tw, value }) => {
    return (
      <button
        onClick={() => {
          //check type of input
          if (typeof value === 'string') {
            appendValue(value);
          } else if (typeof value === 'number') {
            addValue(value);
          } else {
            setAmount(amount ? parseFloat(amount) : '');

            if (isQuickBet) {
              onClickCustom();
              return;
            }
            onClickCustom() ? onClickCustom() : onClick();
          }
        }}
        className={`bg-[#191919] rounded-lg p-2 text-[13px] text-center items-center flex justify-center ${tw}`}
      >
        {label}
      </button>
    );
  };

  const RemoveButton = () => {
    return (
      <div
        className='flex items-center justify-center bg-[#191919] rounded-lg'
        onClick={removeLastDigit}
      >
        <Image src={remove} alt='remove' width={24} />
      </div>
    );
  };

  const addValue = (val) => {
    let temp = amount ? parseFloat(amount) : 0;
    temp += val;
    setAmount(temp);
  };

  const appendValue = (val) => {
    let temp = amount ? amount?.toString() : '';
    const regex = /^\d+\.\d{2}$/;

    //if key in invalid val return
    if (regex.test(temp) || (temp.includes('.') && val === '.')) {
      return;
    } else {
      temp += val;
    }

    if (
      amount?.toString().charAt(0) === '0' &&
      amount?.toString().length >= 1 &&
      !temp.includes('.')
    ) {
      temp = temp.replace(/^0/, '');
    }
    setAmount(temp);
  };

  const removeLastDigit = () => {
    const newVal = amount
      ?.toString()
      .substring(0, amount?.toString().length - 1);
    setAmount(newVal);
  };

  return (
    <div
      className={`transition-transform duration-300 ${
        isShow
          ? 'transform translate-y-0 flex flex-col bg-[#09090980]'
          : 'transform translate-y-full bottom-0 fixed w-full'
      }`}
    >
      <div className='flex-1' onClick={onClick}></div>
      {/* {inputItem} */}
      <div className='bg-[#000]'>
        <div className='grid grid-flow-row grid-cols-4 gap-3 p-3 '>
          <Key label={'+10'} tw={'text-tayaRed font-bold'} value={10} />
          <Key label={'+50'} tw={'text-tayaRed font-bold'} value={50} />
          <Key label={'+100'} tw={'text-tayaRed font-bold'} value={100} />
          <Key label={'+200'} tw={'text-tayaRed font-bold'} value={200} />
          <Key label={'1'} value={'1'} />
          <Key label={'2'} value={'2'} />
          <Key label={'3'} value={'3'} />
          <RemoveButton />
          <Key label={'4'} value={'4'} />
          <Key label={'5'} value={'5'} />
          <Key label={'6'} value={'6'} />

          {isQuickBet ? (
            <Key label={t('allIn')} tw={'row-span-3 bg-tayaRed'} />
          ) : (
            <Key label={t('ok')} tw={'row-span-3 bg-tayaRed'} />
          )}

          <Key label={'7'} value={'7'} />
          <Key label={'8'} value={'8'} />
          <Key label={'9'} value={'9'} />
          <Key label={'0'} tw={'col-span-2'} value={'0'} />
          <Key label={'.'} value={'.'} />
        </div>
      </div>
    </div>
  );
}
