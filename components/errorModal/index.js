import { setShowErrorModal } from '@/store/common';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Attention } from '@/asset/icons';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { isWeb } from '@/util/common';

export default function ErrorModal() {
  const showErrorModal = useSelector((s) => s.common.errorModal);
  if (!showErrorModal) return null;
  return isWeb() ? (
    <ErrorModalComp />
  ) : (
    <FullPageContent className='bg-transparent z-50'>
      <ErrorModalComp />
    </FullPageContent>
  );
}

const ErrorModalComp = () => {
  const { title, message, attention } = useSelector(
    (s) => s.common.errorModalProps
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div
      className={`${
        isWeb() ? 'fixed w-[28rem]' : 'absolute  left-0'
      } mx-5 z-50 top-0 bottom-0 right-0 flex flex-col items-center justify-center flex-1`}
    >
      <div className='gap-3 flex flex-col py-8 px-10 items-center justify-center flex-initial backdrop-blur-lg rounded bg-[#191A1D80] text-white text-lg font-semibold'>
        {attention && (
          <Image src={Attention} alt='attention' width={54} height={54} />
        )}
        <div className=' opacity-90'>{title}</div>
        <div className=' opacity-90 text-center'>{message}</div>
        <button
          className='px-5 py-1 tayagradient rounded-lg'
          onClick={() => dispatch(setShowErrorModal(false))}
        >
          {t('ok')}
        </button>
      </div>
    </div>
  );
};
