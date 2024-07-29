'use client';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';
import styles from './../style.module.css';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import { YingshiApi } from '@/util/YingshiApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import VodItemMobile from './../../../components/vodItemMobile';
import { Spinner } from './../../../components/spinner';
import Image from 'next/image';
import { VideoVerticalCard } from '@/components/videoItem/videoVerticalCard';
import { ImagePlaceholder, searchEmptyIcon } from '@/asset/icons';
import base64PlaceholderString from '@/app/placeholder';
import VodItemDesktop from '@/components/vodItemDesktop';

export default function Page() {
  const { keyword } = useParams();
  const decodedKeyword = decodeURIComponent(keyword);
  const [searchResults, setSearchResults] = useState();
  const [isSearching, setIsSearching] = useState(true);
  const router = useRouter();
  const [yunying, setYunying] = useState([]);
  const [stillCanLoad, setStillCanLoad] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [total, setTotal] = useState(0);
  const targetRef = useRef(null);

  const getSearchResultApi = async () => {
    return YingshiApi(
      URL_YINGSHI_VOD.searchVod +
        '?wd=' +
        keyword +
        '&limit=20&page=' +
        nextPage,
      {},
      { method: 'GET' }
    );
  };

  const getSearchResult = async () => {
    if (nextPage == 1) setIsSearching(true);

    let currentPage = nextPage;
    let searchingVodList = await getSearchResultApi();
    console.log(searchingVodList);
    if (searchingVodList?.Total == 0) {
      let res2 = await getTypePageApi();
      setYunying(res2.yunying);
    }
    if (nextPage > 1) {
      setSearchResults((prev) => [...prev, ...searchingVodList?.List]);
    } else {
      setTotal(searchingVodList?.Total);
      setSearchResults(searchingVodList?.List);
      setIsSearching(false);
    }

    if (nextPage > searchingVodList.TotalPageCount - 1) {
      setStillCanLoad(false);
    } else {
      setStillCanLoad(true);
      setNextPage(currentPage + 1);
    }
  };

  // if empty seatch result
  const getTypePageApi = async (idValue) => {
    return YingshiApi(
      URL_YINGSHI_VOD.homeGetPages,
      {
        id: idValue,
        limit: 3,
        page: 1,
      },
      { method: 'GET' }
    );
  };

  // useEffect(() => {
  //   getSearchResult();
  // }, []);

  useEffect(() => {
    if (isSearching) {
      getSearchResult();
    } else {
      if (stillCanLoad) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.intersectionRatio >= 0.5) {
              console.log('test');
              getSearchResult();
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
    }
  }, [nextPage, stillCanLoad]);

  return (
    <div className='flex flex-col'>
      {/* loading spinner  */}
      <div className='mobile'>
        <div>{isSearching && <Spinner></Spinner>}</div>
      </div>

      <div className='desktop'>
        <div className={styles.containerHeader}>
          <div className='d-flex' style={{ width: '100%' }}>
            <div className='overlay' style={{ width: '100%' }}>
              <div className='px-0 d-flex flex-column '>
                <div className='topic-container-header container content-end'>
                  <div className='topic-header-text'>{decodedKeyword}</div>
                  <div className='topic-header-text-sub'>
                    搜索"{decodedKeyword}" ，找到
                    <span className='search-count text-theme'>
                      {isSearching === false ? (
                        <span>{total}</span>
                      ) : (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      )}
                    </span>
                    部影视作品
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isSearching && (
        <>
          {/* desktop  view  */}
          <div className='desktop'>
            <div className='d-flex container pt-3 ' style={{ width: '100%' }}>
              <div className='row w-screen'>
                {searchResults?.map((vod) => (
                  <VodItemDesktop vod={vod} key={vod.vod_id} />
                  // <div className='col-md-6 mt-2 mb-2' key={vod.vod_id}>
                  //   <div
                  //     className='topic-details-card'
                  //     onClick={(e) => {
                  //       e.preventDefault();
                  //       router.push(
                  //         `/vod/play/id/${vod.vod_id}/sid/${vod.type_id}/nid/1`
                  //       );
                  //     }}
                  //   >
                  //     <div className='row '>
                  //       <div className='col-12'>
                  //         <div className='row flex-nowrap'>
                  //           <div
                  //             style={{
                  //               width: '132px',
                  //               paddingLeft: '0px',
                  //               paddingRight: '0px',
                  //             }}
                  //           >
                  //             {/* <img
                  //               alt='vod'
                  //               className={`object-cover`}
                  //               src={vod?.vod_pic}
                  //               style={{
                  //                 borderRadius: '10px',
                  //                 width: '132px',
                  //                 height: '206px',
                  //               }}
                  //             /> */}
                  //           </div>

                  //           <div className='col'>
                  //             <div className='topic-details-title'>
                  //               <span
                  //                 dangerouslySetInnerHTML={{
                  //                   __html: vod.vod_name,
                  //                 }}
                  //               ></span>
                  //             </div>
                  //             <div className='topic-details-title-sub text-secondary '>
                  //               {' '}
                  //               {vod.vod_year} {vod.vod_class}
                  //             </div>
                  //             <div className='topic-details-title-sub text-secondary '>
                  //               {' '}
                  //               主演:
                  //               {vod.vod_actor?.length > 38
                  //                 ? vod.vod_actor?.substring(0, 35) + '...'
                  //                 : vod.vod_actor}
                  //             </div>
                  //             <div className='topic-details-title-sub text-secondary text-break'>
                  //               {vod?.vod_blurb?.length > 75
                  //                 ? vod.vod_blurb.substring(0, 73) + '...'
                  //                 : vod.vod_blurb}
                  //             </div>
                  //             <button className='btn btn-topic-play'>
                  //               <FontAwesomeIcon icon={faPlay} />{' '}
                  //               <span className='ml-2 '> 立即播放 </span>
                  //             </button>
                  //           </div>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
                ))}
              </div>
            </div>
          </div>

          {/* movile   view  */}

          <div className='mobile'>
            <div className='d-flex container pt-3' style={{ width: '100%' }}>
              <div className='row'>
                {searchResults?.map((vod) => (
                  <VodItemMobile vod={vod} key={vod.vod_id} />
                ))}
              </div>
            </div>
          </div>
          {!searchResults && (
            <div className='flex items-center justify-center flex-col h-full pt-6 mt-6'>
              <Image
                className='mx-2'
                src={searchEmptyIcon}
                alt='empty'
                width={120}
              />

              <span className='text-xs pt-2'>
                {' '}
                抱歉没有搜索到"{decodedKeyword}"的相关视频
              </span>
              <span className='text-xs pt-2'> 为你推荐更多精彩内容</span>
            </div>
          )}
          {/* loading spinner  */}
          <div ref={targetRef}>
            {!isSearching && stillCanLoad && <Spinner></Spinner>}
          </div>

          {!stillCanLoad && total !== 0 && (
            <div className='flex items-center justify-center flex-col py-2'>
              <span className='test-xs text-muted'>没有更多了</span>
            </div>
          )}
        </>
      )}

      {yunying != [] && (
        <div className='flex flex-col w-full mb-8 mb-8 px-1.5'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* md:mx-20 mx-2.5  */}
            <div className='pt-8 mt-8 lg:w-[80%] w-[100%] container'>
              {yunying?.map((yy, idx) => {
                return (
                  <div id={yy.type_id} key={idx} className='lg:pt-3'>
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

                    <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 py-2'>
                      {yy.vod_list?.slice(0, 6).map((vod, i) => {
                        return <VideoVerticalCard vod={vod} key={i} />;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
