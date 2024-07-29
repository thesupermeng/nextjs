import { LiveThumbnail } from '@/app/live/[type]/LiveThumbnail';
import { FollowingBlock } from '@/components/followingBlock/FollowingBlock';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { getFollowerCount } from '@/util/numbers';
import { ImageWithFallback } from '@/components/fallbackImage';

export const LiveEndH5 = ({ streamer }) => {
  const { t } = useTranslation();
  return (
    <>
      <FullPageContent>
        <div
          style={{ backgroundImage: `url(${streamer.avatar})` }}
          className='absolute inset-0'
        />
        <div className='flex flex-1 flex-col absolute inset-0 bg-black/80 backdrop-blur-md'>
          <div className='flex flex-initial flex-col'>
            <NavHeader betslip className='bg-transparent' />
            <div className='flex flex-initial flex-col items-center justify-center py-2 text-white'>
              <div className='text-[20px] font-bold mb-3.5'>{t('liveEnd')}</div>
              <div className='text-[18px] font-semibold mb-1'>
                {streamer?.nickname}
              </div>
              <div className='text-[#96979B] text-sm font-normal mb-4'>
                {getFollowerCount(streamer?.follower_count)}&nbsp;
                {t('followers')}
              </div>
              {streamer?.avatar && (
                <ImageWithFallback
                  alt='icon'
                  src={streamer.avatar}
                  width={100}
                  height={100}
                  className='w-[50px] h-[50px] rounded-full mb-5'
                />
              )}
              <FollowingBlock id={streamer.id} />
              <div className='h-10' />
              <div className='text-[17px] font-bold'>{t('youMayAlsoLike')}</div>
            </div>
          </div>
          <div className='flex-[1_0_0] overflow-y-auto items-stretch mx-2'>
            <div className='grid grid-flow-row grid-cols-2 gap-2'>
              {streamer.recommends?.map((str) => {
                return (
                  <Link
                    key={str.id}
                    href={`/liveplay/${str.streamer_id}`}
                    className='flex flex-1'
                  >
                    <LiveThumbnail key={str.id} data={str}></LiveThumbnail>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </FullPageContent>
    </>
  );
};

const samplestream = {
  id: 1000002,
  nickname: 'Wtf',
  follower_count: 0,
  avatar: 'https://static.zbstg.co/img/user/kyc/kyc-20230910153209-XdoCcl.jpg',
  cover_image:
    'https://static.zbstg.co/img/user/1000002/cover_image/1000002-cover_image-20230925104623-XAh6ze.jpg',
  stream_count: 0,
  is_live: true,
  live: {
    id: 59,
    title: 'zhuzhubaobei',
    streamer_id: 1000002,
    match_id: 0,
    status: 2,
    src: 'https://pullstg.bolatvlive.com/live/140f6969d5213fd0ece03148e62e461e.flv?auth_key=1696314231-5aa36e8fd549445c9a399b3ba19fe5e0-0-7629381ee5c2e00d9e4a9b2773f5946d',
    img_url:
      'https://static.zbstg.co/img/room_image/room_image-20231002142343-YcId12.jpg',
    schedule_time_ts: 1696227789,
    current_view: 0,
    total_view: 0,
    category_id: 6,
    category_type_id: 4,
    chat_room: 'stream:59',
  },
  gallery: [
    {
      id: 3,
      streamer_id: 1000002,
      type: 0,
      src: 'https://static.zbstg.co/img/user/322/avatar/322-avatar-20230909150232-1ZZc2U.jpg',
    },
    {
      id: 4,
      streamer_id: 1000002,
      type: 0,
      src: 'https://static.zbstg.co/img/user/kyc/kyc-20230910153209-XdoCcl.jpg',
    },
  ],
};

const sampleOffline1 = {
  id: 1000003,
  nickname: 'Streamer2',
  follower_count: 0,
  avatar: 'https://static.zbstg.co/img/user/kyc/kyc-20230910153209-XdoCcl.jpg',
  cover_image:
    'https://static.zbstg.co/img/user/kyc/kyc-20230910153209-XdoCcl.jpg',
  stream_count: 0,
  is_live: false,
  gallery: [
    {
      id: 2,
      streamer_id: 1000003,
      type: 0,
      src: 'https://static.zbstg.co/img/user/322/avatar/322-avatar-20230909150232-1ZZc2U.jpg',
    },
    {
      id: 1,
      streamer_id: 1000003,
      type: 0,
      src: 'https://static.zbstg.co/img/user/kyc/kyc-20230910153209-XdoCcl.jpg',
    },
  ],
  recommends: [
    {
      id: 59,
      title: 'zhuzhubaobei',
      streamer_id: 1000002,
      match_id: 0,
      status: 2,
      src: 'https://pullstg.bolatvlive.com/live/140f6969d5213fd0ece03148e62e461e.flv?auth_key=1696314231-5aa36e8fd549445c9a399b3ba19fe5e0-0-7629381ee5c2e00d9e4a9b2773f5946d',
      img_url:
        'https://static.zbstg.co/img/room_image/room_image-20231002142343-YcId12.jpg',
      schedule_time_ts: 1696227789,
      current_view: 0,
      total_view: 0,
      category_id: 6,
      category_type_id: 4,
      chat_room: 'stream:59',
      streamer: {
        id: 1000002,
        nickname: 'Wtf',
        follower_count: 0,
        avatar:
          'https://static.zbstg.co/img/user/kyc/kyc-20230910153209-XdoCcl.jpg',
        cover_image:
          'https://static.zbstg.co/img/user/1000002/cover_image/1000002-cover_image-20230925104623-XAh6ze.jpg',
        stream_count: 0,
        is_live: true,
      },
    },
  ],
};
