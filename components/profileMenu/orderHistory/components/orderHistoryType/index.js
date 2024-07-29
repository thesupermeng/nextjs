import { selectOrderHistoryOption } from '@/store/profile';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { isWeb } from '@/util/common';
import { CalendarComp } from '@/components/calender';
import { Radio, Typography } from '@material-tailwind/react';

const CheckedInput = ({ label, checked, ...props }) => {
  return (
    <Radio
      {...props}
      label={
        <Typography color='white' className='font-semibold text-sm'>
          {label}
        </Typography>
      }
      checked={checked}
      icon={<div className='bg-tayaRed rounded-full w-2 h-2'></div>}
      name='type'
      color='red'
      className='w-3.5 h-3.5 '
    />
  );
};
const OrderHistoryType = ({
  isSettled,
  setIsSettled,
  setSelectedDateRange,
  withFilter,
}) => {
  const { orderHistorySingleSelected } = useSelector((a) => a.profile);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const Option = ({ text, isSelected, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={`${
          isWeb() ? 'p-[10px]' : 'py-1'
        } cursor-pointer flex flex-1 ] text-[14px] font-semibold justify-center text-center ${
          isSelected
            ? 'text-[#0E0F11] bg-white rounded-[6px] m-[2px]'
            : 'text-white'
        }`}
      >
        {text}
      </div>
    );
  };

  return (
    <div>
      <div className='flex flex-initial flex-row rounded-[6px] bg-tayaGrey'>
        <Option
          text={t('single')}
          isSelected={orderHistorySingleSelected === 0}
          onClick={() => dispatch(selectOrderHistoryOption(0))}
        />
        <Option
          text={t('parlay')}
          isSelected={orderHistorySingleSelected === 1}
          onClick={() => dispatch(selectOrderHistoryOption(1))}
        />
      </div>

      <div className='flex justify-between items-center my-2 gap-2'>
        <div className='flex gap-2'>
          <div className='flex items-center checkbox'>
            <CheckedInput
              onChange={() => setIsSettled(false)}
              checked={isSettled === false}
              label={t('unsettled')}
            />
          </div>
          <div className='flex font-medium  items-center checkbox'>
            <CheckedInput
              onChange={() => setIsSettled(true)}
              checked={isSettled === true}
              label={t('settled')}
            />
          </div>
        </div>

        {withFilter && (
          <CalendarComp setSelectedDateRange={setSelectedDateRange} />
        )}
      </div>
    </div>
  );
};

export default OrderHistoryType;
