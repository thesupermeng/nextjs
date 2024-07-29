'use client';
import styles from './../../../style.module.css';
import TopicHeader from '@/components/topicHeader';
import VodItemDesktop from '@/components/vodItemDesktop';
import VodItemMobile from '@/components/vodItemMobile';
import { YingshiApi, YingshiApi2 } from '@/util/YingshiApi';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import SingletonAdsBanner from '@/components/ads/singletonAdsBanner';
// import { AdsBanner } from '@/components/ads/adsBanner';

export default function TopicDetails() {
  const { topicId } = useParams();
  const [topicObj, setTopicObj] = useState(null);
  const pathName = usePathname();

  const getTopicDetailsApi = async () => {
    return YingshiApi(
      URL_YINGSHI_VOD.playlistGetTopicDetail + '?id=' + topicId,
      {},
      { method: 'GET' }
    );
  };

  const getTopicDetails = async () => {
    console.log('topicId');
    console.log(topicId);

    let res = await getTopicDetailsApi();
    setTopicObj(res);
    console.log('res');
    console.log(res);
  };

  useEffect(() => {
    getTopicDetails();
  }, []);

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
  //     console.log('adsList 111');
  //     console.log(adsList);
  //     setAdsList(adsList);
  //   } else {
  //     initAds();
  //   }
  // }, []);
  //end banner ads

  return (
    <>
      {topicObj && (
        <>
          {/* desktop view */}
          <div className='desktop'>
            <div className={styles.containerHeader}>
              <div className='d-flex' style={{ width: '100%' }}>
                <div className='overlay' style={{ width: '100%' }}>
                  <div className='container px-0 d-flex flex-col'>
                    <div className=' w-full container'>
                      <SingletonAdsBanner />
                      {/* <AdsBanner
                        adsList={adsList}
                        pathName={pathName}
                        height='500px'
                      /> */}
                    </div>
                    <div className='w-fit'>
                      <div className='topic-header-text'>
                        {topicObj.topic_name}
                      </div>
                    </div>

                    <div className='w-fit'>
                      <div className='topic-header-text-sub'>
                        {topicObj.topic_blurb}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='d-flex container pt-3' style={{ width: '100%' }}>
              <div className='topic-header-text-sub'>
                (共{topicObj?.vod_list?.length || 0}部)
              </div>
            </div>

            <div className='d-flex container pt-3' style={{ width: '100%' }}>
              <div className='row'>
                {topicObj?.vod_list?.map((vod, index) => (
                  <VodItemDesktop vod={vod} key={index} />
                ))}
              </div>
            </div>
            <div className=' w-full container'>
              <SingletonAdsBanner />
              {/* <AdsBanner adsList={adsList} pathName={pathName} height='500px' /> */}
            </div>
          </div>

          {/* mobile view */}
          <div className='mobile pb-6'>
            <TopicHeader topicName={topicObj.topic_name} />
            <div className='container'>
              {/* mobile content */}
              <div className='topic-header-text-sub mt-3'>
                {topicObj.topic_blurb}
              </div>

              <div className=' w-full'>
                <SingletonAdsBanner />
                {/* <AdsBanner
                  adsList={adsList}
                  pathName={pathName}
                  height='500px'
                /> */}
              </div>

              <div className='topic-header-text-sub mt-3'>
                (共{topicObj?.vod_list?.length || 0}部)
              </div>
              {/* mobile vod list  */}
              <div className='row mt-2'>
                {topicObj?.vod_list?.map((vod, index) => (
                  <VodItemMobile vod={vod} key={index} />
                ))}
              </div>
            </div>
            <div className=' w-full container'>
              <SingletonAdsBanner />
              {/* <AdsBanner adsList={adsList} pathName={pathName} height='500px' /> */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
