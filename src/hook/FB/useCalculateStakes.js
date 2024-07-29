import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useCalculateStakes = () => {
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  const { stakes, jumpLine, stakesParley, options, isSeries } = useSelector(
    (s) => s.betCart
  );

  useEffect(() => {
    if (isSeries) {
      getParleyTotal();
    } else {
      getSingleTotal();
    }
  }, [stakes, jumpLine, isSeries, options, stakesParley]);

  const getSingleTotal = () => {
    let totalPayment = 0;
    let totalReturn = 0;
    Object.entries(stakes).forEach(([key, val]) => {
      if (!(key in options)) {
        return; // Skip this entry if the key is not in options
      }

      if (key !== 'all') {
        totalPayment += parseInt(val || 0, 10);
      }
      try {
        totalReturn += (jumpLine.bms[key].op.od - 1) * val;
      } catch (e) {
        totalReturn += 0;
      }
    }, 0);
    setTotalPayment(totalPayment);
    setTotalReturn(totalReturn);
  };
  const getParleyTotal = () => {
    let totalPayment = 0;
    let totalReturn = 0;

    Object.entries(stakesParley).forEach(([key, val]) => {
      try {
        let valueTotal = val.total || 0;
        totalPayment += val.sos.in * val.unitStake;
        totalReturn += valueTotal;
      } catch (e) {
        totalPayment = 0;
        totalReturn += 0;
      }
    }, 0);
    setTotalPayment(totalPayment);
    setTotalReturn(totalReturn);
  };

  const getStake = (marketId) => {
    return stakes[marketId] || 0;
  };
  const getEstReturn = (marketId) => {
    return stakes[marketId] * jumpLine.bms[marketId].op.od || 0;
  };
  return { totalPayment, totalReturn, getStake, getEstReturn };
};
