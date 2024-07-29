import { Edit } from '@/asset/icons';
import BottomSheet from '@/componentsH5/bottomSheet';
import { formatCreditWholeNum } from '@/util/numbers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { CustomTopUpSlider } from '../customTopUpSlider';
import useGetConfig from '@/hook/user/useGetConfig';

const QuickAmountButton = ({ amount, isSelected, onClick }) => (
  <div
    className={`px-5 flex items-center justify-center ${
      isSelected ? 'bg-white text-black' : 'bg-[#191A1D]'
    } rounded-[8px] py-2 cursor-pointer`}
    onClick={onClick}
  >
    {formatCreditWholeNum(amount)}
  </div>
);

export const QuickSelector = ({
  // topUpMinAmount = 0,
  topUpAmount,
  setTopUpAmt,
}) => {
  const { t } = useTranslation();
  // const amount = topUpMinAmount || 0;
  const [showCustom, setShowCustom] = useState(false);
  const { config } = useGetConfig();

  // const largerThanAmount = quickTopUpOption?.filter(
  //   (option) => option.value > amount
  // );

  const [list, setList] = useState(null);

  useEffect(() => {
    const quickTopUpOption = config?.deposit_range?.deposit_range
      .split(',')
      .map((value) => ({
        label: value.toString(),
        value: value,
      }));
    setList(quickTopUpOption?.map((item) => item.value));
  }, [config]);

  const toggleSheet = () => {
    setShowCustom(!showCustom);
  };

  const handleAmountClick = (selectedAmount) => {
    setTopUpAmt(selectedAmount);
  };

  useEffect(() => {
    // setList([...customList]);
    onConfirmClick(0);
  }, []);

  const onConfirmClick = (val) => {
    setTopUpAmt(val);
    // setList([...customList]);
  };

  return (
    <>
      <div className='flex flex-1'>
        <div className='flex flex-row text-center gap-3 overflow-x-auto w-full'>
          {list?.map((c, index) => (
            <QuickAmountButton
              key={index}
              amount={c}
              isSelected={topUpAmount === c}
              onClick={() => handleAmountClick(c)}
            />
          ))}
        </div>

        <div
          className='bg-[#191A1D] rounded-[8px] p-3 ml-2 cursor-pointer'
          onClick={toggleSheet}
        >
          <Image src={Edit} width={20} height={20} alt='edit' />
        </div>
      </div>

      <BottomSheet
        isOpen={showCustom}
        toggleSheet={toggleSheet}
        title={t('topUpAmount')}
        className='!h-[500px]'
      >
        <CustomTopUpSlider
          selectedAmt={topUpAmount}
          setSelected={(val) => onConfirmClick(val)}
          setShowCustom={() => {
            setShowCustom(false);
          }}
          showCustom={showCustom}
        />
      </BottomSheet>
    </>
  );
};
