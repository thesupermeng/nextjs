import { WEBOnly } from '@/components/Fragments/EnvComponent';
import OrderHistory from '@/components/profileMenu/orderHistory';
import { GamesHistoryContent } from '@/components/profileMenu/orderHistory/components/gamesHistoryContent';
import { OrderHistoryContent } from '@/components/profileMenu/orderHistory/components/orderHistoryContent';
import OrderHistoryHeader from '@/components/profileMenu/orderHistory/components/orderHistoryHeader';
import OrderHistoryHeaderH5 from '@/componentsH5/orderHistoryHeaderH5';
import { isWeb } from '@/util/common';
import { useState } from 'react';

export const LiveOrderHistoryTab = ({ isMini }) => {
  const [selectedHeader, setSelectedHeader] = useState(1);
  return (
    <div
      className={`p-2 ${isWeb() ? 'flex flex-col flex-1 overflow-hidden' : ''}`}
    >
      <OrderHistoryHeaderH5
        setSelectedHeader={setSelectedHeader}
        selectedHeader={selectedHeader}
      />
      <div className='h-3'></div>
      {selectedHeader === 1 ? (
        <OrderHistoryContent withFilter={false} />
      ) : (
        <GamesHistoryContent withFilter={false} />
      )}
    </div>
  );
};
