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

export const VideoHorizontalCard = ({ vod, typepage_id }) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const nId = typepage_id != 99 ? 1 : 9999;

  const truncateVodName = (name) => {
    if (!name) return '';

    // Check if the name is a single word
    const isSingleWord = !/\s/.test(name);

    // Truncate if single word and longer than 10 characters
    if (isSingleWord && name.length > 14) {
      return name.substring(0, 10) + '...';
    }

    return name;
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='relative flex w-full aspect-[726/430] group mx-4 my-3 rounded-lg'>
        <Image
          placeholder='blur'
          blurDataURL={'data:image/png;base64,' + base64PlaceholderString}
          onClick={(e) => {
            router.push(
              `/vod/play/id/${vod.vod_id}/sid/${vod.type_id}/nid/${nId}`
            );
          }}
          alt='video'
          src={imageError ? ImagePlaceholder : vod.vod_pic}
          style={{ borderRadius: '0.5rem !important', objectFit: 'cover' }}
          fill
          sizes='100%'
          className='rounded-lg md:transition md:group-hover:scale-125
  md:group-hover:cursor-pointer group-hover:rounded-lg md:group-hover:z-10 md:group-hover:rounded-lg'
          onError={(e) => setImageError(true)}
        />

        {vod.vod_remarks !== undefined ? (
          <div className='flex absolute w-full bottom-1 px-1.5 justify-end'>
            <div className='bg-[#00000099] rounded-md p-1 max-w-full'>
              <p className='text-xs truncate'>{vod.vod_remarks}</p>
            </div>
          </div>
        ) : null}
      </div>
      <span className='text-center text-sm mx-1 line-clamp-2'>
        {/* {vod.vod_name} */}
        {truncateVodName(vod.vod_name)}
      </span>
    </div>
  );
};
