import { useCalculateStakes } from '@/hook/FB/useCalculateStakes';
import { useMatchDetail } from '@/hook/FB/useMatchDetail';
import { Card } from '@material-tailwind/react';
import { useTranslation } from 'next-i18next';
import { formatDate } from '../matchHistory/utils';
import { ORDER_STATUS } from '../betCart/BetSuccessfulModal';
import { formatCredit } from '@/util/numbers';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderStakeStatus } from '@/hook/FB/useGetStakeOrderStatus';
import { useEffect, useState } from 'react';
import { useVoucher } from '@/hook/api/useVoucher';
import useSinglePassBet from '@/hook/FB/useSinglePassBet';
import { setOrderIdsToCheck } from '@/store/orders';

export const DetailsCard = ({ options, marketId }) => {
  const option = options[marketId];
  const { getStake, getEstReturn } = useCalculateStakes();
  const { matchDetail } = useMatchDetail(option?.matchId);
  const { t } = useTranslation();
  const selectedVoucher = useSelector((s) => s.voucher.selectedVoucher);
  const [status, setStatus] = useState(-1);
  const { orderStatus } = useGetOrderStakeStatus();
  const { preBinding } = useVoucher();
  const { getBetDetails } = useSinglePassBet();
  const { isSeries } = useSelector((s) => s.betCart);
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);

  const fetchBetDetail = async () => {
    await getBetDetails()
      .then((betDetails) => preBinding(betDetails, selectedVoucher.id))
      .then((data) => {})
      .catch((error) => {});
  };

  useEffect(() => {
    if (orderStatus.length > 0) {
      setOrder(orderStatus);
      setStatus(orderStatus?.[0]?.st);
      if (orderStatus?.[0]?.st === 4) dispatch(setOrderIdsToCheck([]));
    }
  }, [orderStatus]);

  useEffect(() => {
    if (selectedVoucher) {
      fetchBetDetail();
    }
  }, [selectedVoucher]);

  return (
    <Card className='bg-[#191A1D] flex flex-row justify-between p-4 text-xs text-white'>
      <div className='flex flex-col gap-1'>
        <div className='flex text-[#AEAEAE] gap-2 flex-wrap'>
          <p>#{order?.[0]?.oid}</p>
          <p>{formatDate(matchDetail?.bt)}</p>
        </div>

        <div className='flex gap-2 mt-2 text-[13px]'>
          <p>{option?.op?.na}</p>
          <p className='font-bold'>
            {option?.op?.li} {option?.op?.od}
          </p>
        </div>

        <div>
          <p>{option?.betName} </p>
        </div>
        <div>
          <p>{matchDetail?.nm} </p>
        </div>

        {selectedVoucher && (
          <div>
            <span className='flex gap-1 whitespace-nowrap'>
              {t('voucher')} :{' '}
              <span className='text-[#AEAEAE]'>
                {t('applied')} {selectedVoucher.name}
              </span>
            </span>
          </div>
        )}
      </div>
      <div className='flex flex-col items-end gap-2'>
        {status !== -1 && (
          <p className='text-[10px] bg-[#0E0F1180] px-2 py-1 rounded-[3px]'>
            {ORDER_STATUS[status ? parseInt(status) : 0]?.text}
          </p>
        )}

        {!isSeries && (
          <>
            <p className='text-[16px]'>{formatCredit(getStake(marketId))}</p>
            <div className='flex gap-2 flex-wrap items-end text-right '>
              <p className='whitespace-nowrap text-[11px] flex-1'>
                {t('estReturn')}
              </p>
              <p className='text-[#FCC511] flex-1 whitespace-nowrap'>
                {formatCredit(getEstReturn(marketId))}
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
// 0	Created	未确认
// 1	Confirming	确认中
// 2	Rejected	已拒单
// 3	Canceled	已取消
// 4	Confirmed	已接单
// 5	Settled	已结算
