'use client';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { YingshiApi } from '@/util/YingshiApi';
import Artplayer from './player.js';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import { ShareHorizontal } from '@/components/shareHorizontal';
import { ExtraDesc } from '@/components/extraDesc';
import { VodCard } from '@/components/vod/vodCard.js';
import { VodSourceList } from '@/components/vod/vodSourceList.js';
import { VodEpisodeList } from '@/components/vod/vodEpisodeList.js';
import { VodPopularList } from '@/components/vod/vodPopularList.js';
import { VodContent } from '@/components/vod/vodContent.js';
import styles from './style.module.css';
import { VideoVerticalCard } from '@/components/videoItem/videoVerticalCard';
import { ArrowLeftIcon } from '@/asset/icons';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { convertTimeStampToDateTime } from '@/util/date';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { LottieAnimation } from '@/components/lottie';
import { IrrLoading } from '@/asset/lottie';
import { AdsPlayer } from './adsPlayer.js';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser.js';
import { useLoginOpen } from '@/hook/yingshiScreenState/useLoginOpen';
import { YingshiApi2 } from '@/util/YingshiApi';
import { Config } from '@/util/config';
import SingletonAdsBanner from '@/components/ads/singletonAdsBanner.js';
import { decodeVSN } from '@/util/vsn.js';
// import { AdsBanner } from '@/components/ads/adsBanner.js';

export const PlayVod = ({ vodId, tId, nId, sourceId, vsn }) => {
  const router = useRouter();
  const path = usePathname();
  const { t } = useTranslation();

  const { isVip, userInfo } = useYingshiUser();
  const [_, setIsLoginShow] = useLoginOpen();

  const shareContentRef = useRef(null);
  const domElementRef = useRef(null);
  const playerDivRef = useRef(null);
  const playerRef = useRef(null);

  const [vod, setVod] = useState(null);
  const [suggestedVods, setSuggestedVods] = useState([]);
  const [vodSourceSelected, setVodSourceSelected] = useState(null);
  const [episodeSelected, setEpisodeSelected] = useState(null);
  const [episodeGroups, setEpisodeGroups] = useState([]);
  const [playerDivHeight, setPlayerDivHeight] = useState(0);
  const [episodeGroupSelected, setEpisodeGroupSelected] = useState({});
  const [desc, setDesc] = useState('');
  const [toggleJianJie, setToggleJianJie] = useState(false);
  const [toggleShowShareBoxStatus, setToggleShowShareBoxStatus] =
    useState(false);
  const [vodShareContent, setVodShareContent] = useState('');
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [ads, setAds] = useState(null);
  const [showAds, setShowAds] = useState(!isVip);
  const initAdsList = JSON.parse(sessionStorage.getItem('adsList'));

  const getAllAds = async () => {
    return YingshiApi2(URL_YINGSHI_VOD.getAllAds, {}, { method: 'GET' });
  };
  const allSameProperty = (arr, prop) =>
    arr.every((item) => item[prop] === arr[0][prop]);

  const getAds = async () => {
    console.log('play screen init');

    let allAds = {};
    let adsList = initAdsList;
    if (!adsList) {
      adsList = JSON.parse(sessionStorage.getItem('adsList'));
    }
    if (adsList && adsList !== 'undefined') {
      allAds.data = adsList;
    } else {
      console.log('why');
      allAds = await getAllAds();
      sessionStorage.setItem('adsList', JSON.stringify(allAds.data));
    }

    // let result = allAds.data.filter(
    //   (ad) => ad.slot_id_list_array && ad.slot_id_list_array.includes(144)
    // );

    // if (result.length > 0) {
    //   const randomIndex = Math.floor(Math.random() * result.length);
    //   setAds(result[randomIndex]);
    // } else {
    //   setAds(result[0]);
    // }

    let result = allAds.data.filter(
      (ad) =>
        (ad.slot_id_list_array && ad.slot_id_list_array.includes(144)) ||
        ad.slot_id_list_array.includes(146)
    );

    result = result.sort((a, b) => b.ads_sort - a.ads_sort);

    const sameSortFlag = allSameProperty(result, 'ads_sort');

    if (result.length > 0 && sameSortFlag) {
      const randomIndex = Math.floor(Math.random() * result.length);

      setAds(result[randomIndex]);
    } else {
      setAds(result[0]);
    }

    setShowAds(true);
  };



  useLayoutEffect(() => {
  if(vodId == '102157' && window.location.host.includes('shayutv.com'))// 庆余年
  {
     window.location.href = '/404'
  }

}, []);


  useLayoutEffect(() => {
    if (isVip) {
      setShowAds(false);
    } else {
      let adsList = initAdsList;
      if (!adsList) {
        adsList = JSON.parse(sessionStorage.getItem('adsList'));
      }

      if (adsList && adsList !== 'undefined') {
        //  setAdsList(adsList);
        let result = adsList.filter(
          (ad) => ad.slot_id_list_array && ad.slot_id_list_array.includes(144)
        );
        result = result.sort((a, b) => b.ads_sort - a.ads_sort);

        const sameSortFlag = allSameProperty(result, 'ads_sort');

        if (result.length > 0 && sameSortFlag) {
          const randomIndex = Math.floor(Math.random() * result.length);

          setAds(result[randomIndex]);
        } else {
          setAds(result[0]);
        }

        setShowAds(true);
      } else {
        getAds();
      }
    }
  }, [isVip]);

  const getVod = async () => {
    const params = {
      id: vodId,
      ...(tId !== 0 && { tid: tId }),
      ...(vsn !== undefined && { vod_source_name: decodeVSN(vsn) }),
    };
    return await YingshiApi(URL_YINGSHI_VOD.getVodDetails, params, {
      method: 'GET',
    });
    // if (tId == 0) {
    //   return YingshiApi(
    //     URL_YINGSHI_VOD.getVodDetails,
    //     {
    //       id: vodId,
    //     },
    //     {
    //       method: 'GET',
    //     }
    //   );
    // } else {
    //   return YingshiApi(
    //     URL_YINGSHI_VOD.getVodDetails,
    //     {
    //       id: vodId,
    //       tid: tId,
    //     },
    //     {
    //       method: 'GET',
    //     }
    //   );
    // }
  };

  const getSuggestedVodType = async () => {
    return YingshiApi(
      URL_YINGSHI_VOD.searchingListSlim,
      {
        tid: vod.type_id ? vod.type_id.toString() : '',
        limit: 12,
        id: vod.vod_id,
        class: vod.vod_class ? vod.vod_class.split(',').shift() : '',
      },
      {
        method: 'GET',
        noToken: true,
        extraOptions: {
          next: {
            cache: 'force-cache',
            revalidate: 3600,
          },
        },
      }
    );
  };

  useEffect(() => {
    let content = '';

    if (vod) {
      let desc = vod.vod_year + ' ' + vod.vod_area;
      let vodClass = [];
      if (vod.vod_class != null) {
        vodClass = vod.vod_class.split(',');
      }
      vodClass = vodClass.slice(0, 2);
      vodClass.forEach((item, i) => {
        desc += ' ' + item;
      });

      setDesc(desc);

      content += '《' + vod.vod_name + '》高清播放';
      content += '</br>' + window.location.href;
      content += '</br> 影视TV-海量高清视频在线观看';

      setVodShareContent(content);
    }
  }, [vod]);

  useEffect(() => {
    if (episodeSelected == null) {
      getVod().then((data) => {
        if (data == null || data === undefined) {
          router.push('/404');
          return;
        }

        let res = data;
        setVod(res);

        if (res.vod_sources.length > 0) {
          let index = 0;
          if (sourceId)
            index = res.vod_sources.findIndex((x) => x.source_id === sourceId);

          let source = res.vod_sources[index === -1 ? 0 : index];
          setVodSourceSelected(source);

          if (source.vod_play_list.urls.length > Config.vodEpisodeGroupMax) {
            const tolGroup = Math.ceil(
              source.vod_play_list.urls.length / Config.vodEpisodeGroupMax
            );
            const groups = [];

            for (let i = 0; i < tolGroup; i++) {
              groups.push({
                from: i * Config.vodEpisodeGroupMax + 1,
                to:
                  tolGroup === i + 1
                    ? source.vod_play_list.urls.length
                    : (i + 1) * Config.vodEpisodeGroupMax,
              });
            }

            setEpisodeGroups(groups);
            setEpisodeGroupSelected(
              groups.length > 0
                ? groups.find((group) => nId >= group.from && nId <= group.to)
                : {}
            );
          } else {
            const defaultGroup = {
              from: 1,
              to: source.vod_play_list.urls.length,
            };

            setEpisodeGroups([defaultGroup]);
            setEpisodeGroupSelected(defaultGroup);
          }

          if (source.vod_play_list.urls.length > 0) {
            if (nId && nId > 0 && nId < 9999) {
              setEpisodeSelected(source.vod_play_list.urls[nId - 1]);
            } else {
              setEpisodeSelected(source.vod_play_list.urls[0]);
            }
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (vod) {
      getSuggestedVodType().then((data) => {
        try {
          setSuggestedVods(data.List);
        } catch (e) {
          // console.log(e);
          setSuggestedVods([]);
        }
      });
    }
  }, [vod]);

  useEffect(() => {
    const randomAds = async () => {
      await getAds();
    };

    randomAds();
  }, [vod]);

  useEffect(() => {
    if (episodeSelected !== null) {
      if (playerRef.current) {
        playerRef.current.pause();
      }
      if (isVip) {
        setShowAds(false);
      }

      let watchHistory = {
        tid: tId,
        nid: episodeSelected?.nid + 1,
        vodid: vodId,
        vodpic: vod.vod_pic,
        vodname: vod.vod_name,
        vodurl: episodeSelected?.url,
        watchtimes: 0,
        sourceId: sourceId,
        sourceName: decodeVSN(vsn),
      };

      let watchHistoryData = JSON.parse(
        localStorage.getItem('watchHistoryList')
      );

      let artPlayerData = JSON.parse(
        localStorage.getItem('artplayer_settings')
      );

      if (watchHistoryData == null) {
        watchHistoryData = [watchHistory];
      } else {
        if (
          watchHistoryData.find((item) => item.vodurl == watchHistory.vodurl)
        ) {
        } else {
          watchHistoryData.push(watchHistory);
        }
      }

      const lastItemMap = {};
      const lastItemList = [];
      const duplicateList = [];

      const listWithId = watchHistoryData.map((item, index) => ({
        id: index + 1,
        ...item,
      }));

      listWithId
        .slice()
        .reverse()
        .forEach((item) => {
          // eslint-disable-next-line no-prototype-builtins
          if (lastItemMap.hasOwnProperty(item.vodid)) {
            // console.log(item.vodid);
            duplicateList.push(item);
          } else {
            lastItemMap[item.vodid] = item;
          }
        });

      Object.values(lastItemMap).forEach((item) => lastItemList.push(item));

      const sortedList = lastItemList.sort((a, b) => a.id - b.id);

      const listWithoutId = sortedList.map(({ id, ...rest }) => rest);

      localStorage.setItem('watchHistoryList', JSON.stringify(listWithoutId));

      if (artPlayerData != null && artPlayerData != undefined) {
        if (duplicateList.length !== 0) {
          duplicateList.forEach((item) => {
            if (artPlayerData.times[item.vodurl]) {
              // Remove target URL from the object
              delete artPlayerData.times[item.vodurl];
            }
          });

          localStorage.setItem(
            'artplayer_settings',
            JSON.stringify(artPlayerData)
          );
        }
      }
    }
  }, [episodeSelected]);

  const onSelectSource = (source) => {
    if (source.source_id !== vodSourceSelected.source_id) {
      const pattern = /\/source\/\d+/;
      const url = pattern.test(path)
        ? path.replace(pattern, `/source/${source.source_id}`)
        : `${path}/source/${source.source_id}`;

      router.replace(url);
    }
  };

  const onSelectEpisodeGroup = (group) => {
    setEpisodeGroupSelected(group);
  };

  const onSelectEpisode = (episode) => {
    router.replace(`${path.replace(/(\/nid\/)\d+/, `$1${episode?.nid + 1}`)}`);
  };

  const onVideoEnd = () => {
    const indexFound = vodSourceSelected?.vod_play_list?.urls?.findIndex(
      (urlObj) => urlObj === episodeSelected
    );

    if (
      indexFound === -1 ||
      indexFound + 1 >= (vodSourceSelected?.vod_play_list?.urls?.length ?? 0)
    ) {
      return;
    }

    router.replace(
      `${path.replace(
        /(\/nid\/)\d+/,
        `$1${vodSourceSelected?.vod_play_list?.urls[indexFound + 1].nid + 1}`
      )}`
    );
  };

  useEffect(() => {
    if (playerDivRef.current) {
      const playerDivHeight = playerDivRef.current.offsetHeight;
      setPlayerDivHeight(playerDivHeight);
    }
  });

  const openJianJie = () => {
    setToggleJianJie(!toggleJianJie);
  };

  const toggleShowShareBox = (e) => {
    if (typeof e == 'undefined') {
      setToggleShowShareBoxStatus(true);
      return;
    }

    if (e?.target?.id === 'parentBg' || e?.target?.id === 'parentBgMobile') {
      setToggleShowShareBoxStatus(false);
      return;
    }
  };

  // const copyContentToClipboard = () => {
  //   let content = vodShareContent.replaceAll('</br>', ' ');
  //   console.log(content)
  //   navigator.clipboard.writeText(content);
  //   setShowToastMessage(true);
  //   setToggleShowShareBoxStatus(false);
  //   const timeout = setTimeout(() => setShowToastMessage(false), 2000);
  // };

  const copyContentToClipboard = () => {
    let content = vodShareContent.replaceAll('</br>', ' ');
    console.log(content);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          setShowToastMessage(true);
          setToggleShowShareBoxStatus(false);
          const timeout = setTimeout(() => setShowToastMessage(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text to clipboard', err);
        });
    } else {
      // Fallback method for unsupported browsers
      const textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        document.execCommand('copy');
        setShowToastMessage(true);
        setToggleShowShareBoxStatus(false);
        const timeout = setTimeout(() => setShowToastMessage(false), 2000);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textarea);
    }
  };

  const handleAdsPlayerEndPlay = () => {
    setShowAds(false);
  };

  return (
    <div
      ref={domElementRef}
      className='container'
      style={{ padding: '0px', position: 'relative' }}
    >
      <div
        className={`${
          showToastMessage ? 'flex' : 'hidden'
        } items-center justify-center`}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      >
        <div
          className={`fixed top-0 z-[9999] flex items-center justify-center w-full h-full pointer-events-none text-white transition-opacity duration-300 opacity-100`}
        >
          <div
            className='text-white px-6 py-3 rounded-[12px] text-sm flex gap-3'
            style={{ background: '#1D2023CC' }}
          >
            已复制链接
          </div>
        </div>
      </div>
      <div className='desktop'>
        <div
          className={`${
            toggleShowShareBoxStatus ? 'block' : 'hidden'
          } fixed z-50 top-0 bottom-0 left-0 right-0 bg-black opacity-60`}
        ></div>
        <div
          className={`${
            toggleShowShareBoxStatus ? 'block' : 'hidden'
          } h-screen fixed z-50 top-0 bottom-0 left-0 right-0 bg-transparent backdrop-blur-sm`}
        >
          <div
            className='items-center justify-center'
            style={{ display: 'flex', width: '100%', height: '100%' }}
            id='parentBg'
            onClick={toggleShowShareBox}
          >
            <div
              // className={`${toggleShowShareBoxStatus ? 'flex' : 'hidden'} h-screen desktop`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                className=''
                style={{
                  width: '400px',
                  // height: '30%',
                  zIndex: '999',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  background: '#1D2023',
                  padding: '1rem 1rem 1rem 1rem',
                  borderRadius: '12px',
                }}
              >
                <span className='text-md' style={{ fontWeight: '500' }}>
                  分享视频
                </span>
                <div
                  style={{
                    width: '100%',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                  }}
                >
                  <span className='text-sm'>
                    复制下方链接，去粘贴给好友吧：
                  </span>
                </div>
                <div
                  className=''
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgba(137, 149, 181, 0.08)',
                    padding: '1rem',
                  }}
                >
                  <div
                    className='text-sm truncate'
                    ref={shareContentRef}
                    dangerouslySetInnerHTML={{ __html: vodShareContent }}
                  ></div>
                </div>
                <div
                  className='bg-theme'
                  style={{
                    padding: '0.3rem 1.2rem',
                    borderRadius: '12px',
                    margin: '0.5rem',
                  }}
                  onClick={copyContentToClipboard}
                >
                  <span className='text-sm cursor-pointer'>一键复制</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mobile'>
        <div
          className={`${
            toggleShowShareBoxStatus ? 'flex' : 'hidden'
          } fixed z-10 top-0 bottom-0 left-0 right-0 bg-black opacity-60`}
        ></div>
        <div
          className={`${
            toggleShowShareBoxStatus ? 'flex' : 'hidden'
          } w-screen h-screen z-50`}
          style={{
            flexDirection: 'column',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          id='parentBgMobile'
          onClick={toggleShowShareBox}
        >
          <div
            id='mobileShareContent'
            className=''
            style={{
              width: '90%',
              // height: '30%',
              zIndex: '1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              background: '#1D2023',
              padding: '1rem 1rem 1rem 1rem',
              borderRadius: '12px',
            }}
            onClick={toggleShowShareBox}
          >
            <span className='text-md' style={{ fontWeight: '500' }}>
              分享视频
            </span>
            <div
              style={{
                width: '100%',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
              }}
            >
              <span className='text-sm'>复制下方链接，去粘贴给好友吧：</span>
            </div>
            <div
              className=''
              style={{
                width: '100%',
                height: '100%',
                background: 'rgba(137, 149, 181, 0.08)',
                padding: '1rem',
              }}
            >
              <div
                className='text-sm truncate'
                ref={shareContentRef}
                dangerouslySetInnerHTML={{ __html: vodShareContent }}
              ></div>
            </div>
            <div
              className='bg-theme'
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '12px',
                margin: '0.5rem',
              }}
              onClick={copyContentToClipboard}
            >
              <span className='text-sm'>一键复制</span>
            </div>
          </div>
        </div>
      </div>

      {vod == null ? (
        <FullPageContent>
          <div className='flex flex-1 w-full h-full items-center justify-center'>
            <LottieAnimation
              src={IrrLoading}
              tw={`w-[${80}px] h-[${80}px]`}
              isLoop={true}
            />
          </div>
        </FullPageContent>
      ) : (
        <div className='flex flex-row space-x-4'>
          <div className='flex-1 space-y-4 no-scrollbar video-player'>
            <div
              ref={playerDivRef}
              className='aspect-[16/9] absolute w-full lg:relative lg:w-[100%] sticky md:static top-0'
              style={{ zIndex: '1' }}
            >
              <div
                className='p-3 mobile'
                onClick={() => router.back()}
                style={{
                  background: 'black',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {vod.vod_name}
                <div
                  className='pt-3'
                  style={{
                    position: 'absolute',
                    top: '0',
                    marginTop: '0.4rem',
                  }}
                >
                  <Image src={ArrowLeftIcon} alt='Icon' />
                </div>
              </div>

              {showAds && !isVip && ads ? ( //  && ads
                <AdsPlayer
                  className='aspect-[16/9]'
                  adsInfo={ads}
                  handleAdsPlayerEndPlay={handleAdsPlayerEndPlay}
                />
              ) : (
                <Artplayer
                  // key={episodeSelected?.url}
                  className='aspect-[16/9]'
                  option={{
                    container: '.artplayer-app',
                    url: episodeSelected?.url ?? '',
                    fullscreen: true,
                    autoplay: /^((?!chrome|android).)*safari/i.test(
                      navigator.userAgent
                    )
                      ? false
                      : true,
                    muted: false,
                  }}
                  getInstance={(art) => {
                    //console.info(art)
                  }}
                  onVideoEnd={onVideoEnd}
                  episodeSelected={episodeSelected}
                  vodSourceSelected={vodSourceSelected}
                />
              )}
            </div>
            {/* <div
              className='lg:hidden block'
              style={{ height: `${playerDivHeight}px` }}
            ></div> */}
            {/* Web Share Horizontal */}
            <div className='lg:flex hidden'>
              <ShareHorizontal
                className={'w-[80%]'}
                setShowShareBox={() => {
                  setToggleShowShareBoxStatus(true);
                }}
              />
            </div>

            <div className='lg:flex hidden'>
              {/* <AdsBanner pathName={path} useMargin2={true} height='500px' /> */}
              <SingletonAdsBanner />
            </div>

            <div className='desktop'>
              <ExtraDesc vod={vod} episodeSelected={episodeSelected} />
            </div>
            <VodContent
              vodContent={vod.vod_blurb}
              vodEpisodeSelected={episodeSelected}
              vodEpisodeInfo={vod.vod_episode_info}
            />

            <div
              className='lg:hidden flex flex-col space-y-4'
              style={{ width: '100%' }}
            >
              <div className='vod-episode-list'>
                <div className={`space-y-4 ${styles.vodMetaContainer}`}>
                  <VodCard
                    imgSource={vod.vod_pic}
                    vodName={vod.vod_name}
                    vodUpdateDate={vod.vod_time}
                    vodYear={vod.vod_year}
                    vodClass={vod.vod_class}
                    vodRemark={vod.vod_remarks}
                    vodEpisodeSelected={episodeSelected}
                    vodEpisodeInfo={vod.vod_episode_info}
                    vod={vod}
                    setShowShareBox={toggleShowShareBox}
                    episodeSelected={episodeSelected}
                  />

                  <VodSourceList
                    vodSources={vod.vod_sources}
                    vodSourceSelected={vodSourceSelected}
                    onSelectSource={onSelectSource}
                  />

                  <VodEpisodeList
                    episodeGroups={episodeGroups}
                    episodeGroup={episodeGroupSelected}
                    vodSource={vodSourceSelected}
                    episodeSource={episodeSelected}
                    onSelectEpisodeGroup={onSelectEpisodeGroup}
                    onSelectEpisode={onSelectEpisode}
                    style={{
                      maxHeight: 300,
                    }}
                  />
                </div>

                <div className={`mobile`}>
                  <ExtraDesc vod={vod} episodeSelected={episodeSelected} />
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <div className='lg:w-[100%] w-[90%]'>
                <div className='lg:hidden flex'>
                  <SingletonAdsBanner />
                  {/* <AdsBanner useMargin2={true} pathName={path} height='500px' /> */}
                </div>
                <div style={{ marginTop: '30px', marginBottom: '10px' }}>
                  <span className='text-xl' style={{ fontWeight: '500' }}>
                    {t('相关推荐')}
                  </span>
                </div>
                <div
                  className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5'
                  style={{ marginTop: '0px', marginBottom: '5rem' }}
                >
                  {suggestedVods &&
                    suggestedVods.length > 0 &&
                    suggestedVods?.slice(0, 12).map((vod, i) => {
                      return <VideoVerticalCard vod={vod} key={i} />;
                    })}
                </div>
              </div>
            </div>
          </div>

          <div
            className='lg:flex hidden flex-col space-y-4'
            style={{ width: '300px' }}
          >
            <div className=''>
              {!toggleJianJie ? (
                <div className={`space-y-4 ${styles.vodMetaContainer}`}>
                  <VodCard
                    imgSource={vod.vod_pic}
                    vodName={vod.vod_name}
                    vodUpdateDate={vod.vod_time}
                    vodYear={vod.vod_year}
                    vodClass={vod.vod_class}
                    vodRemark={vod.vod_remarks}
                    vod={vod}
                    openJianJie={openJianJie}
                    setShowShareBox={toggleShowShareBox}
                    episodeSelected={episodeSelected}
                  />

                  <VodSourceList
                    vodSources={vod.vod_sources}
                    vodSourceSelected={vodSourceSelected}
                    onSelectSource={onSelectSource}
                  />

                  <VodEpisodeList
                    episodeGroups={episodeGroups}
                    episodeGroup={episodeGroupSelected}
                    vodSource={vodSourceSelected}
                    episodeSource={episodeSelected}
                    onSelectEpisodeGroup={onSelectEpisodeGroup}
                    onSelectEpisode={onSelectEpisode}
                    style={{
                      maxHeight: 300,
                    }}
                  />
                </div>
              ) : (
                <div className={`space-y-4 ${styles.vodMetaContainer}`}>
                  <div
                    className='flex flex-row cursor-pointer'
                    onClick={openJianJie}
                  >
                    <div className='mx-3' style={{ margin: 'auto' }}>
                      <Image src={ArrowLeftIcon} alt='Icon' />
                    </div>
                    <div>{vod.vod_name}</div>
                  </div>
                  <div></div>
                  <div
                    className='pb-6 allow-select'
                    style={{ color: '#9C9C9C' }}
                  >
                    <div className='text-sm pt-1'>{desc}</div>
                    <div className='text-sm pt-1'>
                      更新: {convertTimeStampToDateTime(vod.vod_time).year}-
                      {convertTimeStampToDateTime(vod.vod_time).month}-
                      {convertTimeStampToDateTime(vod.vod_time).day}
                    </div>
                    <div className='text-sm pt-1 text-ellipsis overflow-hidden'>
                      主演: {vod.vod_actor}
                    </div>
                    <div
                      className='text-md pt-3 py-2'
                      style={{
                        color: 'rgb(250 198 69 / var(--tw-text-opacity))',
                      }}
                    >
                      简介
                    </div>
                    <div className='text-sm text-ellipsis overflow-hidden'>
                      <p>
                        {vod?.vod_blurb ? vod?.vod_blurb : vod?.vod_content}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.vodMetaContainer}>
              <VodPopularList />
            </div>

            <div className='lg:flex hidden'>
              <SingletonAdsBanner useMargin2={true} verticalAds={true} />
              {/* <AdsBanner
                useMargin2={true}
                pathName={path}
                height='500px'
                isPlayVertival={true}
              /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
