import { IconArrowLeft, IconChevron, ViewerIcon } from '@/asset/icons';
import { StreamerIconRound } from '@/components/streamer/StreamerIconRound';
import { FollowingBlock } from '@/components/followingBlock/FollowingBlock';
import { ShareButton } from '@/components/shareModal/ShareButton';
import { useFocusStream } from '@/hook/user/useFocusStream';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { hideRightBarContent } from '@/store/common';
import { isWeb } from '@/util/common';
import { getFollowerCount } from '@/util/numbers';
import { ImageWithFallback } from '@/components/fallbackImage';

export default function PlayerTopBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClickBack = () => {
    history.go(-1) ?? router.push('/');
    dispatch(hideRightBarContent('All'));
  };

  const { focusStream } = useFocusStream();
  return (
    <div className='absolute top-0 left-0 right-0 items-center flex-row bg-gradient-to-b from-black/100 to-black/0'>
      <div className='flex flex-1 flex-row items-center gap-6 pt-6 pb-8 px-9 '>
        <div
          className='flex-initial cursor-pointer'
          onClick={() => onClickBack()}
        >
          {isWeb() ? (
            <Image
              alt='back'
              src={IconArrowLeft}
              className='flex-initial w-[52px] h-[52px] opacity-20 hover:opacity-100'
            />
          ) : (
            <Image
              alt='back'
              src={IconChevron}
              className='flex-initial w-[52px] h-[52px] opacity-20 hover:opacity-100'
            />
          )}
        </div>

        <ImageWithFallback
          src={focusStream?.streamer?.avatar}
          alt='image'
          width={56}
          height={56}
          className='object-cover rounded-full h-[56px] w-[56px]'
        />

        {/* name */}
        <div className='flex-initial text-white text-lg font-medium leading-6'>
          {focusStream?.streamer?.nickname}
        </div>

        {/* viewer */}
        <FollowingBlock id={focusStream?.streamer_id} />

        <div className='p-1 px-2 bg-tayaRed rounded-[0.25rem] text-sm font-medium flex-initial uppercase'>
          {t('live')}
        </div>

        <div className='inline-flex flex-row items-center gap-2'>
          <Image alt='viewer' src={ViewerIcon} className='w-[18px] h-[12px]' />
          <div className='text-white text-sm font-medium leading-[150%]'>
            {getFollowerCount(focusStream?.current_view)}
          </div>
        </div>

        <div className='flex-1' />
        <ShareButton />
      </div>
    </div>
  );
}
