import { ViewerIcon } from '@/asset/icons';
import { useFocusStream } from '@/hook/user/useFocusStream';
import { isWeb } from '@/util/common';
import { getFollowerCount } from '@/util/numbers';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export const VideoPlayerTopWeb = () => {
  const { focusStream } = useFocusStream();
  const { t } = useTranslation();

  return (
    <div className='absolute z-10 top-3 left-4 flex flex-initial flex-row items-center'>
      <div
        className={`px-1 bg-tayaRed rounded-[0.25rem] items-center font-medium flex-initial uppercase ${
          isWeb() ? 'text-sm' : 'text-[11px]'
        }`}
      >
        {t('live')}
      </div>
      <div
        className={`ml-3 px-2 items-center rounded-[6.25rem] bg-black/50 backdrop-blur-[2px] flex flex-row gap-1 ${
          isWeb() ? '' : 'text-[10px] py-1'
        }`}
      >
        <Image alt='viewer' src={ViewerIcon} className='w-[22px] h-[14px]' />
        {getFollowerCount(focusStream?.current_view) || 0}
      </div>
    </div>
  );
};
