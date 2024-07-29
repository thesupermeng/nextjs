'use client';
import { isWeb } from '@/util/common';

const Layout = ({ children }) => {
  return isWeb() ? null : children;
};
export default Layout;
