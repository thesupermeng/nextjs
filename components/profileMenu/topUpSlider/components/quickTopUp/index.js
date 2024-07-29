import { setQtpSelected } from '@/store/profile';
import { isWeb } from '@/util/common';
import { formatCreditWholeNum } from '@/util/numbers';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { Unit } from '@/config/User/setting';
import { setDepositAmt } from '@/store/deposit';
import Image from 'next/image';
import { IconInfo } from '@/asset/icons';
import useGetConfig from '@/hook/user/useGetConfig';

const QuickTopUp = ({ setQuickTopUpAmt, quickTopUpAmt, qtpSelected }) => {
  const { t } = useTranslation();
  const { config } = useGetConfig();

  const quickTopUpOption = config?.deposit_range?.deposit_range
    .split(',')
    .map((value) => ({
      label: value.toString(),
      value: value,
    }));

  const dispatch = useDispatch();

  const onQTPClick = (event) => {
    setQuickTopUpAmt(event.target.value);
    dispatch(setQtpSelected(true));
    dispatch(setDepositAmt(event.target.value));
  };

  return (
    <>
      {isWeb() && (
        <>
          <p className='mt-6 mb-1 text-xs'>{t('chooseYourTopUpAmount')}</p>
          <div className=' h-[0.80px] bg-tayaGrey'></div>
        </>
      )}

      <div className='flex flex-row gap-1 items-start my-1.5'>
        <Image alt='!' src={IconInfo} />
        <div className='text-white text-13 font-medium'>
          Please ensure that the entered amount is the same amount on the
          third-party payment platform (CoinPal) to complete the deposit.
        </div>
      </div>
      <div className='grid grid-cols-3 justify-between gap-2'>
        {quickTopUpOption?.map((quickTopUp, index) => {
          return (
            <button
              key={index}
              onClick={onQTPClick}
              value={quickTopUp.value}
              className={`${
                isWeb() ? 'mt-3' : 'text-[13px] mt-2'
              } rounded-md text-center p-3 ${
                quickTopUpAmt == quickTopUp.value && qtpSelected
                  ? 'bg-tayaRed/[.32]'
                  : 'bg-tayaGrey'
              }`}
            >
              {formatCreditWholeNum(quickTopUp.value)} {Unit}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default QuickTopUp;
