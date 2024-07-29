'use client';
import { LoadingPage } from '@/components/loading';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import { YingshiApi } from '@/util/YingshiApi';
import styles from './style.module.css';
import { VideoHorizontalCard } from '@/components/videoItem/videoHorizontalCard';
import { Spinner } from '@/components/spinner';
import TopicHeader from './../../../../components/topicHeader';
import SingletonAdsBanner from '@/components/ads/singletonAdsBanner';
export default function Page() {
  const params = useParams();
  const xvodId = params.xvodId;
  const xvodClass = params.xvodClass;

  const [vods, setVods] = useState([]);
  const [stillCanLoad, setStillCanLoad] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const targetRef = useRef(null);

  const getXVodListApi = async () => {
    return YingshiApi(
      URL_YINGSHI_VOD.getXVodDetails +
        '?limit=30&page=' +
        nextPage +
        '&vod_source_name=' +
        xvodId +
        '&class=' +
        xvodClass,
      {},
      { method: 'GET' }
    );
  };

  const getXVodList = async () => {
    let currentPage = nextPage;
    const xVodListing = await getXVodListApi(nextPage);

    if (nextPage > 1) {
      setVods((prev) => [...prev, ...xVodListing.List]);
    } else {
      setVods(xVodListing.List);
    }

    if (nextPage > xVodListing.TotalPageCount - 1) {
      setStillCanLoad(false);
    } else {
      setStillCanLoad(true);
      setNextPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (stillCanLoad) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.5) {
            getXVodList();
            // console.log('Element is at least 50% visible.');
          } else {
            // console.log('Element is not yet 50% visible.');
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

  return (
    <>
      <div
        className='w-full grow  justify-center '
        style={{ display: 'block' }}
      >
        <div className='mobile'>
          <TopicHeader topicName={decodeURIComponent(xvodClass)} />
          {/* <div style={{ height: '52px' }}></div> */}
        </div>

        <div>
          <div className='container'>
            <SingletonAdsBanner />
          </div>
          {/* <div className={`${styles.containerHeader} desktop`}></div> */}

          <div
            className='d-flex container pb-6'
            style={{ flexDirection: 'column' }}
          >
            <div className='text-xl desktop'>
              {decodeURIComponent(xvodClass)}
            </div>
            <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 '>
              {vods != [] &&
                vods?.map((vod, idx) => {
                  return (
                    <>
                      <VideoHorizontalCard
                        vod={vod}
                        key={idx}
                        typepage_id={99}
                      />
                      {vods.length === idx + 1 && !stillCanLoad && (
                        <div className='col-span-3 md:col-span-5 lg:col-span-6 flex justify-center'>
                          <span className='test-xs text-muted'>没有更多了</span>
                        </div>
                      )}
                      {/* {((idx + 1) % 30 === 0 || vods.length === idx + 1 && !stillCanLoad) && (
                        <div className='col-span-3 md:col-span-5 lg:col-span-6'>
                          <SingletonAdsBanner />
                        </div>
                      )} */}
                      {(vods.length === idx + 1 && !stillCanLoad) && (
                        <div className='col-span-3 md:col-span-5 lg:col-span-6'>
                          <SingletonAdsBanner />
                        </div>
                      )} 
                    </>
                  );
                })}
            </div>
          </div>
        </div>

        {/* loading spinner  */}
        <div ref={targetRef}>
          {stillCanLoad && (
            <div className=' items-center justify-center flex-col my-6 py-6'>
              <Spinner></Spinner>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
