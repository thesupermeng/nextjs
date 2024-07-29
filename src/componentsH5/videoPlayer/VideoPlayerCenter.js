import { LiveCamIcon } from '@/asset/icons';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { isWeb } from '@/util/common';

export const getLivePath = (id) => `/liveplay/${id}`;

export const VideoPlayerCenter = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const gotoLiveRoom = () => {
    router.push(`/liveplay/${id}`);
  };

  return (
    <div
      onClick={gotoLiveRoom}
      className={`absolute cursor-pointer ${
        isWeb()
          ? 'py-[3px] text-base gap-2'
          : 'py-[0.38rem] text-sm gap-1.5 z-10'
      } px-3 rounded-xl backdrop-blur-[7px] bg-[#282A2575] items-center text-white font-medium flex flex-initial whitespace-nowrap`}
    >
      <Image alt='live' src={LiveCamIcon} className='w-5 h-5' />
      {t('visitLiveRoom')}
    </div>
  );
};
