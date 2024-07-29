'use client';
import { RightBetCartWidth } from '@/app/page';
import { useUpdateBetOptions } from '@/hook/FB/useUpdateBetOptions';
import {
  setAllBetOptions,
  setJumpLineData,
  setStakesParley,
} from '@/store/betCart/index.js';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import BetCartFooter from './BetCartFooter';
import BetCartHeader from './BetCartHeader';
import { BetOption } from './BetOption';
import { BetType } from './BetType';
import Image from 'next/image';
import { EmptyData } from '@/asset/icons';
import {
  hideRightBarContent,
  setActiveParlay,
  setShowSuccessfulModal,
  showKeyboard,
  showRightBarContent,
} from '@/store/common';
import { RightSidebarContantTypes } from '../rightSideMenu';
import BetError from './BetError';
import { isWeb } from '@/util/common';
import BottomSheet from '@/componentsH5/bottomSheet';
import { QuickTopUpSlider } from '@/componentsH5/quickTopUpSlider';
import { useRouter } from 'next/navigation';

export default function BetCart() {
  const dispatch = useDispatch();
  const [showOptions, setOptions] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openTopUp, setOpenTopUp] = useState(false);
  const [topUpAmount, setTopUpAmt] = useState(false);
  const [topUpMinAmount, setTopUpMinAmt] = useState(false);
  const isShow = useSelector((s) => s.common.isShowKeyboard);
  const [selected, setSelected] = useState('');
  const lengthOfMappedArray = Object.entries(showOptions).length;

  const { isSeries, options = {}, jumpLine } = useSelector((s) => s.betCart);
  const { rightBarContent } = useSelector((s) => s.common);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setOptions(options);
  }, [options]);

  useUpdateBetOptions(
    rightBarContent[RightSidebarContantTypes.BetCart] &&
      Object.entries(options).length > 0,
    isSeries
  );

  const closeCart = () => {
    dispatch(hideRightBarContent(RightSidebarContantTypes.BetCart));
  };

  const onBetSuccess = () => {
    dispatch(setShowSuccessfulModal(true));
    setTimeout(() => {
      //show bet slip
      if (isWeb()) {
        dispatch(showRightBarContent(RightSidebarContantTypes.OrderSlip));
      } else {
        router.push('/bet/orderSlip');
      }
      dispatch(setShowSuccessfulModal(false));
    }, 2000);
  };

  const onBetFailed = (msg) => {
    setErrorMsg(msg);
    setShowErrorModal(true);
  };

  const close = () => {
    if (!isWeb() && isShow) {
      dispatch(showKeyboard(false));
      dispatch(setActiveParlay(undefined));
    }
  };

  return (
    <div
      className={
        isWeb()
          ? `overflow-y-auto fixed z-30 right-0 top-0 bottom-0 bg-black opacity-100 ${
              rightBarContent[RightSidebarContantTypes.BetCart]
                ? RightBetCartWidth + ' '
                : 'h-0 w-0 opacity-0 pointer-events-none overflow-hidden'
            } flex flex-col flex-1  common-transition `
          : `flex flex-col flex-1`
      }
      onClick={close}
    >
      {isWeb() && <BetCartHeader onClose={closeCart} />}
      <BetType />
      <div className='h-3'></div>
      <div
        className={`flex flex-col  gap-6 flex-[1_0_0] overflow-x-hidden overflow-y-auto ${
          isWeb() ? 'px-5' : 'mx-3'
        }`}
      >
        {Object.entries(showOptions).length === 0 ? (
          <div className='flex flex-col items-center justify-center flex-1 gap-3'>
            <Image src={EmptyData} alt='empty' width={80} height={80}></Image>
            <p className='text-[#6F7076] text-lg font-medium'>
              {t('yourBetSlipIsEmpty')}
            </p>
          </div>
        ) : (
          Object.entries(showOptions).map(([id, option], idx) => (
            <BetOption
              index={idx}
              key={id}
              id={id}
              data={option}
              jumpLine={jumpLine?.bms?.[id]}
              isSeries={isSeries}
              selected={selected}
              setSelected={setSelected}
              length={lengthOfMappedArray}
            />
          ))
        )}
      </div>

      <div className={`${isShow && !isWeb() && !isSeries ? 'hidden' : ''}`}>
        <BetCartFooter
          onBetSuccess={onBetSuccess}
          onBetFailed={onBetFailed}
          setOpenTopUp={(val) => {
            setOpenTopUp(true);
            setTopUpMinAmt(val);
          }}
        />
      </div>

      {showErrorModal && (
        <BetError
          title={t('betError')}
          message={errorMsg}
          setShowErrorModal={setShowErrorModal}
        />
      )}

      <BottomSheet
        isOpen={openTopUp}
        toggleSheet={() => setOpenTopUp(!openTopUp)}
        title={t('topUp')}
        className='!h-[500px] !p-0'
      >
        <QuickTopUpSlider
          topUpAmount={topUpAmount}
          setTopUpAmt={setTopUpAmt}
          topUpMinAmount={topUpMinAmount}
        />
      </BottomSheet>
    </div>
  );
}
