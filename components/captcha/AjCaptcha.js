import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CrossWhite } from '@/asset/icons';
import useGetConfig from '@/hook/user/useGetConfig';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { LottieAnimation } from '../lottie';
import { IrrLoading } from '@/asset/lottie';

export const CaptchaIframe = () => {
  const [loading, setLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const { config } = useGetConfig();
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    setShowCaptcha(false);
  }, [pathname]);

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        if (
          messageData.code === 0 &&
          messageData.data.token &&
          messageData.data.point_json
        ) {
          window.captchaJson = messageData.data;
          window.dispatchEvent(new Event('captchaJson'));
          window.removeEventListener('message', handleMessage);
          setShowCaptcha(false);
        }
      } catch (e) {}
    };

    const handleShowCaptcha = () => {
      setShowCaptcha(true);
      setLoading(true);
      window.addEventListener('message', handleMessage);
    };
    window.addEventListener('showCaptcha', handleShowCaptcha);
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('showCaptcha', handleShowCaptcha);
    };
  }, []);
  return showCaptcha ? (
    <div
      style={{
        transform: `scale(${
          window.innerWidth < 558 ? window.innerWidth / 560 : 1
        })`,
      }}
      className='fixed inset-0 z-[60] flex items-center justify-center'
    >
      <div className='relative flex flex-initial items-center justify-center gap-3'>
        <div className='shadow-lg bg-[#121212] rounded-[28px] p-10 text-center flex flex-1 flex-col w-[487px] h-[392px]'>
          <p className='font-bold text-[20px]'>{t('verification')}</p>
          {config?.captcha?.url ? (
            <div className='flex flex-1 mt-5'>
              <iframe
                onLoad={() => {
                  setLoading(false);
                }}
                src={config.captcha.url}
                title='Captcha'
                className='rounded-[5px]'
                style={{
                  border: 'none',
                  width: '100%',
                }}
              ></iframe>
            </div>
          ) : null}
        </div>
        <Image
          src={CrossWhite}
          width={40}
          alt='close'
          className='absolute top-5 right-5 cursor-pointer opacity-20 hover:opacity-100 '
          onClick={() => setShowCaptcha(false)}
        />
        {loading && (
          <LottieAnimation
            src={IrrLoading}
            tw={`w-[${60}px] h-[${60}px] absolute`}
            isLoop={true}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default CaptchaIframe;
