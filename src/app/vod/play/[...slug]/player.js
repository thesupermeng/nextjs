import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Artplayer from 'artplayer';
import Hls from 'hls.js';
import artplayerPluginAds from 'artplayer-plugin-ads';
import { useLoginOpen } from '@/hook/yingshiScreenState/useLoginOpen';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import { useRouter } from 'next/navigation';
// import { isMobile } from 'react-device-detect';
import { usePaymentOpen } from '@/hook/yingshiScreenState/usePaymentOpen';

export default function Player({
  option,
  setupTimeout,
  getInstance,
  onVideoEnd,
  episodeSelected,
  vodSourceSelected,
  ...rest
}) {
  const artContainerRef = useRef();
  const artRef = useRef();
  const adsPluginRef = useRef();
  const router = useRouter();

  // const [remaining, setRemaining] = useState(setupTimeout);

  const { userInfo } = useYingshiUser();
  const [_, setOpenLogin] = useLoginOpen();
  const [__, setOpenPayment] = usePaymentOpen();

  const playM3U8 = (video, url, art) => {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;
      art.on('destroy', () => hls.destroy());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else {
      art.notice.show = 'Unsupported playback format: m3u8';
    }
  };

  const addOnLayout = () => {
    return (art) => {
      art.layers.add({
        name: 'ads',
        html: `<div id="ad-clickable" class="hover-effect" style="background-color: #00000099; padding: 4px; border-radius: 5px;">
          <span style="font-size: 12px">试看${setupTimeout}秒后结束&nbsp;|&nbsp;</span>
          <span style="font-size: 12px; color: #D1AC7D">开通VIP畅享无限内容</span>
          </div>`,
        style: {
          display: `${setupTimeout === undefined ? 'none' : 'block'}`,
          position: 'absolute',
          bottom: '60px',
          left: '5px',
          cursor:'pointer'
        },
      });
  
      function handleDivClick() {
        console.log('clicked');
        show();
      }
  
      const adDiv = art.layers.ads.querySelector('#ad-clickable');
      if (adDiv) {
        adDiv.addEventListener('click', handleDivClick);
      }
  
      function show() {
        const isMobile = window.innerWidth < 768;
  
        if (isMobile) {
          if (!userInfo) {
            // router.push('/myprofile?login=true');
            setOpenLogin(true);
          } else {
            router.push('/payment');
          }
        } else {
          if (!userInfo) {
            setOpenLogin(true);
          } else {
            setOpenPayment(true);
          }
        }
      }
  
      if (setupTimeout !== undefined) {
        art.on('seek', () => {
          art.video.currentTime = 0;
        });
  
        art.on('video:timeupdate', () => {
          let remaining = setupTimeout - parseInt(art.video.currentTime);
          art.layers.update({
            name: 'ads',
            html: `<div id="ad-clickable"  class="hover-effect" style="background-color: #00000099; padding: 4px; border-radius: 5px">
              <span style="font-size: 12px">试看${remaining}秒后结束&nbsp;|&nbsp;</span>
              <span style="font-size: 12px; color: #D1AC7D">开通VIP畅享无限内容</span>
              </div>`,
            style: {
              display: `${setupTimeout === undefined ? 'none' : 'block'}`,
              position: 'absolute',
              bottom: '60px',
              left: '5px',
              cursor:'pointer'
            },
          });
  
          const adDiv = art.layers.ads.querySelector('#ad-clickable');
          if (adDiv) {
            adDiv.addEventListener('click', handleDivClick);
          }
  
          if (art.video.currentTime >= setupTimeout) {
            art.pause();
            show();
          }
        });
      }
  
      return {
        name: 'vipDialog',
        show,
      };
    };
  };
  

  useLayoutEffect(() => {
    let showNextFlag;
    try {
      showNextFlag =
        episodeSelected.name ==
        vodSourceSelected.vod_play_list.urls[
          vodSourceSelected.vod_play_list.url_count - 1
        ].name;
    } catch (e) {
      showNextFlag = false;
    }

    // Artplayer.MOBILE_DBCLICK_PLAY = false;
    // Artplayer.MOBILE_CLICK_PLAY = true;

    artRef.current = new Artplayer({
      ...option,
      container: artContainerRef.current,
      type: 'm3u8',
      customType: {
        m3u8: playM3U8,
      },
      fullscreenWeb: true,
      pip: true,
      setting: true,
      playbackRate: true,
      autoPlayback: true,
      aspectRatio: true,
      theme: '#FAC33D',
      lang: 'zh-cn',
      icons: {
        indicator: `<svg fill="#ffffff" width="800px" height="800px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <g transform="matrix(1,0,0,1,-576,-320)"> <rect id="Icons" x="0" y="0" width="1280" height="800" style="fill:none;"/> <g id="Icons1" serif:id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1"> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif:id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <g id="toggle-off"> </g> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="circle-filled" transform="matrix(1.70002,0,0,1.70002,-316.778,-246.387)"> <circle cx="543.992" cy="352" r="14.13"/> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g transform="matrix(0.638317,0.368532,-0.368532,0.638317,785.021,-208.975)"> <g id="coffee-beans"> <g id="coffee-bean1" serif:id="coffee-bean"> </g> </g> </g> <g id="coffee-bean-filled"> </g> <g transform="matrix(0.638317,0.368532,-0.368532,0.638317,913.062,-208.975)"> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif:id="coffee-bean"> </g> </g> </g> <g id="clipboard"> </g> <g transform="matrix(1,0,0,1,128.011,1.35415)"> <g id="clipboard-paste"> </g> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g> </g>
        </svg>
        `,
      },
      controls: [
        {
          disable: showNextFlag,
          name: 'nextButton', // 设置按钮的名称，用于在控制栏中标识
          index: 20,
          tooltip: '下集',
          position: 'left', // 设置按钮在控制栏中的位置，这里假设放在右侧
          html: '<img src="/img/playNext.png" width="36px">', // 设置按钮的 HTML 内容
          click: onVideoEnd,
          //   click:  function () {
          //     // top.location.href = MacPlayer.PlayLinkNext;
          //     onVideoEnd()
          // },
        },
      ],
      plugins: [addOnLayout()],
    });

    if (getInstance && typeof getInstance === 'function') {
      getInstance(artRef.current);
    }

    return () => {
      if (artRef.current && artRef.current.destroy) {
        artRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    artRef.current.switchUrl(option.url);
    // artRef.current.switchUrl(
    //   'https://m3u.haiwaikan.com/xm3u8/c97db14105eea2eef701e1283fed0adad5fbb6a501851302a592e744fbba6ebd9921f11e97d0da21.m3u8'
    // );
    artRef.current.on('video:ended', onVideoEnd);
    return () => {
      if (artRef.current) {
        artRef.current.off('video:ended', onVideoEnd);
      }
    };
  }, [option.url]);

  return <div ref={artContainerRef} {...rest}></div>;
}
