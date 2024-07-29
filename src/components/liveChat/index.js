'use client';
import { LiveChatLicense } from '@/config/common';
import { LiveChatWidget } from '@livechat/widget-react';

export const LiveChat = () => {
  return <LiveChatWidget license={LiveChatLicense} />;
};
