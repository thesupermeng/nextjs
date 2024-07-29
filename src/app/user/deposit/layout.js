import { isWeb } from '@/util/common';
import React from 'react';

export default function Layout({ children }) {
  return isWeb() ? <></> : children;
}
