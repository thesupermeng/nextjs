import { updateStake } from '@/store/betCart';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useFormattedData = (message) => {
  const [opData, setOpData] = useState(null);
  const [matchDetail, setMatchDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      getFormattedMatchDetail();
      getFormattedOpData();
    }
  }, [message]);

  const getFormattedOpData = () => {
    const opData = {
      ty: message?.ty,
      od: message?.op_od,
      li: message?.op_nm,
      na: message?.op_na,
    };
    setOpData(opData);
  };

  const getFormattedMatchDetail = () => {
    const matchDetail = {
      id: message?.match_id,
      nm: message?.nm,
      ms: message?.ms,
      type: message?.mg_nm,
    };
    setMatchDetail(matchDetail);
  };

  const onUpdateAmount = async () => {
    dispatch(updateStake({ id: message?.mg_id, data: message?.amount }));
  };

  return { opData, matchDetail, onUpdateAmount };
};
