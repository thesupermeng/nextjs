import { DoneLottie } from '@/asset/lottie';
import FullScreenModal from '@/components/FullScreenModal';
import { LottieAnimation } from '@/components/lottie';
import { setMessage, setMessageModalOpen } from '@/store/profile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MessageModal = () => {
  const { message, messageModalOpen } = useSelector((s) => s.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setMessage(''));
      dispatch(setMessageModalOpen(false));
    }, 3000);
  }, [messageModalOpen]);

  return (
    <FullScreenModal>
      <div className='rounded-3xl flex-initial flex-col p-7 bg-[#121212] flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <LottieAnimation
            src={DoneLottie}
            tw={'w-[3.875rem] h-[3.875rem]'}
            isLoop={false}
          />
          <p className='text-[#FFFFFF] font-semibold'>{message}</p>
        </div>
      </div>
    </FullScreenModal>
  );
};

export default MessageModal;
