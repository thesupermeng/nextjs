import { CrossWhite } from '@/asset/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const BottomSlideSheet = ({
  setShowPopup,
  children,
  withClose = false,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, []);
  return (
    <>
      <div
        className={`${
          show ? 'bg-black/100' : 'bg-black/0'
        } fixed inset-0 transition-all duration-300 z-30`}
      ></div>
      <div
        className={`${
          show ? 'bottom-0' : '-bottom-full'
        } transition-all duration-300 fixed left-0 right-0 flex flex-row px-4 pt-4 pb-0 gap-4 bg-black/[0.66] z-50 backdrop-blur rounded-xl overflow-hidden`}
      >
        {children}
        {withClose && (
          <Image
            alt='close'
            onClick={() => {
              setShow(false);
              setTimeout(() => {
                setShowPopup(false);
              }, 300);
            }}
            width={20}
            height={20}
            src={CrossWhite}
            className='absolute right-3 top-3'
          />
        )}
      </div>
    </>
  );
};
