'use client';
import React from 'react';
import FullScreenModal from '../FullScreenModal';
import {
  Close,
  copyLink,
  facebook,
  tumblr,
  twitter,
  whatsapp,
} from '@/asset/icons';
import Image from 'next/image';

import {
  FacebookShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setShowToast } from '@/store/common';

const medias = [
  {
    label: 'Facebook',
    icon: facebook,
    button: FacebookShareButton,
  },
  {
    label: 'Whatsapp',
    icon: whatsapp,
    button: WhatsappShareButton,
  },
  {
    label: 'Twitter',
    icon: twitter,
    button: TwitterShareButton,
  },
  {
    label: 'Tumblr',
    icon: tumblr,
    button: TumblrShareButton,
  },
];
const paymentRedirectPath = '/coinpal/result';
export default function ShareModal({ setShowShareModal }) {
  const pathname = usePathname();
  let shareUrl = window.location.origin.toString() + (pathname === paymentRedirectPath ? '' : pathname);
  const dispatch = useDispatch();
  const copy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    dispatch(setShowToast(`Copied ${shareUrl} to clipboard`));
  };

  return (
    <FullScreenModal>
      <div className='bg-tayaGrey absolute py-5 px-5 rounded-[22px] text-center text-md'>
        <div className='flex'>
          <p className='flex-1 font-bold leading-none'>
            Share to friends & famliy
          </p>
          <button
            onClick={() => {
              setShowShareModal(false);
            }}
          >
            <Image
              src={Close}
              width={20}
              height={20}
              alt='cross'
              className='items-self-right'
            />
          </button>
        </div>

        <div className='h-[0px] border border-neutral-100 border-opacity-20 mt-5'></div>
        <div className='flex gap-10 px-10 py-8 text-xs'>
          {medias.map((M, idx) => {
            return (
              <M.button
                className='flex flex-col items-center justify-center gap-2 hover:opacity-75'
                key={idx}
                url={shareUrl}
              >
                <Image
                  src={M.icon}
                  alt='icon'
                  width={44}
                  height={44}
                  className='rounded-xl'
                />
                <p>{M.label}</p>
              </M.button>
            );
          })}

          <button
            onClick={copy}
            className='flex flex-col items-center justify-center gap-1 hover:opacity-75'
          >
            <Image
              src={copyLink}
              alt='icon'
              width={44}
              height={44}
              className='rounded-xl'
            />
            <p>Copy Link</p>
          </button>
        </div>
      </div>
    </FullScreenModal>
  );
}
