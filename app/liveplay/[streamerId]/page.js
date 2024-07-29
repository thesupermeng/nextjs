'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { useStreamer } from '@/hook/user/useStreamer';

import { setFocusStreamId } from '@/store/streams';

import { isWeb } from '@/util/common';

import { LiveEnd } from './LiveEnd';
import { LiveEndH5 } from './LiveEndH5';
import { useGenericLogs } from '@/hook/useGenericLogs';
import { LivePage } from './LivePage';
import { LivePageH5 } from './LivePageH5';
import { LoadingPage } from '@/components/loading';
import { useLiveRoomMessages } from './useLiveRoomMessages';
import { useStreamGameList } from '@/hook/streamGames/useStreamGameList';

export default function Page({ params }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFocusStreamId(params.streamerId));
  }, [params.streamerId]);
  const { streamer, isLoading } = useStreamer();

  useLiveRoomMessages({ hasAudio: true });
  const router = useRouter();
  useGenericLogs();
  useStreamGameList();
  if (isLoading && !isWeb()) {
    return (
      <div className='fixed inset-0'>
        <LoadingPage />
      </div>
    );
  }

  if (streamer?.id === params.streamerId && streamer.streamerVoid) {
    router.push('/home');
  } else if (streamer?.id && streamer.is_live === false) {
    return isWeb() ? (
      <LiveEnd streamer={streamer} />
    ) : (
      <LiveEndH5 streamer={streamer} />
    );
  } else {
    return isWeb() ? (
      <LivePage streamer={streamer} />
    ) : (
      <LivePageH5 streamer={streamer} />
    );
  }
  return null;
}
