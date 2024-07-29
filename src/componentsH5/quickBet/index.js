import { ArrowRight, CreditCardIcon } from '@/asset/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Keyboard from '../keyboard';
import { useDispatch, useSelector } from 'react-redux';
import {
  setErrorModalProps,
  setQuickBetProps,
  setShowErrorModal,
  setShowSuccessfulModal,
  setSuccessModalProps,
  showQuickBet,
} from '@/store/common';
import useUser from '@/hook/user/useUser';
import Image from 'next/image';
import { Button } from '../button';
import useSinglePassBet from '@/hook/FB/useSinglePassBet';
import { setOrderIdsToCheck } from '@/store/orders';
import { BetOption } from '@/components/betCart/BetOption';
import { useUpdateQuickBet } from '@/hook/FB/useUpdateQuickBet';
import { updateStake } from '@/store/betCart';
import { formatCredit } from '@/util/numbers';
import useQuickBetRules from '@/hook/FB/useQuickBetRules';
import { useRouter } from 'next/navigation';

const BetItem = ({ value, setValue }) => {
  const dispatch = useDispatch();
  const quickBetProps = useSelector((s) => s.common.quickBetProps);
  const quickBet = useSelector((s) => s.common.quickBet);
  const { jumpLine } = useSelector((s) => s.betCart);
  const { stakes } = useSelector((s) => s.betCart);

  useUpdateQuickBet(quickBet, false);

  useEffect(() => {
    setValue(stakes?.[quickBetProps?.id]);
  }, [stakes]);

  useEffect(() => {
    if (!quickBet) {
      setValue('');
    }
  }, [quickBet]);

  useEffect(() => {
    () => {
      dispatch(setQuickBetProps({}));
    };
  }, []);

  return (
    <>
      <BetOption
        key={quickBetProps?.id}
        id={quickBetProps?.id}
        data={quickBetProps?.data}
        jumpLine={jumpLine?.bms?.[quickBetProps?.id]}
        isSeries={false}
        isQuickBet={true}
      />
    </>
  );
};

export const QuickBetSlider = () => {
  const [value, setValue] = useState('');
  const { user } = useUser();
  const { placeQuickBet } = useSinglePassBet();
  const quickBetProps = useSelector((s) => s.common.quickBetProps);

  const dispatch = useDispatch();
  const { jumpLine } = useSelector((s) => s.betCart);
  const thisJumpLine = jumpLine?.bms?.[quickBetProps?.id];
  const max = thisJumpLine?.smax;
  const min = thisJumpLine?.smin;

  const balance = user?.sum?.balance;
  const { hasExpired, hasOddChange } = useQuickBetRules();
  const { stakes } = useSelector((s) => s.betCart);
  const { t } = useTranslation();
  const router = useRouter();

  const AllInClick = () => {
    setValue(balance > max ? max : balance);
    dispatch(
      updateStake({
        id: quickBetProps?.id,
        data: balance > max ? max : balance,
      })
    );
  };

  const placeBetClick = () => {
    if (user?.sum?.balance < value || !value) {
      router.push('/user/deposit');
      return;
    }

    placeQuickBet().then((resp) => {
      try {
        if (resp.code === 0) {
          dispatch(setOrderIdsToCheck([resp?.data?.[0]?.id]));
          dispatch(setSuccessModalProps(resp?.data));
          dispatch(setShowSuccessfulModal(true));
          dispatch(showQuickBet(false));
        } else {
          dispatch(setShowErrorModal(true));
          dispatch(
            setErrorModalProps({ title: t('betError'), message: resp?.message })
          );
        }
      } catch (e) {
        console.error('place single bet error', e);
      }
    });
  };

  return (
    <>
      <div className='px-2 flex-col flex flex-[1_0_0] overflow-y-auto'>
        <BetItem value={value} setValue={setValue} />
        <Keyboard isQuickBet={true} onClickCustom={AllInClick} />
      </div>
      <div className='flex flex-col flex-initial px-4 pt-2 rounded-t-xl bg-tayaGrey text-[13px]'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Image src={CreditCardIcon} alt='wallet' width={17} />
            <p>{t('balance')}</p>
          </div>
          <div className='flex gap-2'>
            <p>({formatCredit(user?.sum?.balance)})</p>
            <Image src={ArrowRight} width={17} alt='arrow' />
          </div>
        </div>
      </div>

      <Button
        disabled={
          hasExpired ||
          !stakes?.[quickBetProps?.id] ||
          (min > 0 && stakes?.[quickBetProps?.id] < min) ||
          (max !== 0 && stakes?.[quickBetProps?.id] > max)
        }
        onClick={placeBetClick}
        buttonColor={`${
          hasOddChange ? 'bg-gradient-to-br from-sky-500 to-sky-900' : ''
        }`}
      >
        {`${
          hasExpired
            ? t('hasExpired')
            : hasOddChange
            ? t('acceptOddChangeAndBetNow')
            : `${t('placeBet')} ${value > 0 ? ` ${formatCredit(value)}` : ''}`
        } `}
      </Button>
    </>
  );
};
