'use client';
import styles from './style.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PlayRightIcon } from '@/asset/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const CarouselListing = ({
  carouselIndex,
  carouselItems,
  onHover,
  onUnhover,
}) => {
  const router = useRouter();
  const [fadeState, setFadeState] = useState('fade-in');
  const [previousIndex, setPreviousIndex] = useState(carouselIndex);

  const getDesc = (item) => {
    let desc = ' | ' + item.carousel_vod_area;
    let vodClass = [];
    if (item.carousel_vod_class != null) {
      vodClass = item.carousel_vod_class.split(',');
    }
    vodClass = vodClass.slice(0, 2);
    vodClass.forEach((item, i) => {
      desc += ' | ' + item;
    });

    return desc;
  };

  useEffect(() => {
    if (carouselIndex !== previousIndex) {
      setFadeState('fade-out');
      const timeout = setTimeout(() => {
        setPreviousIndex(carouselIndex);
        setFadeState('fade-in');
      }, 200); // Match the CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [carouselIndex]);

  return (
    <div
      className='desktop d-flex'
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '10px',
        color: '#fff',
        zIndex: 1,
        width: '100%',
      }}
    >
      <div className='flex container'>
        <div className={`col pt-3 ${styles[fadeState]}`}>
          <p className='text-lg'>
            {carouselItems[previousIndex].carousel_name}
          </p>
          <p className='text-sm pt-1' style={{ fontWeight: '200' }}>
            {carouselItems[previousIndex].carousel_vod_year}
            {getDesc(carouselItems[previousIndex])}
          </p>
          <p className='text-sm pt-1' style={{ fontWeight: '200' }}>
            {carouselItems[previousIndex].carousel_vod_remarks}
          </p>
          {carouselItems[previousIndex]?.carousel_id != 0 && (
            <div
              style={{
                cursor: 'pointer',
                background: '#FFFFFF2E',
                width: 'fit-content',
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                marginTop: '0.5rem',
              }}
              onClick={(e) => {
                e.preventDefault();
                if (carouselItems[previousIndex].carousel_content_id == 0) {
                  window.open(carouselItems[previousIndex].ads_url, '_blank');
                  return;
                } else {
                  router.push(
                    `/vod/play/id/${carouselItems[previousIndex].carousel_content_id}/sid/${carouselItems[previousIndex].carousel_vod_type_id}/nid/1`
                  );
                }
              }}
              className='flex flex-row flex-wrap hover-effect'
            >
              <Image
                style={{ paddingRight: '0.5rem' }}
                src={PlayRightIcon}
                alt='Icon'
              />
              <div className='text-sm'>看正片</div>
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            zIndex: '10',
            width: '80%',
            justifyContent: 'flex-end',
          }}
        >
          {carouselItems.map((previewItem, previewIndex) => (
            <div
              key={previewItem.carousel_content_id + '-key'}
              className='hidden xl:flex'
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                justifySelf: 'center',
                height: '100%',
                width: '6rem',
                marginRight: '1rem',
                cursor: 'pointer',
              }}
              onMouseEnter={() => onHover(previewIndex)}
              onMouseLeave={() => onUnhover(previewIndex)}
            >
              <div style={{ width: '100%', textAlign: 'center' }}>
                <img
                  className={styles.carousel_item_card}
                  src={previewItem.carousel_vod_pic}
                  alt={`Slide ${previewIndex}`}
                  style={{
                    width: '100%',
                    aspectRatio: '5/7',
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (previewItem.carousel_content_id == 0) {
                      window.open(previewItem.ads_url, '_blank');
                      return;
                    }
                    router.push(
                      `/vod/play/id/${previewItem.carousel_content_id}/sid/${previewItem.carousel_vod_type_id}/nid/1`
                    );
                  }}
                />
              </div>
              <div
                key={previewIndex + '-3'}
                style={{
                  paddingRight: '10px',
                  paddingLeft: '10px',
                  textAlign: 'center',
                  fontSize: '12px',
                  paddingTop: '6px',
                }}
              >
                {/* {renderShortString(previewItem.carousel_name)} */}
                <p className='line-clamp-1'>{previewItem.carousel_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
