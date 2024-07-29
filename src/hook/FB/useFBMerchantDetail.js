import useSWR from 'swr';
import { FBApi } from '@/util/FB_Api';
import { URL_FB_APP } from '@/config/url';
export const useFBMerchantDetail = () => {
  const {
    data: merchantDetail,
    error,
    mutate: mutateMerchantDetail,
    isLoading,
  } = useSWR(URL_FB_APP.merchantDetail, (url) => FBApi(url));

  return {
    matchList: merchantDetail?.data || {},
    mutateMerchantDetail,
    isLoading,
  };
};
