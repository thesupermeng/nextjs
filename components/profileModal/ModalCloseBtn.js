import { CrossWhite } from '@/asset/icons';
import { setProfileModal } from '@/store/common';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

export const ModalCloseBtn = () => {
  const dispatch = useDispatch();
  return (
    <div className='absolute top-4 right-4 flex flex-initial'>
      <Image
        onClick={() => {
          dispatch(setProfileModal(null));
        }}
        className='opacity-20 z-10 hover:opacity-100 cursor-pointer'
        src={CrossWhite}
        alt='close'
      />
    </div>
  );
};
