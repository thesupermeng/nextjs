import { DoneLottie } from '@/asset/lottie';
import { LottieAnimation } from '@/components/lottie';
import Image from 'next/image';
import { useEffect } from 'react';

const SuccessModal = ({
  message,
  additionalMsg,
  setModalOpen = null,
  modal = null,
  className = '',
}) => {
  useEffect(() => {
    setTimeout(() => {
      setModalOpen(false);
    }, 3000);
  }, [modal]);

  return (
    <div
      className={`${className} z-50 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[.7]`}
    >
      <div className='rounded-3xl flex-initial flex-col p-7 bg-[#121212] flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <LottieAnimation
            src={DoneLottie}
            tw={'w-[3.875rem] h-[3.875rem]'}
            isLoop={false}
          />
          <p className='text-[#FFFFFF]  font-semibold'>{message}</p>
          <p className='text-[#FFFFFF]  font-semibold max-w-[400px] text-center'>
            {additionalMsg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
