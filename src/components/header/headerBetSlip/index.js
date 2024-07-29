'use client';
import { IconCartEmpty, IconCartNumber } from '@/asset/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

const BetSlip = ({ onClick, withText = true }) => {
  const [count, setCount] = useState(0);
  const { options } = useSelector((s) => s.betCart);
  const { rightBarContent } = useSelector((s) => s.common);
  const isRightBetCartOpen = Boolean(rightBarContent.BetCart);
  const { t } = useTranslation();

  useEffect(() => {
    const newCount = Object.keys(options).length;
    if (count !== newCount) {
      setCount(newCount);
    }
  }, [options]);

  return (
    <div
      id='header-bet-slip'
      onClick={onClick}
      className={`flex flex-initial rounded-full place-content-center gap-2 py-3 px-4 ${
        !isRightBetCartOpen
          ? `cursor-pointer ${
            count === 0 ? 'hover:bg-white/5' : 'hover:bg-[#DE173E38]'
          }`
          : ''
      }`}
    >
      <div className='cart relative place-content-center flex flex-initial items-center'>
        <Image
          alt='bet slip'
          src={count === 0 ? IconCartEmpty : IconCartNumber}
        />
        {count ? (
          <div
            className={`bg-tayaRed text-white flex absolute w-5 h-5 -right-2 -top-2 text-[11px] rounded-full font-medium items-center justify-center`}
          >
            {count}
          </div>
        ) : null}
      </div>

      {withText && (
        <div className={`text-white text-base font-medium`}>{t('betSlip')}</div>
      )}
    </div>
  );
};
export default BetSlip;
