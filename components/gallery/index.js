import { NoDataSearch } from '@/asset/icons';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import GalleryItem from './galleryItem';
import ZoomLayer from './zoomLayer';

export default function Gallery({ data, selected }) {
  const [showGallery, setShowGallery] = useState(false);
  const current = useRef(null);
  const { t } = useTranslation();

  const handleGalleryClick = (index) => {
    current.current = index;
    setShowGallery(!showGallery);
  };

  const filteredData = data?.filter((d) =>
    selected === 0 ? d.type === 0 : d.type === 2
  );

  return (
    <>
      {filteredData?.length > 0 ? (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(0,200px))] px-10 gap-3'>
          {filteredData?.map((filteredData, index) => (
            <GalleryItem
              data={filteredData}
              key={index}
              handleGalleryClick={() => {
                handleGalleryClick(index);
              }}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center flex-1 gap-2 py-20'>
          <Image src={NoDataSearch} alt='nodata' width={80} height={80} />
          <p className='text-[#6F7076] text-[18px] font-[Inter]'>
            {t('noData')}
          </p>
        </div>
      )}
      {showGallery && (
        <ZoomLayer
          data={data}
          handleGalleryClick={handleGalleryClick}
          current={current}
        />
      )}
    </>
  );
}
