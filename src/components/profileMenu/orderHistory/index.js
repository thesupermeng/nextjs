'use client';
import { RightBetCartWidth } from '@/app/page';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import OrderHistoryHeader from './components/orderHistoryHeader';
import { isWeb } from '@/util/common';
import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import { OrderHistoryContent } from './components/orderHistoryContent';
import { GamesHistoryContent } from './components/gamesHistoryContent';
import OrderHistoryHeaderH5 from '@/componentsH5/orderHistoryHeaderH5';

const OrderHistory = () => {
  const { rightBarContent } = useSelector((s) => s.common);
  const [selectedHeader, setSelectedHeader] = useState(1);

  return (
    <div
      className={`${
        isWeb() &&
        `gap-6 overflow-y-auto fixed z-30 right-0 top-0 bottom-0 bg-black opacity-100 ${
          rightBarContent[RightSidebarContantTypes.OrderHistory]
            ? RightBetCartWidth + ' p-5'
            : 'h-0 w-0 opacity-0 pointer-events-none overflow-hidden'
        } common-transition`
      } flex flex-col flex-1 gap-1`}
    >
      <WEBOnly>
        <OrderHistoryHeader
          setSelectedHeader={setSelectedHeader}
          selectedHeader={selectedHeader}
        />
      </WEBOnly>
      <H5Only>
        <OrderHistoryHeaderH5
          setSelectedHeader={setSelectedHeader}
          selectedHeader={selectedHeader}
        />
      </H5Only>
      <div
        className={`${
          isWeb() ? '' : 'bg-[#121212] px-5 py-3 '
        } flex flex-col  flex-[1_0_0] overflow-y-auto`}
      >
        {selectedHeader === 1 ? (
          <OrderHistoryContent />
        ) : (
          <GamesHistoryContent />
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
