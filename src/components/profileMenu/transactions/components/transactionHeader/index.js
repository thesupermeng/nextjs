import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { CrossWhite } from '@/asset/icons';
import { selectProfileMenu } from '@/store/profile';
import { hideRightBarContent } from '@/store/common';

const TransactionHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onCloseClick = () => {
    dispatch(hideRightBarContent('All'));
  };

  return (
    <div className='flex justify-between'>
      <button>
        <div className='mr-2 text-base text-tayaRed font-medium'>
          {t('transactions')}
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

export default TransactionHeader;
