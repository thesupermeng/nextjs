'use client';
import { useSelector } from 'react-redux';
import TransactionHeader from './components/transactionHeader';
import TransactionList from './components/transactionList';
import TransactionType from './components/transactionType';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { RightBetCartWidth } from '@/app/page';
import { isWeb } from '@/util/common';
import { WEBOnly } from '@/components/Fragments/EnvComponent';
import { getTransactionHistory } from '@/services/user';
import { useEffect, useState } from 'react';
import { formatDateToDashOnly, getDefaultDateRange } from '@/util/date';
import { NodataV2 } from '@/components/noDataV2';
// import { TayaSportsPagingFooter } from '@/app/sports/Eastrich/TayaSportsPagingFooter';

const Transactions = () => {
  const { rightBarContent } = useSelector((s) => s.common);
  const [list, setList] = useState([]);
  const [selectedType, setSelectedType] = useState(1);
  const [selectedDateRange, setSelectedDateRange] = useState(
    getDefaultDateRange()
  );
  const [loading, setLoading] = useState(true);
  const call = (params) => {
    getTransactionHistory({ page: 1, limit: 100, ...params }).then((data) => {
      if (data?.code === 0) {
        setLoading(false);
        selectedType === 1
          ? setList(data?.data?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
          : setList(data?.data);
      } else {
        setLoading(false);
        setList([]);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    call({
      topup_only: selectedType === 2 ? true : false,
      withdraw_only: selectedType === 3 ? true : false,
      start_time: formatDateToDashOnly(selectedDateRange[0]) + ' 00:00:00',
      end_time: formatDateToDashOnly(selectedDateRange[1]) + ' 23:59:59',
    });
  }, [selectedDateRange, selectedType]);

  return (
    <div
      className={`${
        isWeb() &&
        `overflow-y-auto fixed z-30 right-0 top-0 bottom-0 bg-black opacity-100 gap-6 ${
          rightBarContent[RightSidebarContantTypes.Transactions]
            ? RightBetCartWidth + ' p-5'
            : 'h-0 w-0 opacity-0 pointer-events-none overflow-hidden'
        } common-transition `
      }  ${!isWeb() && 'mx-2 gap-2'} flex flex-col flex-1  `}
    >
      <WEBOnly>
        <TransactionHeader />
      </WEBOnly>
      <TransactionType
        setSelectedDateRange={setSelectedDateRange}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
      {list?.length > 0 ? (
        <TransactionList list={list} loading={loading} />
      ) : (
        <NodataV2 />
      )}

      {/* <TayaSportsPagingFooter /> */}
    </div>
  );
};

export default Transactions;
