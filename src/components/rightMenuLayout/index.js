import React from 'react';
import { RightBetCartWidth } from '@/app/page';
import { H5Only, WEBOnly } from '../Fragments/EnvComponent';
import { ScrollContentVertical } from '../ScrollContentVertical';

export const RightMenuLayout = ({ className = '', children, show = true }) => {
  return (
    <>
      <WEBOnly>
        <div
          className={`${className} ${
            show ? RightBetCartWidth : 'w-0'
          } common-transition flex flex-col flex-1 overflow-y-auto fixed z-30 right-0 top-0 bottom-0 bg-[#0e0f11] opacity-100`}
        >
          {children}
        </div>
      </WEBOnly>
      <H5Only>
        <ScrollContentVertical className={className}>
          {children}
        </ScrollContentVertical>
      </H5Only>
    </>
  );
};
