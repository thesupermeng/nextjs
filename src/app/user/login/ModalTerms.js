import FullScreenModal from '@/components/FullScreenModal';
import { CrossWhite } from '@/asset/icons';
import Image from 'next/image';
import { TermsAndCondition } from '@/componentsH5/bottomSlideSheet.js/TermsAndCondition';

export const ModalTerms = ({ setShowModal, onAgree }) => {
  const onAgreeCall = (e) => {
    setShowModal(false);
    onAgree(e);
  };
  return (
    <FullScreenModal>
      <div className='relative flex self-stretch flex-1 my-20 mx-40 bg-[#121212E5] rounded-xl py-10 flex-col overflow-hidden'>
        <div className='flex-initial flex flex-row items-center justify-between mt-3 mb-1 '></div>
        <TermsAndCondition onAgree={onAgreeCall} />
      </div>
    </FullScreenModal>
  );
};
