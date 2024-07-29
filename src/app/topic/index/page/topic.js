'use client';
import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  Fragment,
} from 'react';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import { YingshiApi, YingshiApi2 } from '@/util/YingshiApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/spinner';
// import { AdsBanner } from '@/components/ads/adsBanner.js';
import styles from '../../style.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTopicListApi } from '@/app/actions';
import SingletonAdsBanner from '@/components/ads/singletonAdsBanner';

export const Topic = () => {
  const [topicList, setTopicList] = useState([]);
  const [stillCanLoad, setStillCanLoad] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const pathName = usePathname();
  const targetRef = useRef(null);
  const router = useRouter();

  //banner ads
  // const initAdsList = JSON.parse(sessionStorage.getItem('adsList'));
  // const [adsList, setAdsList] = useState(null);
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
  //     console.log('adsList 111');
  //     console.log(adsList);
  //     setAdsList(adsList);
  //   } else {
  //     initAds();
  //   }
  // }, []);
  //end banner ads

  const getTopicList = async () => {
    let currentPage = nextPage;
    const topicListing = await getTopicListApi(nextPage);
    // console.log(topicListing);

    if (nextPage > 1) {
      setTopicList((prev) => [...prev, ...topicListing.List]);
    } else {
      setTopicList(topicListing.List);
      setTotalPageCount(topicListing.TotalPageCount);
    }

    if (nextPage > topicListing.TotalPageCount - 1) {
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
            getTopicList();
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
      <div className='flex flex-col'>
        {/* desktop view  */}
        <div className='desktop'>
          <div className={styles.containerHeader}>
            <div className='d-flex' style={{ width: '100%' }}>
              <div className='overlay' style={{ width: '100%' }}>
                {/* topic list  */}

                {/* {(adsList  )&& */}
                <div className='container'>
                  <SingletonAdsBanner />
                  {/* <AdsBanner adsList={adsList} pathName={pathName} height='500px' /> */}
                </div>
                {/* } */}

                <div className=' container px-0 d-flex flex-col'>
                  <div className='w-fit'>
                    <div className='topic-header-text w-fit'>播单</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='d-flex container pb-6 pt-6'>
            <div className='flex grid 2xl:grid-cols-3 grid-cols-2 gap-4'>
              {topicList.map((topic, idx) => (
                <Fragment key={topic.topic_id}>
                  <div className='pt-0.5'>
                    <Link href={`/topic/detail/id/${topic.topic_id}`}>
                      <div className='w-full'>
                        <div className='d-flex topic-card'>
                          <div
                            style={{
                              padding: '10px',
                              width: '123px',
                              borderRadius: '10px',
                            }}
                          >
                            <img
                              alt='topic items'
                              className={`object-cover`}
                              src={topic?.vod_list[0].vod_pic}
                              style={{
                                borderRadius: '10px',
                                width: '123px',
                                height: '170px',
                              }}
                            />
                          </div>
                          <div className='col d-flex flex-column justify-content-between'>
                            <div>
                              <div className='text-base font-bold pb-2'>
                                {topic.topic_name}
                              </div>
                              <div className='text-xs topic-blurb'>
                                {topic.topic_blurb.length > 105
                                  ? `${topic.topic_blurb.substring(0, 105)}...`
                                  : topic.topic_blurb}
                              </div>
                              <div className='text-primary pt-4 text-xs'>
                                查看更多 <FontAwesomeIcon icon={faAngleRight} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {topicList.length === idx + 1 &&
                    !stillCanLoad &&
                    nextPage == totalPageCount && (
                      <div className='2xl:col-span-3 col-span-2 justify-center flex'>
                        <span className='test-xs text-muted'>没有更多了</span>
                      </div>
                    )}
                  {((idx + 1) % 12 === 0 ||
                    (topicList.length === idx + 1 && !stillCanLoad)) && (
                    <div className='2xl:col-span-3 col-span-2'>
                      <SingletonAdsBanner />
                      {/* <AdsBanner
                        adsList={adsList}
                        pathName={pathName}
                        height='500px'
                      /> */}
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* mobile  view  */}
        <div className='mobile'>
          <div className='w-screen px-[10px]'>
            {/* <div className=' w-full'> */}
            <SingletonAdsBanner />
            {/* <AdsBanner adsList={adsList} pathName={pathName} height='500px' /> */}
            {/* </div> */}
            {topicList.map((topic, idx) => (
              <>
                <div className='w-full' key={topic.topic_id}>
                  <Link
                    className='mb-2 cursor-pointer'
                    // key={topic.topic_id}
                    href={`/topic/detail/id/${topic.topic_id}`}
                  >
                    <div className='col-12 pt-2 d-flex justify-content-between align-items-center pb-1 font-semibold'>
                      <span>{topic.topic_name}</span>
                      <span className='mr-2'>
                        {' '}
                        <FontAwesomeIcon icon={faAngleRight} />
                      </span>
                    </div>

                    <div className='col-12 mobile-topic-desc'>
                      {topic.topic_blurb.length > 52
                        ? `${topic.topic_blurb.slice(0, 52)}...`
                        : topic.topic_blurb}
                    </div>

                    <div className='col-12' key={topic.topic_id}>
                      <div className='row g-2'>
                        {topic?.vod_list?.slice(0, 3).map((vod) => (
                          <div
                            className='col-4 cursor-pointer'
                            key={vod.vod_id}
                            onClick={(e) => {
                              e.preventDefault();
                              router.push(
                                `/vod/play/id/${vod.vod_id}/sid/${vod.type_id}/nid/1`
                              );
                            }}
                          >
                            {' '}
                            {/* Add px-1 class for horizontal padding */}
                            <img
                              alt='topic items'
                              className={`object-cover w-100`}
                              src={vod?.vod_pic}
                              style={{
                                borderRadius: '10px',
                                aspectRatio: '5/7',
                                width: '100%',
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
                {topicList.length === idx + 1 &&
                  !stillCanLoad &&
                  nextPage == totalPageCount && (
                    <div className='2xl:col-span-3 col-span-2 justify-center flex'>
                      <span className='test-xs text-muted'>没有更多了</span>
                    </div>
                  )}
                {((idx + 1) % 3 == 0 ||
                  (topicList.length === idx + 1 && !stillCanLoad)) && (
                  <SingletonAdsBanner />
                  // <AdsBanner
                  //   pathName={pathName}
                  //   navId={'1-13'}
                  //   height='500px'
                  // />
                )}
              </>
            ))}
          </div>
        </div>

        {/* loading spinner  */}
        <div ref={targetRef}>{stillCanLoad && <Spinner></Spinner>}</div>
      </div>
    </>
  );
};
