import { Avatar, ShareVideo } from '@/asset/icons';
import Image from 'next/image';
import ShareModal from '../shareModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { FollowingBlock } from '../followingBlock/FollowingBlock';
import { getFollowerCount } from '@/util/numbers';
import { useStreamer } from '@/hook/user/useStreamer';
import { isWeb } from '@/util/common';

export const StreamerInfo = () => {
  const { streamer } = useStreamer();
  const [showShareModal, setShowShareModal] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-row items-center justify-between flex-initial ${
        isWeb()
          ? 'py-4 px-8'
          : 'py-2 px-3 gap-3 fixed top-16 bg-black w-full z-20 opacity-100'
      }`}
    >
      <div className='flex items-center gap-3 '>
        <Image
          alt='streamer'
          src={streamer.avatar || Avatar}
          className={`object-cover rounded-full ${
            isWeb() ? 'h-[80px] w-[80px]' : 'h-[52px] w-[52px]'
          }`}
          width={isWeb() ? 80 : 52}
          height={isWeb() ? 80 : 52}
          //todo streamer profile disabled for now
          // onClick={() => router.push(`/streamer/${streamer.id}`)}
        />

        <div className='flex flex-col items-start justify-center gap-1 text-white sm:w-full'>
          <div className='flex items-center flex-initial gap-4'>
            <div
              className={`flex-initial font-medium ${
                isWeb() ? 'text-[19px]' : 'text-[14px] line-clamp-1'
              }`}
            >
              {streamer.nickname}
            </div>
            {isWeb() ? <FollowingBlock id={streamer.id} /> : null}
          </div>

          {/* viewer */}
          <div
            className={`flex-initial font-normal ${
              isWeb() ? 'text-[15px]' : 'text-[11px]'
            }`}
          >
            {getFollowerCount(streamer?.follower_count)} {t('followers')}
          </div>

          {/* Tags */}
          <div className='flex flex-row flex-wrap items-center flex-initial gap-2'>
            {(streamer.tags || []).map((tag) => {
              return (
                <span
                  key={tag.id}
                  className={`py-1 px-2.5 rounded bg-white/20 font-medium text-white/80 ${
                    isWeb() ? 'text-xs' : 'text-[9px]'
                  }`}
                >
                  {tag.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {isWeb() ? (
        <div
          onClick={() => setShowShareModal(true)}
          className='inline-flex bg-white bg-opacity-5 rounded-[22px] py-2 items-center px-5 gap-1 cursor-pointer'
        >
          <Image src={ShareVideo} width={22} height={22} alt='share' />
          <p>{t('share')}</p>
        </div>
      ) : (
        <FollowingBlock id={streamer.id} />
      )}

      {showShareModal && <ShareModal setShowShareModal={setShowShareModal} />}
    </div>
  );
};
