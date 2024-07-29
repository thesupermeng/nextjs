import { CrossWhite } from '@/asset/icons';
import { hideRightBarContent } from '@/store/common';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';

export const RightMenuHeader = ({
  tabs,
  className = '',
  setSelected = () => {},
  selected,
  onClose = () => {},
}) => {
  const dispatch = useDispatch();

  const onCloseClick = () => {
    onClose?.();
    dispatch(hideRightBarContent('All'));
  };
  return (
    <div
      className={`flex justify-between bg-opacity-10 bg-black shadow-md pb-5 ${className}`}
    >
      <div className='flex gap-3'>
        {tabs?.map((tab, idx) => {
          return (
            <button onClick={() => setSelected(idx)} key={idx}>
              <div
                className={
                  selected === idx
                    ? 'mr-2 text-base text-white font-medium'
                    : 'mr-2 text-base text-white/[.5]'
                }
              >
                {tab.label}
              </div>
              {selected === idx ? (
                <div className='h-[0.1875rem] w-6 rounded-t-2xl bg-white ml-auto mr-auto mt-1'></div>
              ) : (
                <div className='h-[0.1875rem] mt-1'></div>
              )}
            </button>
          );
        })}
      </div>

      <button onClick={onCloseClick}>
        <Image
          className='w-9 h-9 opacity-20 hover:opacity-100'
          src={CrossWhite}
          alt='close'
        />
      </button>
    </div>
  );
};
