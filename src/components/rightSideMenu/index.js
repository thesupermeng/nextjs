'use client';
import { RightBetCartWidth } from '@/app/page';
import { useSelector } from 'react-redux';
import BetSlipBesidePlayer from '@/components/betSlipBesidePlayer';
import BetCart from '../betCart';
import { RightSideMenuTransistionCss } from '@/util/tailwindCss';
import BetSetting from '../betSetting';
import Account from '../profileMenu/account';
import Transactions from '../profileMenu/transactions';
import OrderHistory from '../profileMenu/orderHistory';
import TopUpSlider from '../profileMenu/topUpSlider';
import Following from '../profileMenu/following';
import { Notification } from '../notification';
import TopUpRedirect from '../profileMenu/topUpSlider/components/topUpRedirect';
import ErrorModal from '../errorModal';
import { BetSuccessfulModal } from '../betCart/BetSuccessfulModal';
import { RechargeResult } from '../rechargeResult';
import { Promotion } from '../promotion';
import { Feedback } from '../feedback';
import { VoucherSidebar } from '../voucher/voucherSidebar';
import { BetOrderSlip } from '../betOrderSlip';
import { VoucherHistory } from '../voucher/VoucherHistory';

export default function RightSideMenu() {
  const { showRightSidebar, rightBarContent } = useSelector((s) => s.common);

  return (
    <>
      <div
        className={`flex flex-initial relative ${RightSideMenuTransistionCss} ${
          showRightSidebar ? RightBetCartWidth + ' p-4' : ' w-0'
        }`}
      >
        {rightBarContent[RightSidebarContantTypes.BetSlipBesidePlayer] && (
          <BetSlipBesidePlayer />
        )}
        {rightBarContent[RightSidebarContantTypes.BetCart] && <BetCart />}
        {rightBarContent[RightSidebarContantTypes.BetSetting] && <BetSetting />}
        {rightBarContent[RightSidebarContantTypes.Account] && <Account />}
        {rightBarContent[RightSidebarContantTypes.Transactions] && (
          <Transactions />
        )}
        {rightBarContent[RightSidebarContantTypes.OrderHistory] && (
          <OrderHistory />
        )}
        {rightBarContent[RightSidebarContantTypes.Following] && <Following />}
        {rightBarContent[RightSidebarContantTypes.Withdrawal] && (
          <TopUpSlider />
        )}
        {rightBarContent[RightSidebarContantTypes.Deposit] && <TopUpSlider />}

        {rightBarContent[RightSidebarContantTypes.Notification] && (
          <Notification />
        )}

        {rightBarContent[RightSidebarContantTypes.RechargeInfo] && (
          <RechargeResult />
        )}
        {rightBarContent[RightSidebarContantTypes.Promotion] && <Promotion />}
        {rightBarContent[RightSidebarContantTypes.Feedback] && <Feedback />}
        {rightBarContent[RightSidebarContantTypes.Voucher] && (
          <VoucherSidebar />
        )}
        {rightBarContent[RightSidebarContantTypes.OrderSlip] && (
          <BetOrderSlip />
        )}

        {rightBarContent[RightSidebarContantTypes.MyVoucher] && (
          <VoucherSidebar useNow />
        )}

        {rightBarContent[RightSidebarContantTypes.VoucherHistory] && (
          <VoucherHistory />
        )}
        {/* {rightBarContent[RightSidebarContantTypes.StreamGameBetSlip] && (
          <StreamGameWebBetSlip />
        )} */}
        <TopUpRedirect />
        <ErrorModal />
        <BetSuccessfulModal />
      </div>
    </>
  );
}

export const RightSidebarContantTypes = {
  BetSetting: 'BetSetting',
  BetCart: 'BetCart',
  BetSlipBesidePlayer: 'BetSlipBesidePlayer',
  Account: 'Account',
  Deposit: 'Deposit',
  Withdrawal: 'Withdrawal',
  OrderHistory: 'OrderHistory',
  Transactions: 'Transactions',
  Following: 'Following',
  Notification: 'Notification',
  RechargeInfo: 'RechargeInfo',
  Promotion: 'Promotion',
  Feedback: 'Feedback',
  Voucher: 'Voucher',
  MyVoucher: 'MyVoucher',
  OrderSlip: 'OrderSlip',
  VoucherHistory: 'VoucherHistory',
  // StreamGameBetSlip: 'StreamGameBetSlip',
};
