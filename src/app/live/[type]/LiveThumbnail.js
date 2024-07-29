import { IconDefaultGames, ViewerIcon } from '@/asset/icons';
import { ImageWithFallback } from '@/components/fallbackImage';
import { isWeb } from '@/util/common';
import { getFollowerCount } from '@/util/numbers';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export const LiveThumbnail = ({ width, data }) => {
  const { t } = useTranslation();

  return (
    <div
      style={width ? { width: `${width}` } : {}}
      className={`group flex flex-initial flex-col rounded-xl w-full ${
        isWeb() ? 'hover:bg-tayaGrey hover:bg-opacity-70 overflow-hidden' : ''
      }`}
    >
      <div className='relative flex flex-initial w-full overflow-hidden'>
        <div className='w-full aspect-[16/9] rounded-xl overflow-hidden'>
          {(data?.img_url || data?.streamer?.cover_image) && (
            <ImageWithFallback
              src={data?.img_url ? data?.img_url : data?.streamer?.cover_image}
              fill
              fallbackSrc={IconDefaultGames}
              alt='match'
              className={`w-full object-cover rounded-t-lg ${
                isWeb() ? 'group-hover:scale-110' : ''
              } common-transition`}
              blurDataURL={IconDefaultGames.src}
              placeholder='blur'
              key={data?.img_url}
            />
          )}
        </div>
        <div className='absolute flex flex-row items-center flex-initial gap-2 left-2 top-3'>
          <div className='p-1 bg-tayaRed rounded-[0.2rem] text-xs font-medium flex flex-initial uppercase'>
            {t('live')}
          </div>
          <div className='flex flex-row rounded-[6.6rem] backdrop-blur-sm px-1 items-center bg-black'>
            <Image
              alt='thumb'
              className='flex self-center w-4 h-3 ml-1'
              src={ViewerIcon}
            />
            <div className='flex px-1 py-1 text-xs text-white'>
              {getFollowerCount(data?.current_view) || 0}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-1.5 flex-1 p-3 bg-tayaGrey'>
        <div className='flex flex-row flex-initial items-center'>
          {data?.streamer?.avatar && (
            <ImageWithFallback
              width={isWeb() ? 40 : 20}
              height={isWeb() ? 40 : 20}
              alt='thumb'
              src={data?.streamer?.avatar}
              className={`flex flex-initial rounded-[2.5rem] ${
                isWeb() ? 'w-10 h-10' : 'w-5 h-5'
              }`}
            />
          )}
          <div
            className={`'flex flex-1 text-[#CFCFCF] ml-[0.38rem] ${
              isWeb() ? 'font-normal text-base' : 'text-[13px] font-medium'
            }`}
          >
            {data?.streamer?.nickname}
          </div>
        </div>
        <div
          className={`line-clamp-2 ${
            isWeb()
              ? 'text-base font-semibold group-hover:text-red-500'
              : 'text-white text-[13px] font-medium'
          }`}
        >
          {data.title}
        </div>
      </div>
    </div>
  );
};
