import React from 'react';
import { BottomPrivateMsgRow } from './bottomPrivateMsgRow';
import { MsgContainer } from './msgContainer';
import { isWeb } from '@/util/common';

export const ErLivechat = () => {
  return (
    <>
      <div
        className={`flex flex-col flex-1 ${
          isWeb() ? 'max-h-[700px] h-[80vh] w-[418px] bg-[#28292B]' : ''
        }`}
      >
        <MsgContainer />
        {/* <BottomPrivateMsgRow /> */}
      </div>
    </>
  );
};
