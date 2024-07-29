import { delWithdrawAcc } from '@/services/user';
import React from 'react';
import { useTranslation } from 'next-i18next';

export const DeleteModal = ({
  onDelete = () => {},
  onCancel = () => {},
  selected,
}) => {
  const { t } = useTranslation();
  const deleteAcc = () => {
    delWithdrawAcc({ account_binding_id: selected.id }).then((data) => {
      if (data.code === 0) {
        onDelete();
      }
    });
  };
  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[.7]'>
      <div className='rounded-3xl flex-initial flex-col bg-[#191A1E80] flex items-center justify-center shadow backdrop-blur-[33px] mx-10'>
        <div className='flex flex-col items-center justify-center text-sm'>
          <div className='px-7 py-4 text-center w-10/12 flex flex-wrap justify-center'>
            <p className='font-bold text-[17px] mb-3'>{t('confirmDeletion')}</p>
            <p>
              {t('areYouSureYouWantToDelete')} {selected.account_name}?
            </p>
            <p>{selected.account_number}</p>
          </div>
          <div className='w-full h-[0.80px] bg-[#545458A6] opacity-50'></div>
          <div
            className='text-[#F51414] flex items-center leading-snug my-5 cursor-pointer'
            onClick={deleteAcc}
          >
            {t('delete')}
          </div>
          <div className='w-full h-[0.80px] bg-[#545458A6] opacity-50'></div>
          <div className='my-5 leading-snug cursor-pointer' onClick={onCancel}>
            {t('cancel')}
          </div>
        </div>
      </div>
    </div>
  );
};
