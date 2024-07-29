'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImagePlaceholder } from '@/asset/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import base64PlaceholderString from '@/app/placeholder';
import Link from 'next/link';
import { useState } from 'react';
import { encodeVSN } from '@/util/vsn';

export const VideoVerticalCard = ({ vod }) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const listConverter = (strings) => {
    let list = [];
    list = strings.split(',').filter((item) => item !== '');
    return list;
  };

  return (
    <div className='flex flex-col items-center desktop-hover-effect'>
      <div className='relative w-full aspect-[530/726] group mx-4 my-2 rounded-lg desktop-hover-effect'>
        <Link
          href={`/vod/play/id/${vod.vod_id}/sid/${vod.type_id}/nid/1/${
            [46, 120].includes(vod.type_id)
              ? `${vod?.vod_source_name ? `/vsn/${encodeVSN(vod?.vod_source_name)}` :''}`
              : ''
          }`}
          className='absolute inset-0 flex rounded-lg lg:group-hover:improve-text-unblurry lg:transition lg:group-hover:scale-150 lg:group-hover:duration-500 lg:group-hover:cursor-pointer group-hover:rounded-lg lg:group-hover:z-10 lg:group-hover:rounded-lg'
        >
          <Image
            placeholder='blur'
            blurDataURL={'data:image/png;base64,' + base64PlaceholderString}
            alt='video'
            src={imageError ? ImagePlaceholder : vod.vod_pic}
            style={{ borderRadius: '0.5rem !important', objectFit: 'cover' }}
            fill
            sizes='100%'
            className='rounded-lg'
            onError={(e) => setImageError(true)}
          />
          <div className='bg-[#0000008c] h-[100%] w-full flex flex-col rounded-lg md:group-hover:z-10 lg:group-hover:block hidden'>
            <div className='rounded-t-lg w-full h-[45%] flex justify-center items-center'>
              <div className='rounded-full bg-[#FAC33D] w-10 h-10 flex justify-center items-center'>
                <FontAwesomeIcon
                  style={{
                    fontSize: '18px',
                  }}
                  icon={faPlay}
                />
              </div>
            </div>
            <div className='bg-[#1D2023] rounded-b-lg w-full h-[55%] px-2 py-1.5 flex'>
              <div className='flex flex-col overflow-hidden'>
                <span
                  className='antialiased text-[10px]/4 text-[#FAC33D] font-bold'
                  dangerouslySetInnerHTML={{ __html: vod.vod_name }}
                ></span>
                <div className='flex flex-row gap-1 flex-wrap py-0.5'>
                  {vod.vod_actor !== undefined &&
                    listConverter(vod.vod_actor)
                      .slice(0, 2)
                      .map((item, index) => {
                        return (
                          <span
                            key={index}
                            className='antialiased rounded-md bg-[#ffffff1a] text-[9px] text-[#9C9C9C] p-1'
                          >
                            {item}
                          </span>
                        );
                      })}
                </div>
                <div className='flex overflow-hidden'>
                  <span className='antialiased text-[9px] text-[#9C9C9C] 2xl:line-clamp-[7] xl:line-clamp-5 lg:line-clamp-4 line-clamp-2'>
                    {vod.vod_blurb !== undefined ? vod.vod_blurb : '暂无'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {vod.vod_remarks !== undefined ? (
          <div className='flex absolute w-full bottom-1 px-1.5 justify-end'>
            <div className='bg-[#00000099] rounded-md p-1 max-w-full'>
              <p className='text-xs truncate'>{vod.vod_remarks}</p>
            </div>
          </div>
        ) : null}
      </div>
      <span
        className='text-center text-sm mx-1 md-hover-effect'
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          lineClamp: 2,
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {vod.vod_name}
      </span>
    </div>
  );
};
