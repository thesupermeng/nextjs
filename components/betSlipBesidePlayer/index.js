'use client';
import { hideRightBarContent } from '@/store/common';
import { useDispatch } from 'react-redux';
import BetCartHeader from '../betCart/BetCartHeader';
import BetTab from '../betTab';
import { MatchInfo } from '../matchInfo';
import { RightSidebarContantTypes } from '../rightSideMenu';

export default function BetSlipBesidePlayer() {
  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(hideRightBarContent(RightSidebarContantTypes.BetSlipBesidePlayer));
  };
  return (
    <>
      <BetCartHeader onClose={closeCart} />
      <MatchInfo leagueTw='text-sm' />

      <div className='flex flex-col flex-1'>
        <BetTab />
      </div>
    </>
  );
}
