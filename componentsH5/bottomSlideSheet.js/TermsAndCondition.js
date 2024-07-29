import useGetConfig from '@/hook/user/useGetConfig';
import useHtmlContent, { HtmlType } from '@/hook/useHtmlContent';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { isWeb } from '@/util/common';

export const TermsAndCondition = ({ onAgree }) => {
  const [isBottom, setIsBottom] = useState(false);
  const { config } = useGetConfig();
  const { htmlContent} = useHtmlContent(HtmlType.tc);
  const { t } = useTranslation();

  const onScroll = (e) => {
    try {
      const { clientHeight, scrollHeight, scrollTop } = e.target;
      setIsBottom(scrollHeight - clientHeight - scrollTop < 10);
    } catch (e) {}
  };

  const Btn = ({ title, type, disabled = true, onClick }) => {
    const [style, setStyle] = useState('');
    useEffect(() => {
      if (type === 'N') {
        setStyle('bg-[#222] text-white');
      } else if (disabled) {
        setStyle('bg-[#DE173E52] text-[#969696]');
      } else {
        setStyle('bg-tayaRed text-white');
      }
    }, [type, disabled]);
    return (
      <button
        onClick={onClick}
        className={`flex flex-1 items-center justify-center py-4 rounded-md cursor-pointer ${style}`}
      >
        {title}
      </button>
    );
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.isEnd) {
        setIsBottom(true);
      }
    };
    window.addEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <style>
        {`   
          .terms-pop::-webkit-scrollbar-thumb {
            background-color: #d9d9d966 !important;
            color: #d9d9d966 !important;
            border-radius: 500rem !important;
            height: 50px;
          }
          .terms-pop::-webkit-scrollbar {
            -webkit-appearance: none !important;
            width: 15px !important;
          }
          p, div, ul li, ol li {
            font-size: 12px;
            margin-bottom: 13px;
          }
          br {
            content: '';
            display: block;
            height: 10px;
          }
        `}
      </style>

      <div
        className={`flex flex-col bg-yellow ${
          isWeb() ? 'px-9 flex-[1_0_0] overflow-y-auto' : 'px-0 h-[85vh] flex-1'
        }`}
      >
        <p className='p-0 text-center font-bold'>{t('termsAndConditions')}</p>
        <div
          onScroll={onScroll}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className='flex-1 bg-transparent overflow-y-auto terms-pop'
        />
        {/*<iframe src='/html/Taya_T&C.html' className='flex-1 !text-white' />*/}
        <div className='flex flex-initial flex-row items-center justify-stretch gap-4 py-4'>
          {config?.toggle?.['t&c'] === 'false' ? (
            <></>
          ) : (
            <Btn
              title={t('iDisagree')}
              type='N'
              onClick={() => {
                onAgree(false);
              }}
            />
          )}
          <Btn
            title={t('iAgree')}
            type='Y'
            disabled={!isBottom}
            onClick={() => {
              isBottom && onAgree(true);
            }}
          />
        </div>
      </div>
    </>
  );
};
