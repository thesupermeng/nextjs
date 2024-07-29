'use client';
import { WithdrawOption } from '@/components/profileMenu/topUpSlider/components/withdrawOption';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function Page() {
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();

  return (
    <FullPageContent>
      <div className='flex flex-col flex-1'>
        <NavHeader
          label={t('withdrawalOption')}
          right={
            <p
              className='opacity-50 text-s px-3'
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? t('done') : t('edit')}
            </p>
          }
        />
        <WithdrawOption editMode={editMode} />
      </div>
    </FullPageContent>
  );
}
