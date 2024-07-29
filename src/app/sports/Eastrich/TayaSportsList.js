import { loadingGIF, taya_loading } from '@/asset/gif';
import { TayaSportOutRightH5 } from '@/componentsH5/tayaSportOutRightH5/TayaSportOutRightH5';
import { useTayaSportsList } from '@/hook/useTayaSportsList';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { TayaSportSection } from './TayaSportSection';
import { LoadingPage } from '@/components/loading';

export default function TayaSportsList({ allExpand }) {
  const { list, isLoading } = useTayaSportsList();
  const [leagues, setLeagues] = useState([]);
  const { matchPlayType } = useSelector((s) => s.sportsTaya);
  const { t } = useTranslation();

  useEffect(() => {
    const final =
      list?.reduce((arr, cur) => {
        // group all matches by leagues
        if (cur.lg.id === arr?.slice(-1)[0]?.slice(-1)[0]?.lg?.id) {
          arr[arr.length - 1].push(cur);
        } else {
          arr.push([cur]);
        }
        return arr;
      }, []) || [];
    setLeagues((l) => {
      return JSON.stringify(l) === JSON.stringify(final) ? l : final;
    });
  }, [list]);

  if (isLoading) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <Image
          src={loadingGIF}
          width={100}
          height={100}
          alt='loading'
          className='self-center'
        />
      </div>
    );
  }

  return matchPlayType === 7 && !isWeb() ? (
    <TayaSportOutRightH5 list={list} />
  ) : (
    <div className='mt-4 flex flex-1 flex-col gap-5'>
      {leagues?.map((lgs, idx) => {
        return (
          <TayaSportSection
            key={idx}
            lg={lgs?.[0]?.lg}
            list={lgs}
            allExpand={allExpand}
          />
        );
      })}
      <p className='text-[11px] opacity-50 text-center my-2'>
        {t('bettingOddsProvideByFBSports')}
      </p>
    </div>
  );
}
