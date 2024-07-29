'use client';
import { LiveThumbnail } from './LiveThumbnail';
import Link from 'next/link';
import { isWeb } from '@/util/common';
import { useStreams } from '@/hook/user/useStreams';
import { useParams } from 'next/navigation';
import { NodataV2 } from '@/components/noDataV2';
import { useEffect, useRef, useState } from 'react';
import { setLiveCategory } from '@/store/streams';
import { useDispatch } from 'react-redux';
import { ColsObj } from '@/app/games/GameList';
import { hideRightBarContent } from '@/store/common';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { LoadingPage } from '@/components/loading';
import { FullPageContent } from '@/componentsH5/FullPageContent';

export default function Page() {
  const params = useParams();
  const ref = useRef();
  const [gridCols, setGridCols] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLiveCategory(params.type));
  }, [params?.type]);
  const { streams, isLoading } = useStreams();

  useEffect(() => {
    if (isWeb()) {
      const observer = new ResizeObserver((entries) => {
        const cols = Math.floor(entries[0].contentRect.width / 280);
        setGridCols(ColsObj[cols] || 'grid-cols-12');
      });
      if (ref.current) observer.observe(ref.current);

      return () => ref.current && observer.unobserve(ref.current);
    }
  }, [loading, isLoading]);

  useEffect(() => {
    setLoading(false);
    return () =>
      dispatch(
        hideRightBarContent(RightSidebarContantTypes.BetSlipBesidePlayer)
      );
  }, []);

  if (loading || isLoading) {
    return (
      <div className='h-[80vh]'>
        <LoadingPage />
      </div>
    );
  }

  if (streams?.length === 0) {
    return (
      <div ref={ref} className='flex w-full h-[60vh]'>
        <NodataV2 />
      </div>
    );
  }
  return (
    <>
      <div
        ref={ref}
        className={`grid overflow-y-auto text-white grid-flow-row ${
          isWeb() ? `${gridCols} gap-5` : 'my-3 grid-cols-2 gap-1.5'
        }`}
      >
        {streams?.map((record, idx) => {
          return (
            <Link
              key={record.id}
              href={`/liveplay/${record.streamer_id}`}
              className='flex flex-1'
            >
              <LiveThumbnail data={record} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
