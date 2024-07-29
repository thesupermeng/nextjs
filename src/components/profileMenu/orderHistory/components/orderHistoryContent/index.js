import { formatDateToDashOnly, getDefaultDateRange } from '@/util/date';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import OrderHistoryType from '../orderHistoryType';
import OrderHistoryList from '../orderHistoryList';
import { getOrderHistory } from '@/services/user';
import { useSelector } from 'react-redux';
import { NodataV2 } from '@/components/noDataV2';
import { formatCreditWholeNum } from '@/util/numbers';

export const OrderHistoryContent = ({ withFilter = true }) => {
  const [isSettled, setIsSettled] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(
    getDefaultDateRange()
  );
  const [list, setList] = useState(null);
  const { orderHistorySingleSelected } = useSelector((a) => a.profile);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const call = () => {
    setLoading(true);
    getOrderHistory({
      page: 1,
      limit: 100,
      start: formatDateToDashOnly(selectedDateRange[0]),
      end: formatDateToDashOnly(selectedDateRange[1]),
      type: 1,
      is_settled: isSettled,
      is_parlay: orderHistorySingleSelected === 0 ? false : true,
    }).then((data) => {
      setLoading(false);
      setList(data?.data);
    });
  };

  useEffect(() => {
    call();
  }, [selectedDateRange, isSettled, orderHistorySingleSelected]);

  return (
    <>
      <OrderHistoryType
        isSettled={isSettled}
        setIsSettled={setIsSettled}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
        withFilter={withFilter}
      />
      {list?.list?.length > 0 ? (
        <OrderHistoryList
          list={list?.list}
          isSettled={isSettled}
          loading={loading}
        />
      ) : (
        <NodataV2 />
      )}
      <div className='flex justify-evenly mt-auto'>
        <div className='flex flex-col items-center justify-center'>
          <p>
            {list?.total_count ? formatCreditWholeNum(list?.total_count) : '-'}
          </p>
          <p className='text-[#AEAEAE] text-[0.8125rem]'>{t('totalBets')}</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p>
            {list?.total_amount
              ? formatCreditWholeNum(list?.total_amount, true)
              : '-'}
          </p>

          <p className='text-[#AEAEAE] text-[0.8125rem]'>
            {t('total')} {t('amount')}
          </p>
        </div>
        {isSettled && (
          <div className='flex flex-col items-center justify-center'>
            <p>
              {list?.total_win
                ? formatCreditWholeNum(list?.total_win, true)
                : '-'}
            </p>
            <p className='text-[#AEAEAE] text-[0.8125rem]'>
              {'Total Win & Lost'}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
