import { CrossWhite } from '@/asset/icons';
import { hideRightBarContent } from '@/store/common';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';

const FollowingHeader = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onCloseClick = () => {
    dispatch(hideRightBarContent('All'));
  };

  return (
    <div className='flex justify-between'>
      <button>
        <div className='mr-2 text-base  text-tayaRed font-medium'>
          {t('following')}
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

export default FollowingHeader;
