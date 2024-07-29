'use client';

import { H5Only } from '@/components/Fragments/EnvComponent';
import { LoadingPage } from '@/components/loading';
import { NavFooter } from '@/componentsH5/NavFooter/NavFooter';
import { LocalStorageKeys } from '@/config/common';
import { useFBToken } from '@/hook/FB/useFBToken';
import useUser from '@/hook/user/useUser';
import { isWeb } from '@/util/common';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useOffsetPosition } from '@/hook/useOffsetPosition';

export default function Page() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const { FBToken, serverInfo = {} } = useFBToken();
  const { user } = useUser();
  const ref = useRef(null);
  const { t } = useTranslation();
  const { checkOffset, setFbIframeHeight } = useOffsetPosition();

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setSize({
        w: entries[0].contentRect.width,
        h: entries[0].contentRect.height,
      });
    });
    observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const [urlSrc, setUrlSrc] = useState('');

  useEffect(() => {
    const token = FBToken || 'guestMode';
    const pcAddress = isWeb() ? serverInfo.pcAddress : serverInfo.h5Address;
    const nickname = user?.username || t('anonymous');
    const apiSrc = serverInfo.apiServerAddress;
    const pushSrc = serverInfo.pushServerAddress;
    const virtualAddress = serverInfo.virtualAddress;
    const platformName = t('eastrich'); //"FB体育";
    const icoUrl = ''; //"https://fsports.co/favicon.ico";
    const handicap = ''; //"1"（盘口名称，不传则默认欧洲盘）;
    const language = 'ENG'; //"CMN"（多语言，不传则默认中文）;
    const color = 'dark'; // "dark"（日间/黑夜模式，不传则默认黑夜模式）;
    const cid = sessionStorage?.getItem(LocalStorageKeys.FbCurrency);
    const themeBg = 'DE173E';

    const themeText = `{"h5FgColor":"DE173E","pcFgColor":"DE173E"}`;

    const str = Object.entries({
      token,
      nickname,
      virtualSrc: virtualAddress,
      apiSrc,
      pushSrc,
      platformName,
      icoUrl,
      handicap,
      language,
      color,
      currencyId: cid,
      themeBg,
      themeText,
    })
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
    const URL_SRC = pcAddress ? `${pcAddress}/index.html#/?${str}` : '';
    setUrlSrc(URL_SRC);
  }, [serverInfo, FBToken, user]);

  return (
    <>
      <div
        style={{ marginTop: isWeb() ? '' : `${checkOffset(6)}rem` }}
        className={`text-white relative rounded-xl ${isWeb() ? '' : ''}`}
      >
        <div
          ref={ref}
          style={{
            minHeight: isWeb()
              ? 'calc(100vh - 15rem)'
              : `calc(100vh - ${setFbIframeHeight(10)}rem)`,
          }}
          className={`relative overflow-x-auto overflow-y-auto w-full ${
            isWeb() ? '' : ``
          }`}
        >
          {urlSrc ? (
            <iframe
              style={{
                width: `${isWeb() ? Math.max(1300, size.w - 40) : size.w}px`,
                height: `${isWeb() ? size.h : size.h}px`,
              }}
              className='absolute top-0 bottom-0 left-0 right-0'
              name='iframe'
              allowFullScreen={false}
              webkitallowfullscreen='false'
              mozallowfullscreen='false'
              allowtransparency='false'
              auto='autoplay'
              // muted={false}
              src={urlSrc}
            />
          ) : (
            <div className='absolute top-0 bottom-0 left-0 right-0'>
              <LoadingPage />
            </div>
          )}
        </div>
      </div>
      <H5Only>
        <NavFooter />
      </H5Only>
    </>
  );
}

const sampleData = {
  token: 'tt_74WV6xU0ynSekNGRFjNCITwbZ7Sibu3L.5377509b7d2350941f93804215e13aa2',
  serverInfo: {
    apiServerAddress: 'https://app.server.st-newsports.com',
    h5Address: 'https://h5.st-newsports.com',
    pcAddress: 'https://pc.st-newsports.com',
    pushServerAddress: 'wss://sptph.server.st-newsports.com',
    virtualAddress: 'https://virapp.server.st-newsports.com',
  },
  themeBgColor: '#05259D',
  themeFgColor: '#4C6FFF',
};
