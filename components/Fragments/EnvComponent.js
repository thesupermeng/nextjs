import { isWeb } from '@/util/common';

const showWeb = isWeb();

export const H5Only = ({ children }) => {
  return !showWeb ? children : null;
};
export const WEBOnly = ({ children }) => {
  return showWeb ? children : null;
};
