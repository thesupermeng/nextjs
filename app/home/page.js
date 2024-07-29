'use client';
import { isWeb } from '@/util/common';
import { H5Page } from './h5Page';
import { WebPage } from './webPage';
import { useLiveRoomMessages } from '../liveplay/[streamerId]/useLiveRoomMessages';

export default function Home() {
  // todo: if no single stream
  // todo how to get stared streams
  useLiveRoomMessages({ hasAudio: false });
  return isWeb() ? <WebPage /> : <H5Page />;
}
