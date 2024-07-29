'use client';
import {DownloadBackgroundImage} from '@/asset/image';
import useGetConfig from '@/hook/user/useGetConfig';
import { getMobileOperatingSystem } from '@/util/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {AndroidIcon, AppImage, AppleStoreIcon, Logo} from '@/asset/icons';
import QRCode from 'qrcode.react';
import {useSelector} from 'react-redux';

export default function Download() {
  const { config } = useGetConfig();
  // const router = useRouter();
  const getIsUserChina = (state) => state.yingshiScreen.isUserChina;
  const isUserChina = useSelector(getIsUserChina);
  const [iosLink, setIosLink] = useState(
    'https://apps.apple.com/cn/app/id6474402534'
  );
  useEffect(() => {
    try {
      setIosLink(isUserChina.link_jump);
    } catch (e) {
      setIosLink('https://apps.apple.com/cn/app/id6474402534');
    }
  }, [isUserChina]);

  // useEffect(() => {
  //   const userMobileOS = getMobileOperatingSystem();
  //
  //   if (config) {
  //     if (userMobileOS === 'Android' || userMobileOS === 'Windows Phone') {
  //       window.location.href = config?.download_url?.android;
  //     } else if (userMobileOS === 'iOS') {
  //       window.location.href = config?.download_url?.ios;
  //     } else {
  //       window.location.href = '/';
  //     }
  //   }
  // }, [config]);

  return (
    <div className="relative w-full grow flex justify-center items-center">
      <Image
        src={DownloadBackgroundImage}
        alt="downloadPageBg"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="flex space-x-10 z-10">
        <div className='flex-1 flex flex-col justify-center items-center pr-2 gap-y-2'>
          <Image alt='影视TV' src={Logo} width={200}/>
          <span className='text-m'>海量高清视频免费观看</span>
          <div className='flex flex-row gap-x-5 pt-2'>
            <div className='flex flex-col items-center gap-2'>
              <div className='flex flex-row  items-center'>
                <Image alt='appleStore' src={AppleStoreIcon} width={25}/>
                <span className='text-m'>iOS App 下载</span>
              </div>
              <QRCode
                className='rounded-md'
                value={iosLink}
                renderAs='canvas'
                size={220}
                includeMargin={true}
              />
            </div>
            <div className='flex flex-col items-center gap-2'>
              <div className='flex flex-row items-center'>
                <Image alt='playStore' src={AndroidIcon} width={25}/>
                <span className='text-m'>安卓 App 下载</span>
              </div>
              <QRCode
                className='rounded-md'
                value='https://oss.yingshi.tv/assets/yingshi.apk'
                renderAs='canvas'
                size={220}
                includeMargin={true}
              />
            </div>
          </div>
          <span className='text-m'>扫码下载 <span className={'text-[#FAC33D]'}>影视TV</span> APP</span>
        </div>
        <Image src={AppImage} alt="App Image" width={290} height={290}/>
      </div>
    </div>
  );
}


