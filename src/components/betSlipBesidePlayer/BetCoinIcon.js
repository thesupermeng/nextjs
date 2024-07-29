import { CoinIcon } from '@/asset/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideRightBarContent, showRightBarContent } from '@/store/common';
import { toggleFullscreen } from '@/store/videoPlayer';
import { RightSidebarContantTypes } from '../rightSideMenu';

const BetCoinIcon = () => {
  const videoPlayerProp = useSelector((s) => s.videoPlayer);
  const { showRightSidebar } = useSelector((s) => s.common);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!videoPlayerProp.isFull) {
  //     dispatch(
  //       showRightBarContent(RightSidebarContantTypes.BetSlipBesidePlayer)
  //     );
  //   } else {
  //     dispatch(
  //       hideRightBarContent(RightSidebarContantTypes.BetSlipBesidePlayer)
  //     );
  //   }
  // }, [videoPlayerProp.isFull]);

  const onClick = () => {
    dispatch(toggleFullscreen(false));
    dispatch(showRightBarContent(RightSidebarContantTypes.BetSlipBesidePlayer));

    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement
    ) {
      document.exitFullscreen() ||
        document.webkitExitFullscreen() ||
        document.msExitFullscreen() ||
        document.mozCancelFullScreen();
    }
  };

  return showRightSidebar ? (
    <></>
  ) : (
    <div
      className={`cursor-pointer absolute w-20 h-20 right-0 top-[10rem] flex items-center justify-center rounded-l-full bg-black/30 origin-top-right hover:scale-110 hover:bg-black/50 transition-transform backdrop-blur-md overflow-hidden`}
      onClick={onClick}
    >
      <Image
        alt='coin'
        width={60}
        height={60}
        src={CoinIcon}
        className='flex flex-initial w-[60px] h-[60px]'
      />
    </div>
  );
};

export default BetCoinIcon;
