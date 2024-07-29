import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import { setQtpSelected } from '@/store/profile';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { USDT } from '@/asset/icons';
import { isWeb } from '@/util/common';
import useWithdrawInfo from '@/hook/user/useWithdrawInfo';
import { Unit } from '@/config/User/setting';

const CustomTopUpAmt = ({
  selectedAmt,
  setTopUpAmt,
  onClick = () => {},
  ...props
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { selectedAcc } = useSelector((s) => s.withdraw);
  const { profileMenuSelected } = useSelector((s) => s.profile);

  const AmtOnChange = (event) => {
    const reg = /^[0-9\b]+$/;
    if (event.target.value === '' || reg.test(event.target.value)) {
      setTopUpAmt(event.target.value);
      if (profileMenuSelected === 1) {
        dispatch(setQtpSelected(false));
      }
    }
  };

  return (
    <div className='mt-4' {...props}>
      <p className={`mb-4 ${isWeb() ? 'text-sm' : 'text-xs'}`}>
        {profileMenuSelected === 1 ? t('topUpAmount') : t('withdrawAmount')}
      </p>

      <WEBOnly>
        <div className='rounded-xl flex justify-between px-5 py-3.5 mb-2 bg-tayaGrey'>
          <div className='flex w-full self-stretch items-center'>
            <Image src={USDT} alt='usdt' />
            <input
              value={selectedAmt}
              className='flex-1 text-sm ml-2 font-medium text-[#FFFFFF]/[.7] bg-tayaGrey outline-none'
              placeholder={t('amount')}
              onChange={AmtOnChange}
            />
          </div>
        </div>
      </WEBOnly>
      <H5Only>
        <div
          className='rounded-xl flex justify-between px-5 py-3.5 mb-4 bg-tayaGrey'
          onClick={onClick}
        >
          <div className='flex items-center'>
            <Image src={USDT} alt='usdt' />
            <input
              value={selectedAmt}
              readOnly={true}
              className='text-base ml-2 font-medium text-[#FFFFFF]/[.7] bg-tayaGrey outline-none'
              placeholder={t('amount')}
              onChange={AmtOnChange}
            />
          </div>
        </div>
      </H5Only>
      {profileMenuSelected === 2 && selectedAcc?.method && (
        <div className='text-sm mb-1'>
          <span className='text-white/50'>{t('withdrawLimit')}: </span>
          <span>
            {selectedAcc?.method?.min_amount} -{' '}
            {selectedAcc?.method?.max_amount} {Unit}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomTopUpAmt;
