import {
  IconChatBubbleHollow,
  IconChatBubbleHollowDisabled,
} from '@/asset/icons';
import { setShowChatBullet } from '@/store/videoPlayerMisc';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

export const ChatBulletCtrl = () => {
  const showChatBullet = useSelector((s) => s.videoPlayerMisc.showChatBullet);
  const dispatch = useDispatch();
  return (
    <div className='w-fit h-auto px-2 flex items-center justify-center'>
      <Image
        src={
          showChatBullet ? IconChatBubbleHollow : IconChatBubbleHollowDisabled
        }
        alt='chatBulletctrl'
        onClick={() => {
          if (showChatBullet) {
            dispatch(setShowChatBullet(false));
          } else {
            dispatch(setShowChatBullet(true));
          }
        }}
        className='cursor-pointer'
      />
    </div>
  );
};
