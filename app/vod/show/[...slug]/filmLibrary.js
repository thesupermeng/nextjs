'use client';
import { searchEmptyIcon } from '@/asset/icons';
import { LoadingPage } from '@/components/loading';
import { VideoVerticalCard } from '@/components/videoItem/videoVerticalCard';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import { YingshiApi, YingshiApi2 } from '@/util/YingshiApi';
import Image from 'next/image';
import { useEffect, useState, useRef, useLayoutEffect, Fragment } from 'react';
import { Spinner } from '@/components/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useParams, usePathname, useRouter } from 'next/navigation';
// import { AdsBanner } from '@/components/ads/adsBanner.js';
import { useFilterTypeList, useSearchingListApi } from '@/util/swr';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import { isMobile } from 'react-device-detect';
import SingletonAdsBanner from '@/components/ads/singletonAdsBanner';

const getIsScroll = (state) => state.isScroll;
const getIsTop = (state) => state.isTop;

export const FilmLibrary = () => {
  const filterTypeList = useFilterTypeList();
  const [paramsFilter, setParamsFilter] = useState(null);
  const [initialLoading, setInitialLoading] = useState(!filterTypeList);
  const [collapse, setCollapse] = useState(false);
  const [buttonUncollapse, setButtonUncollapse] = useState(false);
  const isScrolling = useSelector(getIsScroll);
  const isAtTop = useSelector(getIsTop);

  const targetRef = useRef(null);
  const path = usePathname();
  const params = useParams();
  const router = useRouter();

  const { data, size, setSize } = useSearchingListApi(paramsFilter);
  const { isVip } = useYingshiUser();

  const videoList = data ? [].concat(...data) : [];
  const stillCanLoad = data && !(size > data[0].TotalPageCount - 1);
  const isLoadingMore =
    !data || (size > 0 && data && typeof data[size - 1] === 'undefined');

  const advanceFilterItem = [
    {
      text: '新上线',
      value: 'time',
    },
    {
      text: '热播榜',
      value: 'hits_day',
    },
    {
      text: '好评榜',
      value: 'score',
    },
  ];

  const getFilterParams = (path, filterTypeList) => {
    const filterParams = {};
    for (let i = 0; i < path.length; i += 2) {
      filterParams[path[i]] = decodeURIComponent(path[i + 1]);
    }

    const typeInfo = filterTypeList.find(
      (item) => item.type_id === parseInt(filterParams.id)
    );
    if (!typeInfo) {
      router.push('/404');
    }

    const {
      class: classList,
      area: areaList,
      lang: langList,
      year: yearList,
    } = typeInfo.type_extend_obj;

    const isValidClass = filterParams.class
      ? classList.split(',').includes(filterParams.class)
      : false;
    const isValidArea = filterParams.area
      ? areaList.split(',').includes(filterParams.area)
      : false;
    const isValidLang = filterParams.lang
      ? langList.split(',').includes(filterParams.lang)
      : false;
    const isValidYear = filterParams.year
      ? yearList.split(',').includes(filterParams.year)
      : false;

    return {
      order: 'desc',
      typeId: parseInt(filterParams.id),
      by: filterParams.by ? filterParams.by : advanceFilterItem[0].value,
      class: isValidClass ? filterParams.class : '全部类型',
      area: isValidArea ? filterParams.area : '全部地区',
      lang: isValidLang ? filterParams.lang : '全部语言',
      year: isValidYear ? filterParams.year : '全部时间',
    };
  };

  useEffect(() => {
    if (!isAtTop.res) {
      if (isMobile) {
        setCollapse(true);
      }
    } else {
      if (isMobile) {
        setCollapse(false);
      }
    }
  }, [isAtTop]);

  useEffect(() => {
    if (isScrolling.res) {
      if (isMobile) {
        if (buttonUncollapse) {
          setCollapse(true);
          setButtonUncollapse(false);
        }
      }
    }
  }, [isScrolling]);

  useLayoutEffect(() => {
    if (filterTypeList) {
      const filterParams = getFilterParams(params.slug, filterTypeList);
      setParamsFilter(filterParams);
    }
  }, [filterTypeList]);

  useEffect(() => {
    if (data) {
      setInitialLoading(false);
    }
  }, [paramsFilter, data]);

  useEffect(() => {
    if (stillCanLoad && !isLoadingMore) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.5) {
            setSize(size + 1);
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
  }, [isLoadingMore, stillCanLoad]);

  const listConverter = (type) => {
    let list = [];

    try {
      if (type == 'class') {
        list =
          filterTypeList[
            filterTypeList.findIndex(
              (item) => item.type_id === paramsFilter.typeId
            )
          ].type_extend_obj.class.split(',');
        list.unshift('全部类型');
      } else if (type == 'area') {
        list =
          filterTypeList[
            filterTypeList.findIndex(
              (item) => item.type_id === paramsFilter.typeId
            )
          ].type_extend_obj.area.split(',');
        list.unshift('全部地区');
      } else if (type == 'lang') {
        list =
          filterTypeList[
            filterTypeList.findIndex(
              (item) => item.type_id === paramsFilter.typeId
            )
          ].type_extend_obj.lang.split(',');
        list.unshift('全部语言');
      } else if (type == 'year') {
        list =
          filterTypeList[
            filterTypeList.findIndex(
              (item) => item.type_id === paramsFilter.typeId
            )
          ].type_extend_obj.year.split(',');
        list.unshift('全部时间');
      }
    } catch (e) {
      console.log(e);
      console.log('crash in 片库');
      return [];
    }

    return list;
  };

  const heightFilter = () => {
    let num = 1;
    if (
      filterTypeList[
        filterTypeList.findIndex((item) => item.type_id === paramsFilter.typeId)
      ].type_extend_obj.class !== ''
    ) {
      num += 1;
    }

    if (
      filterTypeList[
        filterTypeList.findIndex((item) => item.type_id === paramsFilter.typeId)
      ].type_extend_obj.area !== ''
    ) {
      num += 1;
    }

    if (
      filterTypeList[
        filterTypeList.findIndex((item) => item.type_id === paramsFilter.typeId)
      ].type_extend_obj.lang !== ''
    ) {
      num += 1;
    }

    if (
      filterTypeList[
        filterTypeList.findIndex((item) => item.type_id === paramsFilter.typeId)
      ].type_extend_obj.year !== ''
    ) {
      num += 1;
    }

    let calculateHeight = num * 56;

    return calculateHeight + 'px';
  };

  const generatePath = (value, type) => {
    const regex = new RegExp(`/${type}/[^/]+`);

    if (regex.test(path)) {
      return path.replace(regex, `/${type}/${value}`);
    } else {
      switch (type) {
        case 'by':
          return path.replace(/\/id\//, `/by/${value}/id`);
        case 'id':
        case 'class':
          return path.replace(/\/id\//, `/class/${value}/id/`);
        case 'area':
          return path.replace(/\/by\//, `/area/${value}/by/`);
        case 'lang':
          return path.replace(
            /\/id\/[^/]+/,
            (match) => `${match}/${type}/${value}`
          );
        case 'year':
          return `${path}/year/${value}`;
        default:
          return path;
      }
    }
  };

  return (
    <>
      <div className='flex flex-1 justify-start flex-col'>
        {/* {!isVip && (
          <div className=' w-[100%] ' style={{ height: '156px' }}>
            <div className='container'>
              <AdsBanner adsList={adsList} pathName={path} height='500px' />
            </div>
          </div>
        )} */}
        <div className='flex w-screen flex-col items-center'>
          {initialLoading ? (
            <LoadingPage full={true} />
          ) : (
            <>
              <div
                className={` w-screen p-1 z-10 top-[48px] md:static sticky bg-black`}
              >
                {!isVip && (
                  <div className='container'>
                    <SingletonAdsBanner />
                  </div>
                )}
                {filterTypeList && paramsFilter && (
                  <div className={`bg-[#1D2023] pt-2`}>
                    <div className='flex md:flex-wrap gap-x-4 gap-y-2 pl-4 py-2 container'>
                      {/* 1111 filter 短剧              .filter((item) => item.type_id !== 46) */}
                      {filterTypeList.map((item, index) => {
                        return (
                          <div
                            className='flex flex-col items-center cursor-pointer'
                            id={item.type_id}
                            key={index}
                            onClick={() => {
                              router.push(
                                `/vod/show/by/${advanceFilterItem[0].value}/id/${item.type_id}`
                              );
                            }}
                          >
                            <span
                              className={`hover:text-yellow-500 transition-colors duration-300 truncate ${
                                paramsFilter.typeId === item.type_id
                                  ? 'text-yellow-500'
                                  : 'text-white'
                              }`}
                            >
                              {item.type_name}
                            </span>
                            {paramsFilter.typeId === item.type_id ? (
                              <div className='border-2 border-yellow-500 w-5 h-0.5 rounded-lg'></div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className={`transition-all duration-500 md:h-fit md:visible md:py-2
                        ease-out ${
                          collapse
                            ? 'opacity-0 h-0 collapse'
                            : `h-[${heightFilter()}] py-2 `
                        }
                        flex flex-col divide-y divide-gray-800 container md:flex md:opacity-100`}
                    >
                      <div className='h-[280px] md:h-fit w-full'>
                        <div className='flex md:flex-wrap gap-x-4 gap-y-2 py-1 overflow-scroll no-scrollbar'>
                          {advanceFilterItem.map((item, index) => {
                            return (
                              <div
                                className={`flex flex-col items-center cursor-pointer ${
                                  paramsFilter.by === item.value
                                    ? 'bg-theme-transparent'
                                    : ''
                                } p-2 rounded-md`}
                                id={item.value}
                                key={index}
                                onClick={() => {
                                  router.replace(
                                    generatePath(item.value, 'by')
                                  );
                                }}
                              >
                                <span
                                  className={`text-sm hover:text-yellow-500 transition-colors duration-300 truncate ${
                                    paramsFilter.by === item.value
                                      ? 'text-yellow-500'
                                      : 'text-white'
                                  }`}
                                >
                                  {item.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        {filterTypeList[
                          filterTypeList.findIndex(
                            (item) => item.type_id === paramsFilter.typeId
                          )
                        ].type_extend_obj.class != '' && (
                          <div className='flex md:flex-wrap gap-x-4 gap-y-2 py-2 overflow-scroll no-scrollbar'>
                            {listConverter('class').map((item, index) => {
                              return (
                                <div
                                  className={`flex flex-col items-center cursor-pointer ${
                                    paramsFilter.class === item
                                      ? 'bg-theme-transparent'
                                      : ''
                                  } p-2 rounded-md`}
                                  id={item}
                                  key={index}
                                  onClick={() => {
                                    item === '全部类型'
                                      ? router.replace(
                                          path.replace(/\/class\/[^/]+/, '')
                                        )
                                      : router.replace(
                                          generatePath(item, 'class')
                                        );
                                  }}
                                >
                                  <span
                                    className={`text-sm hover:text-yellow-500 transition-colors duration-300 truncate ${
                                      paramsFilter.class === item
                                        ? 'text-yellow-500'
                                        : 'text-white'
                                    }`}
                                  >
                                    {item}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {filterTypeList[
                          filterTypeList.findIndex(
                            (item) => item.type_id === paramsFilter.typeId
                          )
                        ].type_extend_obj.area != '' && (
                          <div className='flex md:flex-wrap gap-x-4 gap-y-2 py-2 overflow-scroll no-scrollbar'>
                            {listConverter('area').map((item, index) => {
                              return (
                                <div
                                  className={`flex flex-col items-center cursor-pointer ${
                                    paramsFilter.area === item
                                      ? 'bg-theme-transparent'
                                      : ''
                                  } p-2 rounded-md`}
                                  id={item}
                                  key={index}
                                  onClick={() => {
                                    item === '全部地区'
                                      ? router.replace(
                                          path.replace(/\/area\/[^/]+/, '')
                                        )
                                      : router.replace(
                                          generatePath(item, 'area')
                                        );
                                  }}
                                >
                                  <span
                                    className={`text-sm hover:text-yellow-500 transition-colors duration-300 truncate ${
                                      paramsFilter.area === item
                                        ? 'text-yellow-500'
                                        : 'text-white'
                                    }`}
                                  >
                                    {item}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {filterTypeList[
                          filterTypeList.findIndex(
                            (item) => item.type_id === paramsFilter.typeId
                          )
                        ].type_extend_obj.lang != '' && (
                          <div className='flex md:flex-wrap gap-x-4 gap-y-2 py-2 overflow-scroll no-scrollbar'>
                            {listConverter('lang').map((item, index) => {
                              return (
                                <div
                                  className={`flex flex-col items-center cursor-pointer ${
                                    paramsFilter.lang === item
                                      ? 'bg-theme-transparent'
                                      : ''
                                  } p-2 rounded-md`}
                                  id={item}
                                  key={index}
                                  onClick={() => {
                                    item === '全部语言'
                                      ? router.replace(
                                          path.replace(/\/lang\/[^/]+/, '')
                                        )
                                      : router.replace(
                                          generatePath(item, 'lang')
                                        );
                                  }}
                                >
                                  <span
                                    className={`text-sm hover:text-yellow-500 transition-colors duration-300 truncate ${
                                      paramsFilter.lang === item
                                        ? 'text-yellow-500'
                                        : 'text-white'
                                    }`}
                                  >
                                    {item}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {filterTypeList[
                          filterTypeList.findIndex(
                            (item) => item.type_id === paramsFilter.typeId
                          )
                        ].type_extend_obj.year != '' && (
                          <div className='flex md:flex-wrap gap-x-4 gap-y-2 py-2 overflow-scroll no-scrollbar'>
                            {listConverter('year').map((item, index) => {
                              return (
                                <div
                                  className={`flex flex-col items-center cursor-pointer ${
                                    paramsFilter.year === item
                                      ? 'bg-theme-transparent'
                                      : ''
                                  } p-2 rounded-md`}
                                  id={item}
                                  key={index}
                                  onClick={() => {
                                    item === '全部时间'
                                      ? router.replace(
                                          path.replace(/\/year\/[^/]+/, '')
                                        )
                                      : router.replace(
                                          generatePath(item, 'year')
                                        );
                                  }}
                                >
                                  <span
                                    className={`text-sm hover:text-yellow-500 transition-colors duration-300 truncate ${
                                      paramsFilter.year === item
                                        ? 'text-yellow-500'
                                        : 'text-white'
                                    }`}
                                  >
                                    {item}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`transition-all duration-500 md:h-fit
                      ease-out ${
                        !collapse ? 'opacity-0 h-0 z-10' : 'h-[36px] py-2'
                      }
                      flex justify-between items-center px-4 container text-sm md:hidden`}
                    >
                      <div>
                        {
                          advanceFilterItem.find(
                            (item) => item.value === paramsFilter.by
                          ).text
                        }
                      </div>
                      <div className='rounded-full w-1 h-1 bg-yellow-500'></div>
                      <div>{paramsFilter.class}</div>
                      <div className='rounded-full w-1 h-1 bg-yellow-500'></div>
                      <div>{paramsFilter.area}</div>
                      <div className='rounded-full w-1 h-1 bg-yellow-500'></div>
                      <div>{paramsFilter.lang}</div>
                      <div className='rounded-full w-1 h-1 bg-yellow-500'></div>
                      <div>{paramsFilter.year}</div>
                      <div
                        className='cursor-pointer'
                        onClick={() => {
                          if (isMobile) {
                            setCollapse(false);
                            setTimeout(() => {
                              setButtonUncollapse(true);
                            }, 300);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className='text-yellow-500 '
                          icon={faAngleDown}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='w-screen flex flex-1 flex-col'>
                {videoList.length > 0 && videoList[0].List !== null ? (
                  <div className='container grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 py-4'>
                    {videoList.map((page, i) => {
                      return page.List.map((vod, idx) => (
                        <Fragment key={idx}>
                          <VideoVerticalCard vod={vod} key={idx} />
                          {page.List.length === idx + 1 &&
                            !stillCanLoad &&
                            page.Page == page?.TotalPageCount && (
                              <div className='md:col-span-5 lg:col-span-6 col-span-3 justify-center flex'>
                                <span className='test-xs text-muted'>
                                  没有更多了
                                </span>
                              </div>
                            )}
                          {page.List.length === idx + 1 &&
                            !stillCanLoad &&
                            page.Page == page?.TotalPageCount && (
                              <div className='md:col-span-5 lg:col-span-6 col-span-3 justify-center flex'>
                                <SingletonAdsBanner />
                              </div>
                            )}
                        </Fragment>
                      ));
                    })}
                  </div>
                ) : !isLoadingMore ? (
                  <div
                    className='w-screen flex flex-1 flex-col'
                    style={{ minHeight: '300px' }}
                  >
                    <div className='flex flex-1 justify-center items-center flex-col'>
                      <Image
                        className='mx-2'
                        src={searchEmptyIcon}
                        alt='empty'
                        width={120}
                      />
                      <span>暂无数据</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
        <div ref={targetRef}>
          {(stillCanLoad || isLoadingMore) && (
            <div className='w-screen flex flex-1 flex-col'>
              <Spinner></Spinner>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
