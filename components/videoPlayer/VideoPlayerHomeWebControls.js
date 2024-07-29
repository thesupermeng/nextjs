import Image from 'next/image';
import FullScreen from './controlElements/FullScreen';
import Mute from './controlElements/Mute';
import BetCoinIcon from '../betSlipBesidePlayer/BetCoinIcon';
import { forwardRef } from 'react';
import { ViewerIcon } from '@/asset/icons';
import {
  VideoPlayerCenter,
  getLivePath,
} from '@/componentsH5/videoPlayer/VideoPlayerCenter';
import { useRouter } from 'next/navigation';
import { getFollowerCount } from '@/util/numbers';
import { ChatBulletCtrl } from './controlElements/ChatBulletCtrl';

const VideoPlayerHomeWebControls = forwardRef(
  ({ streamData, onClick }, ref) => {
    VideoPlayerHomeWebControls.displayName = 'VideoPlayerHomeWebControls';
    const visibleCondition = 'invisible group-hover/player:visible';

    const router = useRouter();
    const gotoLiveRoom = () => {
      router.push(getLivePath(streamData?.streamer_id));
    };

    return (
      <>
        <div
          onClick={() => {
            window.tayaPlayer?.play();
            gotoLiveRoom();
          }}
          className={`${visibleCondition} flex absolute top-0 bottom-0 left-0 right-0 items-center justify-center`}
        >
          <>
            <VideoPlayerCenter id={streamData?.streamer_id} />
          </>
        </div>
        <div
          className={`${visibleCondition} flex flex-initial absolute bottom-0 left-0 right-0 flex-col items-start justify-center text-white px-6 pb-5 gap-1 bg-gradient-to-t from-black/100 to-black-70`}
        >
          <div className='text-[#DCDFE3] text-base font-normal leading-5'>
            {streamData?.match?.league_name_en}
          </div>
          <div className='text-[#FAFAFB] text-2xl font-bold leading-8'>
            {streamData?.title}
          </div>
          <div className='flex flex-initial self-stretch flex-row gap-4 items-start justify-around'>
            <div className='flex flex-1 flex-col gap-3'>
              <div className='flex flex-initial items-center gap-3'>
                <div className='flex-1 bg-tayaRed rounded-[5rem] h-1'></div>
                {/* <div className='flex-initial text-sm font-medium leading-5'>
                12:43
              </div> */}
              </div>
              <div className='flex flex-initial justify-between'>
                <div className='flex flex-row items-center'>
                  <div className='p-1 px-2 bg-tayaRed rounded-[0.25rem] text-sm font-medium flex-initial'>
                    LIVE
                  </div>
                  <div className='ml-3 py-1 px-2 items-center rounded-[6.25rem] bg-black/50 backdrop-blur-[2px] flex flex-row gap-1'>
                    <Image
                      alt='viewer'
                      src={ViewerIcon}
                      className='w-[22px] h-[14px]'
                    />
                    {getFollowerCount(streamData?.current_view) || 0}
                  </div>
                </div>
                <div className='flex flex-row items-center gap-3'>
                  <ChatBulletCtrl />
                  <Mute onClick={onClick} />
                  <FullScreen onClick={onClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default VideoPlayerHomeWebControls;
