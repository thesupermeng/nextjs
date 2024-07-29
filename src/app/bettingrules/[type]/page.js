'use client';
import { isWeb } from '@/util/common';
import { H5Page } from './H5Page';
import { WebPage } from './WebPage';

export default function Home() {
  return isWeb() ? <WebPage /> : <H5Page />;
}
