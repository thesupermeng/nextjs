import { toggleSeries } from '@/store/betCart';
import { isWeb } from '@/util/common';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Option = ({ text, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-1 ${
        isWeb() ? 'p-[10px] text-[14px]' : 'py-1 text-[13px]'
      } font-semibold justify-center text-center cursor-pointer ${
        isSelected ? 'text-[#0E0F11] bg-white rounded-[6px]' : 'text-white'
      }`}
    >
      {text}
    </div>
  );
};
export const BetType = () => {
  const dispatch = useDispatch();
  const { isSeries } = useSelector((s) => s.betCart);
  const toggleIsSeries = useCallback((flag) => {
    dispatch(toggleSeries(flag));
  }, []);
  return (
    <div
      className={`flex flex-initial flex-row rounded-[6px] ${
        isWeb() ? 'bg-tayaGrey mx-5' : 'mx-3 mt-3 bg-tayaGrey rounded-lg'
      }`}
    >
      <Option
        text='Single'
        isSelected={!isSeries}
        onClick={() => toggleIsSeries(false)}
      />
      <Option
        text='Parlay'
        isSelected={isSeries}
        onClick={() => toggleIsSeries(true)}
      />
    </div>
  );
};
