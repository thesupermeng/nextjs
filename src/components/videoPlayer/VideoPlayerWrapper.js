'use client';
import { useEffect, useRef, useState } from 'react';
// import { VideoFlvPlayer } from './VideoFlvPlayer';
import { VideoJSPlayer } from './VideoJSPlayer';
import { usePathname } from 'next/navigation';
import ErrorBoundary from './ErrorBoundary';
import useDraggable from 'use-draggable-hook';
import { VideoAnnTextOverlay } from './VideoAnnTextOverlay';
import { LiveChatBulletMessages } from './LiveChatBulletMessages';
import { useSelector } from 'react-redux';
import { MiniFollowBetContainer } from '../followBet/miniFollowBetContainer';

const MiniPlayerWidth = 220;
const MiniPlayerHeight = 123.75;
export default function VideoPlayerWrapper({
  isMini,
  onCloseMini = () => {},
  onClick,
  src,
  children,
  isActive = true,
  id,
}) {
  // const dispatch = useDispatch();
  const vpRef = useRef(null);
  // const isFlvSupported = useSelector((s) => s.common.isFlvSupported);
  // const { focusStream } = useFocusStream();
  // const isLiveFullScreen = useLiveFullScreenStatus();
  // const showThumbnail = useSelector((s) => s.videoPlayer.showThumbnail);
  const pathname = usePathname();
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [showBullet, setShowBullet] = useState(true);
  useEffect(() => {
    setScreenWidth(document.documentElement.clientWidth);
    setScreenHeight(document.documentElement.clientHeight);
  }, []);
  // const MiniPlayerWidth = useMemo(() => {
  //   return Math.floor((screenWidth * 2) / 3);
  // }, [screenWidth]);
  const isInLiveRoom = pathname.startsWith('/liveplay');
  // const isVJSError = useSelector((s) => s.videoPlayer.isError);
  const showChatBullet = useSelector((s) => s.videoPlayerMisc.showChatBullet);

  const { target: playerContainerRef, setPosition } = useDraggable({
    stepSize: 10,
    maxDistance: {
      x: {
        max: screenWidth - MiniPlayerWidth,
        min: 0,
      },
      // y: { max: screenHeight - MiniPlayerWidth * 1.5, min: 0 },
      y: { max: screenHeight - MiniPlayerHeight, min: 50 },
    },
    setCSS: isMini,
  });
  useEffect(() => {
    try {
      if (!isMini) {
        playerContainerRef.current.style.transform = '';
      } else {
        setPosition([0, 50]);
      }
    } catch (e) {
      /* empty */
    }
  }, [isMini, setPosition]);
  useEffect(() => {
    setShowBullet(false);
    setTimeout(() => {
      setShowBullet(true);
    }, 10);
  }, [src]);
  return (
    <div
      onClick={() => {
        !isMini && onClick?.();
      }}
      style={isMini ? { width: MiniPlayerWidth } : {}}
      ref={playerContainerRef}
      className={`video-wrapper relative flex ${
        isMini
          ? `aspect-[16/9]`
          : isInLiveRoom
          ? 'w-full h-full'
          : 'w-full h-auto aspect-video'
      } flex-row items-center justify-center rounded-xl group/player`}
    >
      {/* {isFlvSupported === 1 ? (
        <VideoFlvPlayer
          ref={vpRef}
          link={src?.flv}
          isActive={isActive}
          id={id}
        />
      ) : isFlvSupported === -1 ? ( */}
      <ErrorBoundary key={`error-${id}`}>
        <VideoJSPlayer
          ref={vpRef}
          link={src}
          isActive={isActive}
          id={id}
        />
      </ErrorBoundary>
      {/* ) : null} */}

      {/* {(focusStream?.img_url || focusStream?.streamer?.cover_image) &&
        !isLiveFullScreen &&
        showThumbnail && (
          <Image
          src={
            focusStream?.img_url
            ? focusStream?.img_url
            : focusStream?.streamer?.cover_image
          }
          className={`absolute object-contain pointer-events-none ${
            isWeb()
            ? 'z-1'
            : // isFlvSupported === 1 ? 'z-0' :
            isVJSError
            ? 'z-10'
            : 'z-[-1]'
          }`}
          fill
          />
        )} */}

      {/* below are all pos absolute */}
      {!isMini && (
        <>
          <VideoAnnTextOverlay />
          {showChatBullet && showBullet && (
            <>
              <LiveChatBulletMessages />
            </>
          )}
          <MiniFollowBetContainer show={showChatBullet && showBullet} />
        </>
      )}

      {children}
    </div>
  );
}
