'use client';
import { isWeb } from '@/util/common';
import { PageH5 } from './pageH5';
import { PageWeb } from './pageWeb';

const Layout = ({ children }) => {
  return isWeb() ? <PageWeb>{children}</PageWeb> : <PageH5>{children}</PageH5>;
};
export default Layout;
