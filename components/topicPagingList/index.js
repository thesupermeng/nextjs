'use client';
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import VodListViewMore from '../vodListViewMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { VideoVerticalCard } from '../videoItem/videoVerticalCard';
// import { AdsBanner } from '../ads/adsBanner';
import { Spinner } from '../spinner';
import { getTopicListApi } from '@/app/actions';
import { YingshiApi2 } from '@/util/YingshiApi';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import SingletonAdsBanner from '../ads/singletonAdsBanner';
const TopicPagingList = ({ list, navId }) => {
  const [topicList, setTopicList] = useState(null);
  const [combineList, setCombineList] = useState(list);
  const [nextPage, setNextPage] = useState(1);
  const [stillCanLoad, setStillCanLoad] = useState(navId == 0 ? true : false);
  const targetRef = useRef(null);
  // //banner ads
  // const [adsList, setAdsList] = useState([]);
  // const getAllAds = async () => {
  //   return YingshiApi2(URL_YINGSHI_VOD.getAllAds, {}, { method: 'GET' });
  // };
  // const initAds = async () => {
  //   let allAds = await getAllAds();
  //   sessionStorage.setItem('adsList', JSON.stringify(allAds.data));
  //   console.log('init')
  //   console.log(allAds.data)
  //   setAdsList(allAds.data);
  // };
  // useEffect(() => {
  //   let adsList = sessionStorage.getItem('adsList');
  //   adsList = JSON.parse(adsList);
  //   if (adsList && adsList !== 'undefined') {
  //     setAdsList(adsList);

  //   } else {
  //     initAds();
  //   }
  // }, []);
  // //end banner ads

  useEffect(() => {
    if (stillCanLoad) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // setIsVisible(entry.intersectionRatio >= 0.5);
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

  const getTopicList = () => {
    let listing = combineList;
    let currentPage = nextPage;
    getTopicListApi(currentPage).then((data) => {
      console.log(data.List);
      data.List.map((item, index) => {
        listing.push({
          type: 'topic',
          id: item.topic_id,
          type_name: item.topic_name,
          vod_list: item.vod_list,
        });
      });

      setCombineList(listing);
      // if (nextPage > 1) {
      //   setTopicList((prev) => [...prev, ...data.List]);
      // } else {
      //   setTopicList(data.List);
      // }

      if (nextPage > data.TotalPageCount - 1) {
        setStillCanLoad(false);
      } else {
        setStillCanLoad(true);
        setNextPage(currentPage + 1);
      }
    });
  };

  return (
    <>
      {combineList != null &&
        combineList?.map((item, idx) => {
          return (
            <Fragment key={idx}>
              <div id={item.id}  className={'pt-3'}>
                <div className='flex justify-between'>
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      fontStyle: 'normal',
                      fontFamily: 'PingFang SC',
                    }}
                  >
                    {item.type_name}
                  </span>

                  {item.type != 'yunying' && (
                    <div className='flex w-fit items-center cursor-pointer hover-yellow'>
                      <VodListViewMore type={item.type} data={item} />
                    </div>
                  )}
                </div>
                <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-x-5 gap-y-2 py-2'>
                  {item.vod_list?.slice(0, 6).map((vod, i) => {
                    return <VideoVerticalCard vod={vod} key={i} />;
                  })}
                </div>
              </div>
              {(combineList?.length === idx + 1 && !stillCanLoad && navId == 0) && (
                    <div className='flex justify-center'>
                      <span className='test-xs text-muted'>没有更多了</span>
                    </div>
                  )}
              {((idx + 1) % 2 === 0 ||
                (combineList?.length === idx + 1 && !stillCanLoad)) && (
                <div className='w-[100%]'>
                  <SingletonAdsBanner />
                  {/* <AdsBanner
                  adsList={adsList}
                  pathName={pathName}
                  height='500px'
                /> */}
                </div>
              )}
            </Fragment>
          );
        })}
      <div ref={targetRef}>
        {stillCanLoad && navId == 0 && <Spinner></Spinner>}
      </div>
    </>
  );
};

export default TopicPagingList;
