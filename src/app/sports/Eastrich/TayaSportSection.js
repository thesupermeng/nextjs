import { IconArrowWhite } from '@/asset/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { isWeb } from '@/util/common';
import { convertTimeStampToDate } from '@/util/date';
import { TayaOutright } from './TayaOutright';
import TayaSportSingleMatch from './TayaSportSingleMatch';

const web = isWeb();

export const TayaSportSection = ({ lg, list = [], allExpand }) => {
  const [isExpand, setIsExpand] = useState(true);
  const { matchPlayType } = useSelector((s) => s.sportsTaya);
  const { showRightSidebar } = useSelector((s) => s.common);
  const { isLeftSideBarExpanded } = useSelector((s) => s.common);
  const { t } = useTranslation();
  const outrightEndDate = list?.[0]?.bt;

  useEffect(() => {
    setIsExpand(allExpand);
  }, [allExpand]);

  return (
    <div
      className={`flex flex-col items-center flex-initial pb-0 rounded-2xl bg-tayaGrey ${
        web ? 'p-5' : 'py-4 px-2'
      } 
      ${
        web &&
        (showRightSidebar && isLeftSideBarExpanded
          ? 'max-w-[calc(100vw-32rem-17rem-6rem)]'
          : showRightSidebar
          ? 'max-w-[calc(100vw-32rem-13rem)]'
          : isLeftSideBarExpanded
          ? 'max-w-[calc(100vw-22rem)]'
          : 'max-w-[calc(100vw-12rem)]')
      }
      `}
    >
      <div
        onClick={() => {
          setIsExpand((a) => !a);
        }}
        className='flex items-center self-stretch justify-between flex-1 mb-5 cursor-pointer'
      >
        <div className='flex flex-row items-center gap-2'>
          {lg?.lurl && (
            <Image alt='flag' src={lg.lurl} width={24} height={24} />
          )}
          <div className={`flex ${!web ? 'text-[15px]' : ''}`}>
            {lg?.na} (
            {matchPlayType === 7 ? list?.[0]?.mg?.length || 1 : list.length})
          </div>
        </div>

        <div className='flex flex-row items-center gap-2'>
          {web && matchPlayType === 7 && outrightEndDate && (
            <div className='text-sm text-[#96979B]'>
              {t('endDate')} {convertTimeStampToDate(outrightEndDate)}
            </div>
          )}

          <Image
            className={`w-4 h-4 transition-transform duration-500 ease-in-out ${
              isExpand ? 'rotate-180' : 'rotate-0'
            }`}
            src={IconArrowWhite}
            alt='expand'
            width={80}
            height={37}
            priority
          />
        </div>
      </div>

      <div
        className={`flex flex-col flex-initial pb-4 overflow-hidden justify-stretch self-stretch transition-[max-height] duration-500 ease-in-out gap-5 
        ${web ? 'px-5' : 'px-2'} ${isExpand ? 'max-h-auto' : 'max-h-0 hidden'}`}
      >
        {matchPlayType === 7
          ? list?.[0]?.mg?.map((match, idx) => {
              return (
                <TayaOutright
                  key={`${match.id}${idx}`}
                  match={list?.[0]}
                  data={match}
                />
              );
            })
          : list.map((match, idx) => {
              return (
                <TayaSportSingleMatch
                  key={`${match.id}${idx}`}
                  match={match}
                  nsg={match?.nsg}
                />
              );
            })}
      </div>
    </div>
  );
};
