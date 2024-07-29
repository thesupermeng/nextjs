import { Arrow, IconArrowWhite } from '@/asset/icons';
import { isWeb } from '@/util/common';
import {
  convertTimeStampToDate,
  convertTimeStampToDateTime,
} from '@/util/date';
import Image from 'next/image';
import { useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'next-i18next';
import { formatCreditWholeNum } from '@/util/numbers';
import { Unit } from '@/config/User/setting';

//sert 0-single 1-parlay
//sat total bet amount
//sa total won amount
//mla estimated return with bet amt

const orderStatus = {
  [0]: {
    bg: 'bg-[#0E0F11]/[.5]',
    label: i18n.t('created'),
  },
  [1]: {
    bg: 'bg-[#0844BC80]',
    label: i18n.t('confirming'),
  },
  [2]: {
    bg: 'bg-[#DE173E80]',
    label: i18n.t('rejected'),
  },
  [3]: {
    bg: 'bg-[#46C85380]',
    label: i18n.t('canceled'),
  },
  [4]: {
    bg: 'bg-[#46C85380]',
    label: i18n.t('confirmed'),
  },
  [5]: {
    bg: 'bg-[#0E0F1180]',
    label: i18n.t('settled'),
  },
};

const outcome = {
  [0]: {
    label: i18n.t('pending'),
    bg: 'bg-[#0E0F11]/[.5]',
  },
  [2]: {
    label: i18n.t('draw'),
    bg: 'bg-[#0E0F11]/[.5]',
  },
  [3]: {
    label: i18n.t('lost'),
    bg: 'bg-[#DE173E80]',
  },
  [6]: {
    label: i18n.t('lost'),
    bg: 'bg-[#DE173E80]',
  },
  [4]: {
    label: i18n.t('won'),
    bg: 'bg-[#46C85380]',
  },
  [5]: {
    label: i18n.t('won'),
    bg: 'bg-[#46C85380]]',
  },
};

const OrderHistoryListItemParlay = ({ ListItem, isSettled }) => {
  const { t } = useTranslation();
  const { year, month, day, monthShort, hours, minutes, seconds } =
    convertTimeStampToDateTime(ListItem?.ts * 1000);
  const [isExpand, setIsExpand] = useState(false);

  const { won, stake } = ListItem;
  return (
    <div className='bg-tayaGrey rounded-xl px-3.5 pt-3.5 pb-4 my-1.5'>
      <div className='flex justify-between items-start'>
        <div
          className={`flex gap-[0.31rem] font-sans text-sm text-white flex-col`}
        >
          <p className='font-semibold text-[15px]'>
            {t('parlay')} - {ListItem?.match_count} {t('matchesParlay')}{' '}
            {ListItem?.bet_type}
          </p>
        </div>

        <div className='flex gap-2'>
          <div
            className={`px-1.5 py-0.5 rounded-[0.1875rem] ${
              orderStatus?.[ListItem?.status]?.bg
            } `}
          >
            <p className='text-xs font-medium font-sans text-[#FFFFFF]'>
              {orderStatus?.[ListItem?.status]?.label}
            </p>
          </div>

          <div
            className={`flex cursor-pointer ${isExpand ? 'rotate-180' : ''}`}
            onClick={() => setIsExpand(!isExpand)}
          >
            <Image alt='expand' src={IconArrowWhite} />
          </div>
        </div>
      </div>

      {isExpand &&
        ListItem.bets?.map((l, idx) => {
          const matchTime = convertTimeStampToDate(l.match_time * 1000);

          return (
            <>
              <div
                className=' h-[0.80px] border-t border-[#FFFFFF0F] mx-2 my-2'
                key={idx}
              ></div>

              <div className='text-xs my-2 flex flex-col gap-1'>
                <div className='flex justify-between'>
                  <p>{l.option_name}</p>
                  <p
                    className={`${
                      outcome[l?.outcome].bg
                    } px-1 rounded-sm text-[10px] font-medium`}
                  >
                    {outcome[l?.outcome].label}
                  </p>
                </div>
                <p className='text-[#96979B]'>{l.market_name}</p>
                <p className='text-[#96979B]'>{l.match_name}</p>
                <p className='text-[#96979B]'>{matchTime}</p>
              </div>
            </>
          );
        })}

      <div className='h-[0.80px] border-t border-[#FFFFFF0F] my-2'></div>

      <div className='flex flex-col mt-4'>
        <div className='flex justify-between text-[#AEAEAE] text-xs'>
          <p className=''>#{ListItem?.order_id}</p>
          <p className=''>
            {day + ' ' + monthShort + ' ' + year + ', ' + hours + ':' + minutes}
          </p>
        </div>

        <div className='flex justify-between'>
          <div className='flex gap-[0.375rem] items-center'>
            <p className='text-[0.6875rem] font-sans text-[#FFFFFF] font-semibold'>
              {t('stake')}
            </p>
            <p className='font-sans text-[#FFFFFF] font-semibold'>
              {ListItem.stake} {Unit}
            </p>
          </div>

          {ListItem?.hasOwnProperty('won') ? (
            won - stake > 0 ? (
              <p className='text-won text-[15px] font-semibold'>
                {t('won')} {formatCreditWholeNum((won - stake), true)}
              </p>
            ) : won - stake < 0 ? (
              <p className='text-tayaRed text-[15px] font-semibold'>
                {t('lost')} {formatCreditWholeNum((won - stake), true)}
              </p>
            ) : (
              <p className='text-white text-[15px]'>{t('draw')}</p>
            )
          ) : (
            <div className='flex items-center gap-2'>
              <p className='text-[11px] font-semibold'>{t('estReturn')}</p>
              <p className='text-[15px] font-semibold'>
                {ListItem?.max_return} {Unit}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryListItemParlay;
