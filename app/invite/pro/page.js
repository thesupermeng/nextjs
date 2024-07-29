'use client';

import {useSearchParams} from 'next/navigation';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  AndroidIcon,
  AppImage,
  AppleStoreIcon,
  AppStoreIcon,
  CopyIcon,
  DownloadIcon,
  GreenTickIcon,
  Logo, MobileAppImage
} from '@/asset/icons';
import QRCode from 'qrcode.react';
import Image from 'next/image';
import styles from './style.module.css';
import Script from 'next/script';
import {useSelector} from 'react-redux';

export default function Invite() {
  const query = useSearchParams();
  const secretString = query.get('invite');

  const [username, setUsername] = useState('贝贝');
  const [code, setCode] = useState('YINGSHI01');
  const getIsUserChina = (state) => state.yingshiScreen.isUserChina;
  const isUserChina = useSelector(getIsUserChina);

  const [showToastMessage, setShowToastMessage] = useState(false);
  const [iosLink, setIosLink] = useState('https://apps.apple.com/cn/app/id6474402534');

  useLayoutEffect(() => {

    try {
      // Decode base64
      // decodedString = atob(secretString);
      
      // Handle URL encoding issues
      // decodedNameAndCode = decodeURIComponent(escape(decodedString));

       let decodedNameAndCode = decodeURIComponent(escape(atob(secretString.replaceAll(' ', '+'))));
      
      // Extract code and username
      // document.getElementById('username').textContent = decodedNameAndCode.substring(6, secretString.length);
      // document.getElementById('yanzhengma').textContent = decodedNameAndCode.substring(0, 6);

       setCode(decodedNameAndCode.substring(0, 6))
       setUsername(decodedNameAndCode.substring(6, secretString.length))
      
  
    } catch (error) {


      //  code = 'YINGSHI01';
      //  username = '贝贝';

      console.error('Error decoding secret string:', error);
      
    }


    try {
      setIosLink(isUserChina.link_jump);
    } catch (e) {
      setIosLink('https://apps.apple.com/cn/app/id6474402534');
    }
  }, [isUserChina]);

  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setShowToastMessage(true);
          const timeout = setTimeout(() => setShowToastMessage(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text to clipboard', err);
        });
    } else {
      // Fallback method for unsupported browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        document.execCommand('copy');
        setShowToastMessage(true);
        const timeout = setTimeout(() => setShowToastMessage(false), 2000);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textarea);
    }
  };

  const getOperatingSystem = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      return 'Android';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    } else if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
      return 'MacOS';
    } else {
      return 'not supported';
    }
  };

  const navigateDownload = () => {
    const os = getOperatingSystem();
    if (os === 'Android') {
      window.open('https://oss.yingshi.tv/assets/yingshi-LB.apk', '_blank');
    } else {
      window.location.href = 'https://yingshi.tv';
    }
  };

  const navigateStoreDownload = () => {
    window.location.href = iosLink;
  }

  return (
    <>
      <div
        className={`${
          showToastMessage ? 'flex' : 'hidden'
        } items-center justify-center`}
        style={{width: '100%', height: '100%', position: 'absolute'}}
      >
        <div
          className={`fixed top-0 z-[9999] flex items-center justify-center w-full h-full pointer-events-none text-white transition-opacity duration-300 opacity-100`}
        >
          <div
            className='text-white px-6 py-3 rounded-[12px] text-sm flex gap-3 items-center'
            style={{background: '#1D2023CC'}}
          >
            <Image className={'pt-1'} src={GreenTickIcon} alt='复制邀请码成功' width={22} height={22}/>
            已复制链接
          </div>
        </div>
      </div>
      <div className={`${styles.desktop} grow bg-cover bg-center justify-center items-center p-6 mt-px-50`}
           style={{backgroundImage: 'url(/img/download-bg.png)'}}>
        <div className="flex flex-col justify-center items-center pr-5">
          <Image width={250} height={125} alt="logo" src={Logo}/>
          <p className="text-2xl font-medium pt-4 pb-3">
            <span style={{color: 'rgba(250, 195, 61, 1)'}}>{username}</span> 邀请你一起领取观影VIP
          </p>
          <p className="text-xl text-[#FFBE16]">海量视频内容 随时随地 想看就看</p>
          <p className="text-base font-light pt-2 pb-1.5 px-0">注册影视TV会员即可获得 30日 VIP会员</p>
          <p className="text-base font-light pt-1 pr-1 pb-0 pl-1">您也可以一起推荐其他好友下载注册影视 APP</p>
          <p className="text-base font-light pt-0 pr-1 pb-1 pl-1">推荐越多获得的VIP天数越多</p>
          <div style={{padding: '18px 0px 16px 0px', width: '100%'}}>
            <div onClick={copyToClipboard} style={{
              cursor: 'pointer',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.10)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '13px 22px'
            }}>
              <div style={{
                color: '#FAC33D',
                fontFamily: 'PingFang SC',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '500'
              }} id="yanzhengma2">
                {code}
              </div>
              <div style={{
                fontFamily: 'PingFang SC',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                display: 'flex',
                alignItems: 'center'
              }}>
                复制邀请码
                <Image style={{paddingLeft: '6px'}} width={25} height={25}
                       src={CopyIcon} alt="copy"/>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-10 pt-2">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-row  items-center">
                <Image alt="appleStore" src={AppleStoreIcon} width={25}/>
                <span className="text-m">iOS App 下载</span>
              </div>
              <QRCode
                className="rounded-md"
                value={iosLink}
                renderAs="canvas"
                size={200}
                includeMargin={true}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-row items-center">
                <Image alt="playStore" src={AndroidIcon} width={25}/>
                <span className="text-m">安卓 App 下载</span>
              </div>
              <QRCode
                className="rounded-md"
                value="https://oss.yingshi.tv/assets/yingshi-LB.apk"
                renderAs="canvas"
                size={200}
                includeMargin={true}
              />
            </div>
          </div>
          <span className="text-lg pt-3">扫码下载 <span className={'text-[#FAC33D]'}>影视TV</span> APP</span>
        </div>
        <Image src={AppImage} alt="App Image" width={330} height={730}/>
      </div>

      <div className={`${styles.mobile} flex-1 bg-cover bg-center items-center flex-col pb-3`}
           style={{backgroundImage: `url('/img/invite_mobile_bg.svg')`}}>
        <div className="pt-8 pl-6 pr-6 mt-px-50">
          <div className="flex flex-col justify-center items-center">
            <Image width={160} height={95} alt="logo" src={Logo}/>
            <p className="text-lg text-center font-medium pt-4">
              <span style={{color: 'rgba(250, 195, 61, 1)'}}>{username}</span> 邀请你一起领取观影VIP
            </p>
          </div>
        </div>
        <div className="w-full text-center">
          <div className="w-5/6 mx-auto pt-3 pb-8">
            <p className="text-lg font-bold text-[#FFBE16]">注册影视TV会员即享 30天VIP 会员</p>
            <p className="text-xs font-light pt-1 pr-1 pb-0 pl-1">您也可以推荐好友注册下载影视APP，推荐越多的好友获得更多VIP天数</p>
            <div style={{padding: '18px 0px 16px 0px', width: '100%'}}>
              <div onClick={copyToClipboard} style={{
                cursor: 'pointer',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '13px 22px'
              }}>
                <div style={{
                  color: '#FAC33D',
                  fontFamily: 'PingFang SC',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '500'
                }} id="yanzhengma">
                  {code}
                </div>
                <div style={{
                  fontFamily: 'PingFang SC',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  复制邀请码
                  <Image style={{paddingLeft: '6px'}} width={25} height={25}
                         src={CopyIcon} alt="copy"/>
                </div>
              </div>
            </div>
            <div className="pt-3">
              <p className="pb-3 text-xs">下载并安装APP后，输入邀请码可获得VIP会员</p>
              <div onClick={navigateDownload}
                   className="flex bg-[#FAC33D] gap-2 rounded-lg p-3 justify-center items-center">
                <Image width={20} src={DownloadIcon} alt="download"/>
                <span className="text-black text-base font-semibold">影视TV APK</span>
              </div>
              <div className="flex pt-2" style={{height: '60px'}} onClick={navigateStoreDownload}>
                <div className="flex-1 h-full">
                  <div className="p-3 h-full flex gap-2 rounded-lg bg-white justify-center items-center">
                    <Image width={20} src={AppStoreIcon} alt="app_store"/>
                    <div className="flex flex-row">
                      <span className="text-black text-base font-semibold">App Store 下载</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image width={330} height={343} src={MobileAppImage} alt="App Image"/>
      </div>
    </>
  );
}