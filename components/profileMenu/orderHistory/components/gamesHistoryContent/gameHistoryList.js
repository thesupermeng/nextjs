import { LoadingPage } from '@/components/loading';
import { formatDate } from '@/components/matchHistory/utils';
import { formatCredit } from '@/util/numbers';
import React from 'react';
import { useTranslation } from 'next-i18next';

export const GameHistoryList = ({ list, loading }) => {
  const { t } = useTranslation();
  if (loading) return <LoadingPage />;
  return (
    <div className={`gap-5 flex flex-col mt-5 flex-[1_0_0] overflow-y-auto`}>
      {list?.map((l, index) => {
        return (
          <div key={index} className='bg-tayaGrey rounded-xl p-5'>
            <div className='flex gap-3'>
              <p className='text-[#AEAEAE] text-xs'>#{l?.order_id}</p>
              <p className='text-[#AEAEAE] text-xs'>
                {formatDate(l?.ts * 1000)}
              </p>
            </div>
            <p className='text-[14px] font-bold'>{l?.game?.game_name}</p>
            <div className='h-[0.80px] border-t border-[#FFFFFF0F] my-2'></div>

            <div className='flex justify-between'>
              <div className='flex gap-2 items-center'>
                <p className='text-[11px] font-semibold'>{t('amount')}</p>
                <p className='font-semibold text-[16px]'>
                  {formatCredit(l?.stake)}
                </p>
              </div>
              <div className='flex gap-2 items-center'>
                <p className='text-[11px] font-semibold'>{t('payout')}</p>
                <p className='font-semibold text-[16px]'>
                  {formatCredit(l?.won)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
