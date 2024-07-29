import { Tick } from '@/asset/icons';
import useFollowings from '@/hook/user/useFollowings';
import useUser from '@/hook/user/useUser';
import { setProfileModal } from '@/store/common';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { ProfileModalType } from '../profileModal';
import { useState } from 'react';

export const FollowingBlock = ({ id }) => {
  const { isLogin } = useUser();
  const { followList, followStreamer, unFollowStreamer } = useFollowings();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isFollowing = followList?.some((streamer) => streamer.id === id);
  const [isLoading, setIsLoading] = useState(false);
  const onFollowStreamer = (e) => {
    setIsLoading(true);
    e.stopPropagation();
    if (!isLogin) {
      if (isWeb()) {
        dispatch(setProfileModal(ProfileModalType.LoginModal));
      } else {
        router.push('/user/login');
      }
      setIsLoading(false);
    } else {
      followStreamer(id).then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 200)
      );
    }
  };

  const onUnfollowStreamer = (e) => {
    setIsLoading(true);
    e.stopPropagation();
    unFollowStreamer(id).then(() =>
      setTimeout(() => {
        setIsLoading(false);
      }, 200)
    );
  };

  const containerTw =
    'flex flex-initial flex-row h-8 px-2 rounded justify-start items-center backdrop-blur-lg';
  return (
    <button
      disabled={isLoading}
      onClick={isFollowing ? onUnfollowStreamer : onFollowStreamer}
      className={`${containerTw} ${
        isFollowing
          ? 'bg-white'
          : 'bg-transparent border border-white text-white'
      } gap-1.5 cursor-pointer rounded-md text-black disabled:opacity-50`}
    >
      <div className={`font-medium text-sm `}>
        {isLoading
          ? t('loading...')
          : isFollowing
          ? t('following')
          : t('follow')}
      </div>
    </button>
  );

  // followList?.some((streamer) => streamer.id === id) ? (
  //   <div
  //     onClick={onUnfollowStreamer}
  //     className={`${containerTw} bg-white gap-1.5 cursor-pointer rounded-md`}
  //   >
  //     <div className={`font-medium text-sm text-black`}>{t('following')}</div>
  //   </div>
  // ) : (
  //   <div
  //     onClick={onFollowStreamer}
  //     className={`${containerTw} bg-transparent border border-white cursor-pointer rounded-md`}
  //   >
  //     <div className={`font-medium text-sm text-white`}>{t('follow')}</div>
  //   </div>
  // );
};
