import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const focusCSS = 'w-[3.43rem] h-[3.43rem] border-tayaRed min-w-[3.43rem]';
const blurCSS = 'w-[2.81rem] h-[2.81rem] border-tayaRed min-w-[2.81rem]';
export const StreamerIconRound = ({
  img,
  isFocus,
  size = 0,
  liveIcon = null,
  onClick = () => {},
  isFollowing = false,
  isLive = false,
}) => {
  const css = isFocus ? focusCSS : blurCSS;
  const picSize = isFocus ? 50 : 40;
  const { t } = useTranslation();
  return (
    <div
      // style={
      //   size
      //     ? {
      //         width: `${size}px`,
      //         height: `${size}px`,
      //         minHeight: `${size}px`,
      //         minWidth: `${size}px`,
      //       }
      //     : {}
      // }
      className={`bg-[#101010] relative flex flex-none items-center justify-center rounded-full p-1 border cursor-pointer ${
        isFocus ? 'border-tayaRed' : 'border-[#959595]'
      }  aspect-[1] ${
        isWeb() ? 'min-w-[55px] min-h-[55px]' : 'mb-5 min-w-[50px] min-h-[50px]'
      } ${isFollowing && isLive && 'border-tayaRed'} ${
        isFollowing && !isLive && 'border-0'
      } ${!isWeb() && isFocus && 'min-w-[62px] min-h-[62px]'} ${
        isWeb() && isFocus && 'min-w-[68px] min-h-[68px]'
      }`}
      onClick={onClick}
    >
      {img && (
        <Image
          alt='streamer'
          src={img}
          style={{
            width: `${size || picSize}px`,
            height: `${size || picSize}px`,
          }}
          className='rounded-full overflow-clip object-cover'
          width={size || picSize}
          height={size || picSize}
        />
      )}
      {liveIcon ? (
        <div
          className={`absolute -bottom-1 rounded-[2px] bg-tayaRed py-[1px] px-1 flex flex-row items-center gap-[2px] ${
            !isWeb() && 'h-[13px]'
          }`}
        >
          <Image src={liveIcon} alt='icon' width={8} height={8} />
          <div className='text-[9px] font-medium text-white'>{t('live').toUpperCase()}</div>
        </div>
      ) : null}
    </div>
  );
};
