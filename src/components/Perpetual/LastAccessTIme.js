import { LocalStorageKeys } from '@/config/common';

export const getAwayDuration = () => {
  const nowTime = new Date().getTime();
  const storageTime =
    localStorage.getItem(LocalStorageKeys.LastAccessTime) || 0;
  return nowTime - parseInt(storageTime);
};
export const updateLastAccessTime = () => {
  const nowTime = new Date().getTime();
  localStorage.setItem(LocalStorageKeys.LastAccessTime, nowTime);
};
