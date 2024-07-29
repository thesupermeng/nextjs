import { IconWarningSign } from '@/asset/icons';
import { useStreamer } from '@/hook/user/useStreamer';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const MB = '12px';
export const BlockUser = () => {
  const silentTill = useSelector((s) => s.chatRoom.silentTill);
  const { streamer } = useStreamer();
  return (
    <div
      style={{ bottom: `calc(100% + ${MB})` }}
      className={`absolute z-50 ${
        isWeb() ? 'left-0 right-4' : 'w-[calc(100vw - 32px)] left-0'
      } py-1.5 px-3 bg-[#781427] rounded justify-between flex-row flex flex-1 gap-1.5`}
    >
      <Image
        src={IconWarningSign}
        alt='!'
        className='flex flex-initial w-4 h-4'
      />
      <div className='flex flex-1 text-white text-[11px] font-normal'>
        {`We are unable to post your comment until ${new Date(
          silentTill
        ).toLocaleString('en-PH')} because you have been blocked by ${
          streamer?.nickname
        }`}
      </div>
    </div>
  );
};
