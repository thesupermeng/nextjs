'use client';
import { useGameUrl } from '@/hook/games/useGameUrl';
import { isWeb } from '@/util/common';
import { useParams } from 'next/navigation';
import { H5Page } from './h5Page';
import { WebPage } from './webPage';
import { useEffect, useState } from 'react';
import useUser from '@/hook/user/useUser';
import { useSelector } from 'react-redux';

export default function Page() {
  const params = useParams();
  useGameUrl({ game_id: params.gameId });
  const [url, setUrl] = useState('');
  const { isLogin } = useUser();
  const isRealPlay = useSelector((s) => s.games.isRealPlay);
  const { getGameUrl } = useGameUrl({ game_id: params.gameId });

  useEffect(() => {
    getGameUrl()?.then((data) => {
      console.log(data);
      setUrl(data?.data?.game_url);
    });
  }, [isRealPlay, isLogin]);

  return isWeb() ? (
    <WebPage id={params.gameId} url={url} />
  ) : (
    <H5Page id={params.gameId} url={url} />
  );
}
