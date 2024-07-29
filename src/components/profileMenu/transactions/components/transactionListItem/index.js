import { DepositOut, TransactionItem } from '@/asset/icons';
import { formatDate } from '@/components/matchHistory/utils';
import { formatCreditWholeNum } from '@/util/numbers';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const OrderStatus = {
  ['Failed']: {
    color: 'text-[#DE173E]',
  },
  ['Pending']: {
    color: 'text-[#9E9E9E]',
  },
  ['Completed']: {
    color: 'text-[#46C853]',
  },
};

const OrderType = {
  ['top-up']: {
    type: 'Deposit',
    sign: '+',
    icon: DepositOut,
  },
  ['withdraw']: {
    type: 'Withdraw',
    sign: '-',
    icon: TransactionItem,
  },
};
const TransactionListItem = ({ data }) => {
  const { t } = useTranslation();
  const wagerRatio = +((data?.wager || 0) / (data?.amount || 1)).toFixed(2);
  return (
    <div className='flex justify-between px-2 py-2.5'>
      <div className='flex gap-1'>
        <Image src={OrderType[data.order_type]?.icon} alt={'tranIcon'} />
        <div>
          <p className='text-[#FFFFFF] font-semibold'>{data.type_detail}</p>
          {wagerRatio ? (
            <p className='text-[#9E9E9E] text-xs'>
              {t('validForWithdrawalTurnOver')?.replace(
                '@turnover',
                wagerRatio
              )}
            </p>
          ) : null}
          {data.created_at ? (
            <p className='text-[#9E9E9E] text-xs'>
              {formatDate(data.created_at * 1000)}
            </p>
          ) : null}
        </div>
      </div>
      <div className=''>
        <p className='text-[#FFFFFF] font-bold text-right'>
          {formatCreditWholeNum(data.amount, true)}
        </p>
        <p
          className={`${
            OrderStatus[data.order_status]?.color
          } text-xs float-right`}
        >
          {data.order_status}
        </p>
      </div>
    </div>
  );
};

export default TransactionListItem;
