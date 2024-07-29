import { useSelector } from 'react-redux';
import { LoadingPage } from '@/components/loading';
import { isWeb } from '@/util/common';
import OrderHistoryListItem from '../orderHistoryListItem';
import OrderHistoryListItemParlay from '../orderHistoryListItemParlay';
import React from 'react';

const OrderHistoryList = ({ list, isSettled, loading }) => {
  const { orderHistorySingleSelected } = useSelector((a) => a.profile);
  if (loading) return <LoadingPage />;

  return (
    <div
      key={list.index}
      className={`flex flex-[1_0_0] flex-col overflow-y-auto`}
    >
      {list?.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {orderHistorySingleSelected === 0 ? (
              <OrderHistoryListItem
                keyIndex={index}
                ListItem={item}
                isSettled={isSettled}
              />
            ) : (
              <OrderHistoryListItemParlay
                ListItem={item}
                isSettled={isSettled}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderHistoryList;
