'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import VodListViewMore from '../vodListViewMore';
import { VideoHorizontalCard } from './videoHorizontalCard';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Spinner } from '../spinner';
import { getTypePage } from '@/app/actions';
import { usePathname } from 'next/navigation';
import SingletonAdsBanner from '../ads/singletonAdsBanner';
// import { AdsBanner } from '../ads/adsBanner';

export const VideoWithTitleHorizontalCard = ({
  navId,
  platform = 'web',
}) => {
  const [categories, setCategories] = useState(null);
  const [nextPage, setNextPage] = useState(1);
  const [stillCanLoad, setStillCanLoad] = useState(true);
  const pathName = usePathname();

  const targetRef = useRef(null);

  //banner ads
  // const initAdsList = JSON.parse(sessionStorage.getItem('adsList'));
  // const [adsList, setAdsList] = useState([]);
  // const getAllAds = async () => {
  //   return YingshiApi2(URL_YINGSHI_VOD.getAllAds, {}, { method: 'GET' });
  // };
  // const initAds = async () => {
  //   let allAds = await getAllAds();
  //   sessionStorage.setItem('adsList', JSON.stringify(allAds.data));

  //   setAdsList(allAds.data);
  // };
  // useLayoutEffect(() => {
  //   let adsList = initAdsList;
  //   if (!adsList) {
  //     adsList = JSON.parse(sessionStorage.getItem('adsList'));
  //   }

  //   if (adsList && adsList !== 'undefined') {
  //     setAdsList(adsList);
  //   } else {
  //     initAds();
  //   }
  // }, []);
  //end banner ads

  useEffect(() => {
    if (stillCanLoad) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // setIsVisible(entry.intersectionRatio >= 0.5);
          if (entry.intersectionRatio >= 0.5) {
            getCategories();
          }
        },
        {
          threshold: 0.5, // 50% visibility threshold
        }
      );

      if (targetRef.current) {
        observer.observe(targetRef.current);
      }

      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }
  }, [nextPage, stillCanLoad]);

  const getCategories = () => {
    let currentPage = nextPage;
    getTypePage(navId, currentPage).then((data) => {
      if ((data?.categories?.length ?? 0) < 10) {
        setStillCanLoad(false);
      }

      if (data?.categories !== undefined) {
        if (nextPage > 1) {
          setCategories((prev) => [...prev, ...data.categories]);
        }else{
          setCategories(data.categories);
        }
      }

      setNextPage(currentPage + 1);
    });
  };

  return (
    <>
      {categories != [] &&
        categories?.map((category, idx) => {
          if (platform === 'mobile') {
            return (
              <div
                id={category.type_id}
                key={idx}
                style={{ paddingTop: '1rem' }}
              >
                <div className='flex justify-between'>
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      fontStyle: 'normal',
                      fontFamily: 'PingFang SC',
                    }}
                  >
                    {category.type_name}
                  </span>
                  <div className='flex w-fit items-center cursor-pointer hover-yellow'>
                    <VodListViewMore type={'xcategory'} data={category} />
                    {/* <FontAwesomeIcon
                      style={{
                        fontSize: '14px',
                        fontWeight: '400',
                        fontStyle: 'normal',
                        fontFamily: 'PingFang SC',
                      }}
                      icon={faAngleRight}
                    /> */}
                  </div>
                </div>
                <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-5 py-2'>
                  {category.vod_list?.slice(0, 6).map((vod, i) => {
                    return (
                      <VideoHorizontalCard
                        vod={vod}
                        key={i}
                        typepage_id={navId}
                      />
                    );
                  })}
                  {(idx + 1) % 3 === 0 && (
                    <div className='col-span-3 md:col-span-6 lg:col-span-6'>
                      <SingletonAdsBanner />
                      {/* <AdsBanner
                        adsList={adsList}
                        pathName={pathName}
                        height='500px'
                      /> */}
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            return (
              <div
                id={category.type_id}
                key={idx}
                style={{ paddingTop: '3rem' }}
              >
                <div className='flex justify-between'>
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      fontStyle: 'normal',
                      fontFamily: 'PingFang SC',
                    }}
                  >
                    {category.type_name}
                  </span>
                  <div className='flex w-fit items-center cursor-pointer hover-yellow'>
                    <VodListViewMore type={'xcategory'} data={category} />
                    {/* <FontAwesomeIcon
                      style={{
                        fontSize: '14px',
                        fontWeight: '400',
                        fontStyle: 'normal',
                        fontFamily: 'PingFang SC',
                      }}
                      icon={faAngleRight}
                    /> */}
                  </div>
                </div>
                <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-5 py-2'>
                  {category.vod_list?.slice(0, 6).map((vod, i) => {
                    return (
                      <VideoHorizontalCard
                        vod={vod}
                        key={i}
                        typepage_id={navId}
                      />
                    );
                  })}
                  {categories?.length === idx + 1 && !stillCanLoad && (
                    <div className='col-span-3 md:col-span-6 lg:col-span-6 flex justify-center'>
                      <span className='test-xs text-muted'>没有更多了</span>
                    </div>
                  )}
                  {((idx + 1) % 3 === 0 ||
                    (categories.length === idx + 1 && !stillCanLoad)) && (
                    <div className='col-span-3 md:col-span-6 lg:col-span-6'>
                      <SingletonAdsBanner />
                      {/* <AdsBanner
                        adsList={adsList}
                        pathName={pathName}
                        height='500px'
                      /> */}
                    </div>
                  )}
                </div>
              </div>
            );
          }
        })}
      <div ref={targetRef}>
        {stillCanLoad && navId == 99 && <Spinner></Spinner>}
      </div>
    </>
  );
};
