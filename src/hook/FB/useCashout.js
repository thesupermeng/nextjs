import { URL_FB_APP } from '@/config/url';
import { FBApi } from '@/util/FB_Api';
import { useCallback, useEffect, useState } from 'react';

export const useCashout = ({ id }) => {
  const [ids, setIds] = useState([]);
  useEffect(() => {
    setIds(id);
  }, [id]);
  const getPrice = useCallback(async () => {
    return FBApi(URL_FB_APP.cashOutPrice, { orderIds: ids });
  }, [ids]);
  const getCashOuts = useCallback(async () => {
    return FBApi(URL_FB_APP.cashOutByIds, { ids });
  }, [ids]);
  const getStatus = useCallback(async () => {
    return FBApi(URL_FB_APP.cashOutStatusInfoByIds, { ids });
  }, [ids]);
  const cancelCashOut = useCallback(async () => {
    return FBApi(URL_FB_APP.cashOutReserveCancel, {
      // this id has to be integer
      reserveCashOutId: Array.isArray(ids) ? ids[0] : ids,
    });
  }, [ids]);
  return { getPrice, getCashOuts, getStatus, cancelCashOut };
};
