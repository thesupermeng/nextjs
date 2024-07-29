import { removeFollowBetList, updateShowingState } from '@/store/chatroom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MiniFollowBet } from './miniFollowBet';
import { isWeb } from '@/util/common';

export const MiniFollowBetContainer = ({ show }) => {
  const [betList, setBetList] = useState([]);
  const { followBetList } = useSelector((s) => s.chatRoom);
  const [betRow, setBetRow] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setBetList(followBetList);
  }, [followBetList]);

  useEffect(() => {
    if (betList?.length <= 0 || betRow) return;
    const bet = betList.find((x) => {
      return x.status !== 'showing';
    });
    if (bet) {
      setBetRow(bet);
      dispatch(updateShowingState(bet?.ts));
    }
  }, [betList, betRow]);
  return (
    <div
      className={`absolute right-5 ${isWeb() ? 'top-20' : 'top-10'} ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {betRow && (
        <MiniFollowBet
          bet={betRow}
          onVisible={() => {
            setTimeout(() => {
              dispatch(removeFollowBetList(betRow?.ts));
              setBetRow(null);
            }, 8000);
          }}
        />
      )}
    </div>
  );
};
