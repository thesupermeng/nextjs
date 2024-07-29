import { Plus, ViewerIcon } from '@/asset/icons';
import { ProfileModalType } from '@/components/profileModal';
import { useFocusStream } from '@/hook/user/useFocusStream';
import useFollowings from '@/hook/user/useFollowings';
import { useStreamer } from '@/hook/user/useStreamer';
import useUser from '@/hook/user/useUser';
import { setProfileModal } from '@/store/common';
import { isWeb } from '@/util/common';
import { getFollowerCount } from '@/util/numbers';
import { Avatar } from '@material-tailwind/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export const VideoPlayerTopH5 = () => {
  const { focusStream } = useFocusStream();
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <div
      className={`absolute z-10 top-0 pt-3 flex flex-initial flex-row justify-between w-full px-3 items-center ${
        pathname !== '/home' ? 'bg-gradient-to-b from-black to-transparent' : ''
      }`}
    >
      {pathname !== '/home' && <StreamerInfoH5 />}
      <div className='flex gap-2'>
        <div
          className={`px-1.5 py-0.5 bg-tayaRed rounded-[0.25rem] flex items-center text-center font-medium uppercase text-[11px]`}
        >
          {t('live')}
        </div>
        <div
          className={`rounded-[6.25rem] bg-black/50 backdrop-blur-[2px] flex flex-row gap-1 text-[11px] px-1 items-center`}
        >
          <Image alt='viewer' src={ViewerIcon} className='w-[20px] h-[12px]' />
          <span className=''>
            {getFollowerCount(focusStream?.current_view) || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

const StreamerInfoH5 = () => {
  const { followList, followStreamer } = useFollowings();
  const { streamer } = useStreamer();
  const isFollowing = followList?.some((follow) => follow.id === streamer.id);
  const { isLogin } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const onFollowStreamer = (id) => {
    if (!isLogin) {
      if (isWeb()) {
        dispatch(setProfileModal(ProfileModalType.LoginModal));
      } else {
        router.push('/user/login');
      }
    } else {
      followStreamer(id);
    }
  };
  return (
    <div className='flex gap-2 items-center'>
      {isFollowing ? (
        <Image
          alt='streamer'
          src={streamer.avatar || Avatar}
          className={`object-cover rounded-full h-[2rem] w-[2rem]`}
          width={52}
          height={52}
        />
      ) : (
        <div
          className='relative border border-tayaRed p-0.5 rounded-full'
          onClick={(e) => {
            e.stopPropagation();
            onFollowStreamer(streamer.id);
          }}
        >
          <div className='absolute bg-tayaRed w-[0.86rem] h-[0.86rem] rounded-full bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 flex justify-center items-center'>
            <Image
              alt='streamer'
              src={Plus}
              className={`object-contain rounded-full h-2 w-2 `}
              width={40}
              height={40}
            />
          </div>

          <Image
            alt='streamer'
            src={streamer.avatar || Avatar}
            className={`object-cover rounded-full h-[2rem] w-[2rem]`}
            width={52}
            height={52}
          />
        </div>
      )}
      <div>
        <p className='text-[0.75rem]'>{streamer.nickname}</p>
        <p className='text-[0.625rem]'>
          {getFollowerCount(streamer?.follower_count)} {t('followers')}
        </p>
      </div>
    </div>
  );
};
