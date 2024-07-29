'use client';
import Footer from '@/components/Footer';
import LabelHeader from '@/componentsH5/headerH5/LabelHeader';
import { NavFooter } from '@/componentsH5/NavFooter/NavFooter';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { LiveTypes } from './liveTypes/LiveTypes';
import { useOffsetPosition } from '@/hook/useOffsetPosition';

export const PageH5 = ({ children }) => {
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const { checkOffset } = useOffsetPosition();

  const onTypeChange = (type) => {
    router.push(`/live/${type.id}`);
  };

  return (
    <>
      <div className='flex flex-col flex-1'>
        <LabelHeader label={t('live')} />
        <div
          style={{ top: `${checkOffset(5)}rem` }}
          className={`no-scrollbar common-transition py-2 fixed bg-black w-full flex flex-row flex-initial gap-3 px-5 mt-2 overflow-x-auto z-10`}
        >
          <LiveTypes selectedId={params.type} onTypeChange={onTypeChange} />
        </div>

        <div
          style={{ marginTop: `${checkOffset(8)}rem` }}
          className={`px-3 bg-[#121212] overflow-y-auto`}
          // className={`overflow-y-auto flex-[1_0_0] z-10 mt-2 px-3 bg-[#121212]`}
        >
          {children}
          <Footer />
        </div>
      </div>
      <NavFooter />
    </>
  );
};
