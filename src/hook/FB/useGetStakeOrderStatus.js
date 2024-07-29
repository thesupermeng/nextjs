import { FB_Refresh_Interval } from '@/config/FB/FBConfig';
import { URL_FB_APP } from '@/config/url';
import { FBApi } from '@/util/FB_Api';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

export const useGetOrderStakeStatus = () => {
  const { checkingOids } = useSelector((s) => s.orders);
  const { data, error, isLoading } = useSWR(
    checkingOids?.length > 0
      ? [URL_FB_APP.getStakeOrderStatus, checkingOids]
      : null,
    ([url, checkingOids]) => FBApi(url, { orderIds: checkingOids }),
    { refreshInterval: FB_Refresh_Interval.Stake_Order_Status }
  );

  return {
    orderStatus: data?.data || [],
    isLoading,
  };
};
