import React from 'react';
import { Button } from '@/componentsH5/button';
import { AuthorType } from '@/util/liveChatConst';
import { convertTimeStampToDateTime } from '@/util/date';
import { Bookmark } from '@/asset/icons';
import Image from 'next/image';
import { useSelectBet } from '@/hook/FB/useSelectBet';
import { useDispatch } from 'react-redux';
import { togglePrivateRoom } from '@/store/livechat';
import { useTranslation } from 'next-i18next';
import { isWeb } from '@/util/common';
import { useFormattedData } from '@/hook/useFormattedData';

export const RecommendBetCard = ({ chatInfo, setShowFlyAnimation }) => {
  const { minutes, hours, ampm } = convertTimeStampToDateTime(
    chatInfo?.timestamp,
    true
  );
  const { t } = useTranslation();
  const details = chatInfo?.data;
  const { opData, matchDetail } = useFormattedData(details);
  const { onClickBetNow } = useSelectBet(matchDetail);
  const dispatch = useDispatch();

  return (
    <>
      <div className='flex flex-col bg-tayaGrey rounded-xl p-3'>
        <div className='overflow-hidden rounded-xl'>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <Image src={Bookmark} alt='book' width={18} height={18} />
              <p className='text-sm'>{t('recommendedBet')}</p>
            </div>

            <p className='text-13 mt-2'>{details?.nm}</p>
            <p className='text-[#D8BA92] text-13'>{details?.op_na}</p>
            <div className='text-sm'>
              <span>{details?.lg_na} </span>
              <span>{details?.op_nm} </span>
              <span className='font-semibold'>{details?.op_od} </span>
            </div>
          </div>
        </div>
        <div className='h-2'></div>
        <Button
          className='bg-transparent !p-0 !m-0'
          buttonColor='!my-1 !h-[2.3rem] !text-15 !font-semibold'
          onClick={(e) => {
            onClickBetNow(e, details?.mg_id, opData, setShowFlyAnimation);
            !isWeb() && dispatch(togglePrivateRoom(false));
          }}
        >
          {t('betNow')}
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
