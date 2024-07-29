import { IconDefaultGames } from '@/asset/icons';
import React, { useCallback } from 'react';
import { ImageWithFallback } from '../fallbackImage';
import { Button } from '@/componentsH5/button';
import {
  AuthorType,
  PrivateMsgButton,
  PrivateMsgType,
} from '@/util/liveChatConst';
import { convertTimeStampToDateTime } from '@/util/date';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { togglePrivateRoom } from '@/store/livechat';
import { isWeb } from '@/util/common';
import {
  hideRightBarContent,
  setProfileModal,
  showRightBarContent,
} from '@/store/common';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { setSelectedPromotionId } from '@/store/promotion';
import { ProfileModalType } from '../profileModal';

export const CustomCard = ({ chatInfo }) => {
  const { minutes, hours, ampm } = convertTimeStampToDateTime(
    chatInfo?.timestamp,
    true
  );
  const data = chatInfo?.data;
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const imgSrc = isWeb() ? data?.image?.web : data?.image?.h5;
  const videoSrc = isWeb() ? data?.video?.web?.src : data?.video?.h5?.src;

  const onButtonClick = useCallback(() => {
    switch (chatInfo?.type) {
      case PrivateMsgType.Promotion:
        if (isWeb()) {
          dispatch(hideRightBarContent('All'));
          dispatch(setSelectedPromotionId(data?.promotion_id));
          dispatch(showRightBarContent(RightSidebarContantTypes.Promotion));
        } else {
          router.push(`/promotion/${data?.promotion_id}`);
        }
        break;
      case PrivateMsgType.Deposit:
        if (isWeb()) {
          dispatch(hideRightBarContent('All'));
          dispatch(showRightBarContent(RightSidebarContantTypes.Deposit));
        } else {
          router.push('/user/deposit');
        }
        break;
      case PrivateMsgType.Register:
        goToLogin();
        break;
      case PrivateMsgType.Video:
        window.open(videoSrc, '_blank');
        break;
      default:
        break;
    }
    dispatch(togglePrivateRoom(false));
  }, [chatInfo?.type, data?.promotion_id]);

  const goToLogin = () => {
    if (isWeb()) {
      dispatch(setProfileModal(ProfileModalType.LoginModal));
    } else {
      router.push('/user/login');
    }
  };
  return (
    <>
      <div className='flex flex-col bg-tayaGrey w-4/5  rounded-xl p-3'>
        <div
          className={`${
            chatInfo?.type === PrivateMsgType.Video ? 'h-[264px]' : 'h-[104px]'
          } overflow-hidden  rounded-xl`}
        >
          {chatInfo?.type === PrivateMsgType.Video ? (
            <iframe
              src={videoSrc}
              className='object-cover w-full h-full'
              width={264}
              height={150}
              allowFullScreen={true}
              allow='autoplay'
              title={chatInfo?.video?.h5?.title}
            />
          ) : (
            <ImageWithFallback
              src={imgSrc}
              alt='img'
              width={264}
              height={104}
              fallbackSrc={IconDefaultGames}
              className='object-cover w-full h-full'
            />
          )}
        </div>
        <p className='text-16 font-semibold mt-1'> {data?.title}</p>
        <p className='text-xs'>{data?.description}</p>
        <Button
          className='bg-transparent !p-0 !m-0'
          buttonColor='!my-1'
          onClick={onButtonClick}
        >
          {t(PrivateMsgButton[chatInfo?.type])}
        </Button>
      </div>
      <div
        className={`flex px-2 mt-1 ${
          chatInfo?.authorType === AuthorType.Agent ? 'self-start' : 'self-end'
        } `}
      >
        <div className='text-[11px] text-white/50'>
          {hours}:{minutes}
          {ampm}
        </div>
      </div>
    </>
  );
};
