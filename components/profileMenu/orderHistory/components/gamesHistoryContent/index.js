import { CalendarComp } from '@/components/calender';
import { getOrderHistory } from '@/services/user';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { GameHistoryList } from './gameHistoryList';
import { formatDateToDashOnly, getDefaultDateRange } from '@/util/date';
import { NodataV2 } from '@/components/noDataV2';
import { formatCreditWholeNum } from '@/util/numbers';

export const GamesHistoryContent = ({ withFilter = true }) => {
  const [list, setList] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(
    getDefaultDateRange()
  );
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const call = () => {
    setLoading(true);
    getOrderHistory({
      page: 1,
      limit: 10000,
      start: formatDateToDashOnly(selectedDateRange[0]),
      end: formatDateToDashOnly(selectedDateRange[1]),
      type: 2,
      is_settled: true,
    }).then((data) => {
      setLoading(false);
      setList(data?.data);
    });
  };

  useEffect(() => {
    call();
  }, []);

  return (
    <>
      {withFilter && (
        <CalendarComp setSelectedDateRange={setSelectedDateRange} call={call} />
      )}
      {list?.list?.length > 0 ? (
        <GameHistoryList list={list?.list} loading={loading} />
      ) : (
        <NodataV2 />
      )}

      <div className='flex justify-evenly mt-auto'>
        <div className='flex flex-col items-center justify-center'>
          <p>{list?.total_count ? list?.total_count : '-'}</p>
          <p className='text-[#AEAEAE] text-[0.8125rem]'>{t('totalBets')}</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className=''>
            {list?.total_amount
              ? formatCreditWholeNum(list?.total_amount, true)
              : '-'}
          </p>
          <p className='text-[#AEAEAE] text-[0.8125rem]'>
            {t('total')} {t('amount')}
          </p>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <p className=''>
            {list?.total_win
              ? formatCreditWholeNum(list?.total_win, true)
              : '-'}
          </p>
          <p className='text-[#AEAEAE] text-[0.8125rem]'>
            {t('totalWinAndLost')}
          </p>
        </div>
      </div>
    </>
  );
};
