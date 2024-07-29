'use client';
import './i18n';
import { LoadingPage } from '@/components/loading';
import { VideoVerticalCard } from '@/components/videoItem/videoVerticalCard';
import { VideoHorizontalCard } from '@/components/videoItem/videoHorizontalCard';
// import { AdsBanner } from '@/components/ads/adsBanner.js';
export const RightBetCartWidth = 'w-[32rem]';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from '@/components/carousel/carousel';
import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { YingshiApi2, getIPAddress2 } from '@/util/YingshiApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import { YingshiApi } from '@/util/YingshiApi';
import { getTypePage, getTopicListApi } from '@/app/actions';
import VodListViewMore from '@/components/vodListViewMore';
import TopicPagingList from '@/components/topicPagingList';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { VideoWithTitleHorizontalCard } from '@/components/videoItem/videoWithTitleHorizontalCard';
import { setIsUserChina } from '@/store/yingshiScreen';

import {
  faChevronUp,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import SingletonAdsBanner from '@/components/ads/singletonAdsBanner';

const splitArrayIntoChunks = (array, chunkSize) => {
  let results = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
};

const getHeaderMenu = (state) => state.headerMenu;
export default function Home(params) {
  const dispatch = useDispatch();

  let paramsInput = params.category == undefined ? 0 : params.category;
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [classList, setClassList] = useState([]);
  const [xClassList, setXClassList] = useState([]);
  const [xClassList2, setXClassList2] = useState([]);
  const [combineList, setCombineList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [yunying, setYunying] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [topicList, setTopicList] = useState(null);
  const [nextPage, setNextPage] = useState(0);

  const getIsUserChina = (state) => state.yingshiScreen.isUserChina;
  const isUserChina = useSelector(getIsUserChina);

  const headerMenu = useSelector(getHeaderMenu);

  const [headerMenuState, setHeaderMenuState] = useState(null);
  const [stillCanLoad, setStillCanLoad] = useState(
    paramsInput == 0 ? true : false
  );
  const [still99CanLoad, setStill99CanLoad] = useState(
    paramsInput == 99 ? true : false
  );

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  // //banner ads
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
    // console.log('headerMenu');
    // console.log(headerMenu.headerMenu);
    setHeaderMenuState(headerMenu.headerMenu);
  }, [headerMenu]);

  useEffect(() => {
    if (paramsInput == 99 && classList != []) {
      const mapList = {
        自拍偷拍: 'senlin',
        制服丝袜: 'senlin',
        cosplay: 'senlin',
        剧情介绍: 'senlin',
        瑜伽裤: 'senlin',
        风情旗袍: 'senlin',
        可爱学生: 'senlin',
        恋腿狂魔: 'senlin',
        闷骚护士: 'senlin',
        古装扮演: 'senlin',
        兽耳系列: 'senlin',
        野外露出: 'senlin',
        萝莉少女: 'senlin',
        台湾辣妹: 'senlin',
        唯美港姐: 'senlin',
        韩国御姐: 'senlin',
        换脸明星: 'naixx',
        抖阴短片: 'naixx',
        强奸乱伦: 'senlin',
        欺辱凌辱: 'senlin',
        口交颜射: 'senlin',
        多人多P: 'senlin',
        巨乳美乳: 'senlin',
        女同性恋: 'senlin',
        男同性恋: 'senlin',
        网红头条: 'aosika',
        网红流出: 'senlin',
        人妻熟女: 'senlin',
        女优系列: 'senlin',
        日韩主播: 'naixx',
        重口激情: 'naixx',
      };

      let tempList = [];

      for (let i = 0; i < classList.length; i++) {
        const item = classList[i];
        const mappedValue = mapList[item] || 'huanggua';
        tempList.push({ item, mappedValue });
      }

      // console.log(tempList); // For debugging: logs the array with mapped values
      setXClassList(tempList);

      const chunkSize = Math.ceil(tempList.length / 4);
      const chunkedArray = splitArrayIntoChunks(tempList, chunkSize);
      setXClassList2(chunkedArray);
      // console.log('chunkedArray');
      // console.log(chunkedArray);
    }
  }, [paramsInput, classList]);

  useLayoutEffect(() => {
    // init ip
    initIp();
  }, []);

  const initIp = async () => {
    let ipObj = await getIPAddress2();
    if (ipObj && ipObj.IPv4 && ipObj.country_code)
      sessionStorage.setItem('ipAddress', ipObj.IPv4);
    dispatch(setIsUserChina(ipObj));
  };

  // useEffect(() => {
  //   console.log('isUserChina')
  //   console.log(isUserChina)
  // }, [isUserChina]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getTypePage(paramsInput),
      stillCanLoad && paramsInput == 0 && getTopicListApi(nextPage),
    ]).then(([typePageData, topicListData]) => {
      if (typePageData) {
        // if (paramsInput == 99) {
        //   setClassList(typePageData.class_list);
        // }
        setClassList(typePageData.class_list);
        // console.log('class_list');
        // console.log(typePageData.class_list);
        setCategories(typePageData.categories);
        setYunying(typePageData.yunying);

        let newList = [];
        if (typePageData.yunying?.length > 0) {
          typePageData.yunying.map((item, index) => {
            newList.push({
              type: 'yunying',
              id: -1,
              type_name: item.type_name,
              vod_list: item.vod_list,
            });
          });
        }
        if (typePageData.categories?.length > 0) {
          typePageData.categories.map((item, index) => {
            newList.push({
              type: 'category',
              id: item.type_id,
              type_name: item.type_name,
              vod_list: item.vod_list,
            });
          });
        }

        setCombineList(newList)

        setCarousel(typePageData.carousel);
      } else if (paramsInput == 99 && typePageData === undefined) {
        setStill99CanLoad(false);
      }

      if (topicListData) {
        let currentPage = nextPage;

        if (nextPage > 1) {
          try {
            setTopicList((prev) => [...prev, ...topicListData.List]);
          } catch (e) {
            console.log(e);
            // console.log('crash');
            // console.log(topicList);
            setTopicList(topicListData.List);
          }
        } else {
          setTopicList(topicListData.List);
        }
        if (nextPage > topicListData.TotalPageCount - 1) {
          setStillCanLoad(false);
        } else {
          setStillCanLoad(true);
          setNextPage(currentPage + 1);
        }
      }

      setIsLoading(false);
    });
  }, []);

  return (
    <div
      className='flex flex-1 justify-start flex-col'
      style={{ width: '100%' }}
    >
      {isLoading ? (
        <div>
          <LoadingPage full={true} />
        </div>
      ) : (
        <>
          {paramsInput != 99 ? (
            <div className='flex flex-col w-full'>
              <Carousel
                // adsList={adsList}
                carouselItemsProps={carousel}
                pathName={pathName}
              />
              <div className='container w-[100%]'>
                <SingletonAdsBanner />
                {/* <AdsBanner
                  adsList={adsList}
                  pathName={pathName}
                  height='500px'
                /> */}
              </div>
              {classList != [] &&
                paramsInput != 99 &&
                headerMenuState &&
                classList && (
                  <div
                    className='container w-full overflow-x-auto max-w-full'
                    style={{
                      display: 'flex',
                      overflowX: 'auto',
                      scrollbarWidth: 'none',
                      padding: '10px 8px 10px 8px',
                    }}
                  >
                    <>
                      <Link
                        href={`/vod/show/by/time/id/${paramsInput}`}
                        className='btn btn-dark hover-effect text-white btn-dark-catagory'
                        style={{ flex: '0 0 auto', borderRadius: '10px' }}
                      >
                        全部
                        {/* {headerMenuState.id[paramsInput]?.name} */}
                        {
                          headerMenuState.find(
                            (item) => item.id === paramsInput
                          )?.name
                        }
                      </Link>
                    </>

                    {
                      classList != [] &&
                        paramsInput != 99 &&
                        classList &&
                        classList?.map((cItem, cIndex) => {

                            let href = `/vod/show/by/time/class/${cItem}/id/${paramsInput}`

                            if(cItem == '短剧')
                            {
                              href = '/vod/show/by/time/id/46'
                            }

                          return (
                            <Link
                              href={href}
                              key={cIndex + '-class'}
                              className='btn btn-dark hover-effect text-white btn-dark-catagory text-nowrap'
                              style={{ borderRadius: '10px' }}
                            >
                              {cItem} 
                            </Link>
                          );
                        }) //class list map
                    }
                  </div>
                )}

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* md:mx-20 mx-2.5  lg:w-[80%]*/}
                <div className='container w-[100%]'>
                  {/* {yunying != [] &&
                    yunying?.map((yy, idx) => {
                      return (
                        <div key={idx} className='lg:pt-3'>
                          <div className='flex justify-between'>
                            <span
                              style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                fontStyle: 'normal',
                                fontFamily: 'PingFang SC',
                              }}
                            >
                              {yy.type_name}
                            </span>
                          </div>
                          <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-x-5 gap-y-2 py-2'>
                            {yy.vod_list?.slice(0, 6).map((vod, i) => {
                              return <VideoVerticalCard vod={vod} key={i} />;
                            })}
                          </div>
                        </div>
                      );
                    })}
                  {categories != [] &&
                    categories?.map((category, idx) => {
                      return (
                        <div key={idx} className={'pt-3'}>
                          {/* {idx % 2 !== 0 && (
                            <SingletonAdsBanner />
                            // <AdsBanner
                            //   pathName={pathName}
                            //   navId={'1-13'}
                            //   height='500px'
                            // />
                          )} 
                          <div id={category.type_id} key={idx}>
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
                                <VodListViewMore
                                  type={'category'}
                                  data={category}
                                />
                                <FontAwesomeIcon
                                  style={{
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    fontStyle: 'normal',
                                    fontFamily: 'PingFang SC',
                                  }}
                                  icon={faChevronRight}
                                />
                              </div>
                            </div>
                            <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-x-5 gap-y-2 py-2'>
                              {category.vod_list?.slice(0, 6).map((vod, i) => {
                                return <VideoVerticalCard vod={vod} key={i} />;
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })} */}
                  <TopicPagingList
                    list={combineList}
                    navId={paramsInput}
                  />
                </div>
              </div>
              {/* <div className='container w-[100%]'>
                <SingletonAdsBanner />
                <AdsBanner
                  adsList={adsList}
                  pathName={pathName}
                  height='500px'
                />
              </div> */}
            </div>
          ) : (
            <>
              {/* 午夜场 desktop   111111 */}
              <div className='desktop flex flex-col w-full'>
                {/* 午夜场 class  desktop */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className='row col-12 container pt-4 mt-5 px-0'>
                    {
                      // Assuming xClassList is defined and is an array
                      [
                        ...Array(
                          Math.ceil(Math.min(xClassList.length, 40) / 10)
                        ),
                      ].map((_, rowIndex) => {
                        const start = rowIndex * 10;
                        const end = Math.min(
                          start + 10,
                          Math.min(xClassList.length, 40)
                        );

                        return (
                          <div
                            className='d-flex flex-wrap justify-content-between w-100'
                            key={rowIndex}
                          >
                            {xClassList
                              .slice(start, end)
                              .map((cItem, cIndex) => (
                                <Link
                                  href={`/xvod/${cItem.mappedValue}/${cItem.item}`}
                                  key={`${start}-${end}-${cIndex}-xclass`}
                                  className='btn btn-dark hover-effect text-white btn-dark-catagory btn-dark-catagory-x text-nowrap mb-2'
                                  style={{
                                    borderRadius: '6px',
                                    width: 'calc(10% - 10px)',
                                  }} // Adjust width as needed
                                >
                                  {cItem.item}
                                </Link>
                              ))}
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
                {/* end 午夜场 class desktop */}
                <div className='container w-full'>
                  <SingletonAdsBanner />
                  {/* <AdsBanner
                    adsList={adsList}
                    pathName={pathName}
                    height='500px'
                  /> */}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className=' container  w-[100%]'>
                    <VideoWithTitleHorizontalCard
                      navId={paramsInput}
                      platform='web'
                    />
                  </div>
                </div>
              </div>
              {/* 午夜场 mobile   111111 */}
              <div className='mobile flex flex-col w-full'>
                {/* 午夜场 class  mobile */}
                <div
                  className='hide-scrollbar'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    justifyContent: 'center',
                    marginTop: '5px',
                    overflowX: 'auto', // Enable horizontal scrolling on the parent container
                    width: '100%', // Ensure the container takes full width
                    padding: '5px 0px 15px 10px',
                  }}
                >
                  {
                    // Assuming xClassList is defined and is an array
                    [
                      ...Array(Math.ceil(Math.min(xClassList.length, 40) / 10)),
                    ].map((_, rowIndex) => {
                      const start = rowIndex * 10;
                      const end = Math.min(
                        start + 10,
                        Math.min(xClassList.length, 40)
                      );

                      return (
                        <div
                          className='d-flex flex-wrap justify-content-start w-auto' // Adjust width to content width
                          key={rowIndex}
                          style={{ minWidth: '1190px', overflowX: 'auto' }} // Ensure each row can scroll horizontally independently
                        >
                          {xClassList.slice(start, end).map((cItem, cIndex) => (
                            <Link
                              href={`/xvod/${cItem.mappedValue}/${cItem.item}`}
                              key={`${start}-${end}-${cIndex}-xclass`}
                              className='btn btn-dark hover-effect text-white btn-dark-catagory btn-dark-catagory-x text-nowrap mb-2'
                              style={{
                                minWidth: '108px',
                                flexShrink: 0,
                                borderRadius: '6px',
                              }} // Adjust width as needed
                            >
                              {cItem.item}
                            </Link>
                          ))}
                        </div>
                      );
                    })
                  }
                </div>

                <div className='container w-full'>
                  <SingletonAdsBanner />
                  {/* <AdsBanner
                    adsList={adsList}
                    pathName={pathName}
                    height='500px'
                  /> */}
                </div>

                {/* end 午夜场 class mobile */}

                <div
                  className='flex flex-col'
                  style={{ justifyContent: 'center' }}
                >
                  {/* md:mx-20 mx-2.5  lg:w-[80%]*/}
                  <div className='pt-1 container  w-[100%]'>
                    <VideoWithTitleHorizontalCard
                      navId={paramsInput}
                      platform='mobile'
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
