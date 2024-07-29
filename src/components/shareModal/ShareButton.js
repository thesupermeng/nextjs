import { ShareHollow } from '@/asset/icons';
import Image from 'next/image';
import { useState } from 'react';
import ShareModal from '.';

export const ShareButton = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className='cursor-pointer inline-flex bg-white bg-opacity-5 rounded-[22px] py-2 items-center px-5 gap-1'
      >
        <Image src={ShareHollow} width={40} height={40} alt='share' />
      </div>
      {showModal && <ShareModal setShowShareModal={setShowModal} />}
    </>
  );
};
