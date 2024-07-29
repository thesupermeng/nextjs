'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  profileIcon,
  vipProfileIcon,
  editIcon,
  VipBlackIcon,
  ArrowRightIcon,
  FavouriteIconGrey,
  AboutusIconGrey,
  FeedbackIconGrey,
  HistoryIconGrey,
  ArrowRigthGrey,
  ImagePlaceholder,
} from '@/asset/icons';
import base64PlaceholderString from '@/app/placeholder';
import { encodeVSN } from '@/util/vsn';

export const VideoHorizontalHistoryCard = ({
  vod,
  index,
  displayStyle,
  setOpenHistory,
}) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const secondsToHHMMSS = (seconds) => {
    // Convert seconds to integer
    seconds = parseInt(seconds);

    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format hours, minutes, and remaining seconds as HH:MM:SS
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    return formattedTime;
  };

  return (
    <div
      key={index}
      className={`flex ${
        displayStyle == 'side-content' ? 'flex-row' : 'flex-col'
      }  hover:text-[#FAC33D] gap-x-2 cursor-pointer`}
      onClick={() => {
        const url = vod.sourceId
          ? `/vod/play/id/${vod.vodid}/sid/${vod.tid}/nid/${vod.nid}/source/${
              vod.sourceId
            }${
              [46, 120].includes(Number(vod.tid))
                ? `${vod?.sourceName? `/vsn/${encodeVSN(vod?.sourceName)}`:''}`
                : ''
            }`
          : `/vod/play/id/${vod.vodid}/sid/${vod.tid}/nid/${vod.nid}${
              [46, 120].includes(Number(vod.tid))
                ? `${vod?.sourceName? `/vsn/${encodeVSN(vod?.sourceName)}`:''}`
                : ''
            }`;

        router.push(url);
        if (setOpenHistory) {
          setOpenHistory(false);
        }
      }}
    >
      <div
        className={`relative flex ${
          displayStyle == 'side-content' ? 'w-2/5' : 'w-11/12'
        } aspect-[726/430] rounded-lg`}
      >
        <Image
          placeholder='blur'
          blurDataURL={'data:image/png;base64,' + base64PlaceholderString}
          alt='video'
          src={imageError ? ImagePlaceholder : vod.vodpic}
          style={{ borderRadius: '0.5rem !important', objectFit: 'cover' }}
          fill
          sizes='100%'
          className='rounded-md w-28 h-16 object-cover'
          onError={(e) => setImageError(true)}
        />
      </div>
      <div
        className={`flex-1 flex flex-col truncate  ${
          displayStyle == 'side-content'
            ? 'justify-between py-0.5'
            : 'gap-1 pt-2 w-11/12'
        }`}
      >
        <span className='text-sm truncate '>{vod.vodname}</span>
        <span className='text-xs truncate'>{`第${vod.nid}集`}</span>
        <span className='text-xs text-white'>
          观看至 {secondsToHHMMSS(vod.watchtimes)}
        </span>
      </div>
    </div>
  );
};

{
  /* <span className='text-xs truncate'>{vod.tid == 2?' ':`第${vod.nid}集` }</span> */
}
