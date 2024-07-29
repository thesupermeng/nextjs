import FullScreen from '@/components/videoPlayer/controlElements/FullScreen';
import Mute from '@/components/videoPlayer/controlElements/Mute';
import { PlayPause } from '@/components/videoPlayer/controlElements/PlayPause';
import { Reset } from '@/components/videoPlayer/controlElements/Reset';
import { useDurationSinceText } from '@/hook/useDurationSinceText';
import { useLiveFullScreenStatus } from '@/hook/useFullScreenStatus';
import { isWeb } from '@/util/common';
import { VideoPlayerStats } from './VideoPlayerBottomH5Btns';
import { ChatBulletCtrl } from '@/components/videoPlayer/controlElements/ChatBulletCtrl';

export const BottomBtnFullScreenSize = 32;

export const VideoPlayerBottomH5Home = ({ stream, hasControl }) => {
  const durationText = useDurationSinceText(stream?.online_at_ts * 1000);
  const isLiveFullScreen = useLiveFullScreenStatus();
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 px-3 pb-1.5 -mb-1 flex flex-col z-10 ${
        hasControl
          ? `bg-gradient-to-t from-black/100 to-white/0 ${
              isWeb() ? 'px-[2.5rem]' : ''
            }`
          : ''
      }`}
    >
      <div
        className={`text-[#DCDFE3] font-normal ${
          isWeb() ? 'text-base leading-5' : 'text-[9px] leading-2'
        }`}
      >
        {stream?.match?.league_name_en}
      </div>
      <div
        className={`text-[#FAFAFB] ${
          isWeb()
            ? 'text-2xl font-bold leading-8'
            : 'text-[11px] font-semibold leading-5'
        }`}
      >
        {stream?.title}
      </div>
      <div className='flex items-center gap-2 flex-initial justify-between h-4'>
        <div className='flex-1 h-0.5 bg-tayaRed'></div>
        <div className={`flex flex-initial text-xs`}>{durationText}</div>
        {!hasControl && <Mute />}
      </div>

      {hasControl && (
        <div
          className={`flex flex-1 ${
            isLiveFullScreen ? 'items-stretch' : 'items-center'
          } justify-between gap-1.5 mb-3`}
        >
          <PlayPause size={isLiveFullScreen ? BottomBtnFullScreenSize : 22} />
          <Reset size={isLiveFullScreen ? BottomBtnFullScreenSize : 22} />
          {/* {isLiveFullScreen && <VideoPlayerMore />} */}
          {isLiveFullScreen && <VideoPlayerStats />}
          <div className='flex-1' />
          <ChatBulletCtrl />
          <Mute />
          <FullScreen />
        </div>
      )}
    </div>
  );
};
