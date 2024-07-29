'use client';

import H5TopUpSlider from '@/components/profileMenu/topUpSlider/h5TopUpSlider';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import Keyboard from '@/componentsH5/keyboard';
import { setKeyboardProps, showKeyboard } from '@/store/common';
import { selectProfileMenu } from '@/store/profile';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {
  const { withdrawAmt } = useSelector((s) => s.withdraw);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(withdrawAmt);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(selectProfileMenu(2));
  }, []);

  return (
    <FullPageContent>
      <div className='flex flex-col flex-1'>
        <NavHeader label={t('withdraw')} />
        <H5TopUpSlider amount={amount} setAmount={setAmount} />

        <Keyboard />
      </div>
    </FullPageContent>
  );
}
