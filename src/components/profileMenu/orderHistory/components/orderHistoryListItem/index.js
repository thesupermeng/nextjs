import { isWeb } from '@/util/common';
import {
  convertTimeStampToDate,
  convertTimeStampToDateTime,
} from '@/util/date';
import { formatCreditWholeNum } from '@/util/numbers';
import i18n from 'i18next';
import { useTranslation } from 'next-i18next';

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

const OrderHistoryListItem = ({ ListItem, isSettled, keyIndex }) => {
  const { t } = useTranslation();

  const { year, month, day, monthShort, hours, minutes, seconds } =
    convertTimeStampToDateTime(ListItem?.ts * 1000);

  const matchTime = convertTimeStampToDate(
    ListItem?.bets?.[0]?.match_time * 1000
  );
  const { won, stake } = ListItem || {};
  return (
    <div
      className='bg-tayaGrey rounded-xl px-3.5 pt-3.5 pb-4 my-1.5'
      key={keyIndex}
    >
      <div className='flex justify-between items-start'>
        <div
          className={`flex gap-[0.31rem] font-sans text-sm text-white flex-col`}
        >
          <p className='text-sm'>{ListItem?.bets?.[0]?.option_name}</p>

          <p className='text-[11px]'>{ListItem?.bets?.[0]?.market_name}</p>
          <p className='text-xs'>{ListItem?.bets?.[0]?.match_name}</p>
          <p className='text-xs'>{matchTime}</p>

          {ListItem?.voucher && (
            <p className='text-xs'>{` ${t('voucher')}: ${t('applied')} ${
              ListItem?.voucher?.name
            }`}</p>
          )}
        </div>

        <div className='flex'>
          <div
            className={`px-1.5 py-0.5 rounded-[0.1875rem] ${
              orderStatus?.[ListItem?.status]?.bg
            } `}
          >
            <p className='text-xs font-medium font-sans text-[#FFFFFF]'>
              {orderStatus?.[ListItem?.status]?.label}
            </p>
          </div>
        </div>
      </div>

      <div className=' h-[0.80px] border-t border-[#FFFFFF0F]  my-2'></div>

      <div className='flex flex-col mt-4'>
        <div className='flex justify-between text-[#AEAEAE] text-xs'>
          <p className=''>#{ListItem?.order_id}</p>
          <p className=''>
            {day + ' ' + monthShort + ' ' + year + ', ' + hours + ':' + minutes}
          </p>
        </div>

        <div className='flex gap-[0.375rem] items-center font-sans text-[#FFFFFF] font-semibold justify-between'>
          <div className='flex items-center gap-2'>
            <p className='text-[0.6875rem]'>{t('stake')}</p>
            <p className='font-sans text-[#FFFFFF] font-semibold'>
              {formatCreditWholeNum(ListItem.stake, true)}
            </p>
          </div>

          {isSettled ? (
            <div className='flex items-center gap-2 text-[11px]'>
              {won - stake > 0 ? (
                <p className='text-won text-[15px]'>
                  {t('won')} {formatCreditWholeNum(won - stake, true)}
                </p>
              ) : won - stake < 0 ? (
                <p className='text-tayaRed text-[15px]'>
                  {t('lost')} {formatCreditWholeNum(won - stake, true)}
                </p>
              ) : (
                <p className='text-white text-[15px]'>{t('draw')}</p>
              )}
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <p className='text-[11px]'>{t('estReturn')}</p>
              <p>{formatCreditWholeNum(ListItem.max_return, true)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryListItem;
