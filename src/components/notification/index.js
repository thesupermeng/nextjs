import React from 'react';
import { NotificationList } from './notificationList';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { RightBetCartWidth } from '@/app/page';
import { useSelector } from 'react-redux';

export const Notification = () => {
  const { rightBarContent } = useSelector((s) => s.common);

  return (
    <div
      className={`fixed z-30 right-0 top-0 bottom-0 bg-black opacity-100 ${
        rightBarContent[RightSidebarContantTypes.Notification]
          ? RightBetCartWidth
          : 'h-0 w-0 opacity-0 pointer-events-none overflow-hidden'
      } flex flex-col flex-1 gap-6 common-transition `}
    >
      <NotificationList />
    </div>
  );
};
