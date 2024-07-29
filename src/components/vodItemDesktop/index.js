'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import base64PlaceholderString from '@/app/placeholder';
import { ImagePlaceholder } from '@/asset/icons';
const VodItemDesktop = ({ vod }) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  // const handlePlay = (vodId) => {
  //   router.push(`/vod/play/id/${vod.vod_id}/sid/${vod.type_id}/nid/1`);
  // };

  const href = `/vod/play/id/${vod.vod_id}/sid/${vod.type_id}/nid/1`;

  return (
    <div className='col-lg-6 col-md-12 mt-2 mb-2 cursor-pointer'>
      <Link href={href}>
        <div className='topic-details-card'>
          <div className='row'>
            <div className='col-12'>
              <div className='row'>
                <div
                  style={{
                    padding: '0px',
                    width: '132px',
                    height: '206px',
                    position: 'relative', // Add this to make the container relative for the image to fill
                    overflow: 'hidden', // Hide overflow to ensure image doesn't exceed container
                    borderRadius: '10px', // Apply border-radius here for consistent effect
                  }}
                >
                  {/* <img
                  alt='vod'
                  className='object-cover'
                  src={vod?.vod_pic}
                  style={{
                    borderRadius: '10px',
                    width: '132px',
                    height: '206px',
                  }}
                /> */}
                  <Image
                    placeholder='blur'
                    blurDataURL={
                      'data:image/png;base64,' + base64PlaceholderString
                    }
                    alt='vod'
                    src={imageError ? ImagePlaceholder : vod?.vod_pic}
                    layout='fill' // This makes the image cover the entire container
                    objectFit='cover' // Ensures the image covers the container
                    className='rounded-xl'
                    onError={(e) => setImageError(true)}
                  />
                </div>

                <div className='col'>
                  <div className='topic-details-title'>{vod.vod_name}</div>
                  <div className='topic-details-title-sub text-secondary '>
                    {vod.vod_year} {vod.vod_class}
                  </div>
                  <div className='topic-details-title-sub text-secondary '>
                    主演:
                    {vod?.vod_actor?.length > 38
                      ? vod.vod_actor.substring(0, 35) + '...'
                      : vod.vod_actor}
                  </div>
                  <div className='topic-details-title-sub text-secondary '>
                    {vod?.vod_blurb?.length > 75
                      ? vod.vod_blurb.substring(0, 73) + '...'
                      : vod.vod_blurb}
                  </div>
                  <button className='btn btn-topic-play'>
                    <FontAwesomeIcon icon={faPlay} style={{ color: 'white' }} />{' '}
                    <span className='ml-2'> 立即播放 </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VodItemDesktop;
