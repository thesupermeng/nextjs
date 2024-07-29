import { setIsOpenStats } from '@/store/stats';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';

export const VideoPlayerMore = () => {
  return <BottomBtn text='More' onClick={() => {}}></BottomBtn>;
};

export const VideoPlayerStats = () => {
  const dispatch = useDispatch();
  const isOpenStats = useSelector((s) => s.stats.isOpenStats);
  const { t } = useTranslation();

  return (
    <BottomBtn
      text={t('stats')}
      onClick={() => {
        dispatch(setIsOpenStats(!isOpenStats));
      }}
    ></BottomBtn>
  );
};

const BottomBtn = ({ text, onClick }) => {
  useEffect(() => {}, []);
  return (
    <div
      onClick={onClick}
      className='bg-black/[0.55] rounded-full px-4 border-[#EEEEEE8C] border text-white text-[13px] flex font-medium items-center justify-center leading-none'
    >
      {text}
    </div>
  );
};
