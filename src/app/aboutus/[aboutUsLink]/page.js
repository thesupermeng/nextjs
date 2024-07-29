import { isWeb } from '@/util/common';
import React from 'react';
import WebPage from './WebPage';
import H5Page from './H5Page';

export default function Page() {
  return isWeb() ? <WebPage /> : <H5Page />;
}
