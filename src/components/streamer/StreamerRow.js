import useGetCategories from '@/hook/user/useGetCategories';
import { setFocusStreamId } from '@/store/streams';
import { useDispatch, useSelector } from 'react-redux';
import ScrollContentHorizontal from '../ScrollContentHorizontal';
import { StreamerIconRound } from './StreamerIconRound';

export default function StreamerRow({ streams = [] }) {
  const { focusStreamId } = useSelector((s) => s.streams);
  const dispatch = useDispatch();
  const { categoryIcons } = useGetCategories();
  const { isLeftSideBarExpanded } = useSelector((s) => s.common);
  // leftSideBarWidth = 117px (non-expanded), 272px (expanded)
  // rightBetCartWidth = 512px

  return (
      <div className={`flex flex-initial px-6  py-14 ${isLeftSideBarExpanded ? 'max-w-[calc(100vw-272px-512px)]' : 'max-w-[calc(100vw-117px-512px)]'} overflow-x-auto`}>
        {/* <ScrollContentHorizontal> */}
        <div className='flex flex-row flex-initial items-center justify-start gap-3 px-3 pb-1'>
          {streams.map((stream) => {
            return (
              <StreamerIconRound
                key={stream.streamer_id}
                img={stream.streamer?.avatar}
                size={stream.streamer_id == focusStreamId ? 56 : 50}
                isFocus={stream.streamer_id == focusStreamId}
                onClick={() => {
                  dispatch(setFocusStreamId(stream.streamer_id));
                }}
                liveIcon={categoryIcons?.[stream.category_id]}
              />
            );
          })}
        </div>
        {/* </ScrollContentHorizontal> */}
      </div>
  );
}
