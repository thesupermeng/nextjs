import { FollowingBlock } from '@/components/followingBlock/FollowingBlock';
import { StreamerIconRound } from '@/components/streamer/StreamerIconRound';
import { getLivePath } from '@/componentsH5/videoPlayer/VideoPlayerCenter';
import useGetCategories from '@/hook/user/useGetCategories';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';

const FollowingListItem = ({ item }) => {
  const { categoryIcons } = useGetCategories();
  const router = useRouter();
  const { t } = useTranslation();

  const gotoLiveRoom = () => {
    router.push(getLivePath(item?.id));
  };
  return (
    <div
      className='flex px-2 justify-between items-center'
      onClick={gotoLiveRoom}
    >
      <div className='flex gap-x-2.5 items-center'>
        <StreamerIconRound
          liveIcon={categoryIcons?.[item?.live?.category_id]}
          key={item?.id}
          img={item?.avatar}
          isFocus={true}
          isFollowing={true}
          isLive={item?.is_live}
        />

        <div>
          <p className='text-white font-bold'>{item?.nickname}</p>
          <p className='text-xs  text-[#96979B]'>
            {item?.follower_count + ' '}{t('followers').toLowerCase()}
          </p>
        </div>
      </div>
      <FollowingBlock id={item?.id} />
    </div>
  );
};

export default FollowingListItem;
