import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { CrossWhite } from '@/asset/icons';
import { setRechargeInfo } from '@/store/recharge';
import { useEffect } from 'react';
import { hideRightBarContent } from '@/store/common';

const RechargeHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onCloseClick = () => {
    dispatch(setRechargeInfo({}));
    dispatch(hideRightBarContent('All'));
  };
  useEffect(() => {
    return () => {
      dispatch(setRechargeInfo({}));
    };
  }, []);

  return (
    <div className='flex justify-between p-4'>
      <button>
        <div className='mr-2 text-base text-tayaRed font-medium'>
          {t('topUp')}
        </div>
        <div className='h-[0.1875rem] w-6 rounded-t-2xl bg-tayaRed ml-auto mr-auto mt-1'></div>
      </button>
      <button onClick={onCloseClick}>
        <Image
          className='w-9 h-9 opacity-20 hover:opacity-100'
          src={CrossWhite}
          alt='close'
        />
      </button>
    </div>
  );
};

export default RechargeHeader;
