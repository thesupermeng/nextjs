import { isWeb } from '@/util/common';
import { useSelector } from 'react-redux';
import { NewsTicker } from '../newsTicker/NewsTicker';
import { useMessageClick } from '@/app/liveplay/[streamerId]/useMessageClick';

// matchSid
// 1: soccor
// 3: basketball
// score of soccer is at top

export const VideoAnnTextOverlay = () => {
  const matchSid = useSelector((s) => s.common.matchSid);
  const topOverlayAnnContent = useSelector(
    (s) => s.videoPlayerMisc.topOverlayAnnContent
  );
  const bottomOverlayAnnContent = useSelector(
    (s) => s.videoPlayerMisc.bottomOverlayAnnContent
  );

  return (
    <>
      {topOverlayAnnContent?.data && matchSid !== 1 && (
        <VideoAnnTextScroll announcement={topOverlayAnnContent} />
      )}
      {bottomOverlayAnnContent?.data && matchSid !== 3 && (
        <VideoAnnTextScroll isBottom announcement={bottomOverlayAnnContent} />
      )}
    </>
  );
};

const VideoAnnTextScroll = ({ isBottom, announcement = {} }) => {
  const { onClickMessage } = useMessageClick();
  const onClickScrollText = (e, data) => {
    e.preventDefault();
    onClickMessage(data);
  };

  return (
    <>
      <div
        className={`absolute w-full bg-gradient-to-r from-[#1B298D] to-[#0B0D44] overflow-hidden cursor-pointer ${
          isBottom ? 'bottom-0' : 'top-0'
        }`}
        onClick={(e) => {
          onClickScrollText(e, announcement);
        }}
      >
        <NewsTicker always>
          <div
            className={`text-white whitespace-nowrap ${
              isWeb() ? 'py-3' : 'text-[12px] py-1'
            }`}
          >
            {announcement?.data?.text}
          </div>
        </NewsTicker>
      </div>
    </>
  );
};
