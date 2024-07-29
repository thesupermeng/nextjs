import React from 'react';
import { IconQRRed } from '@/asset/icons';
import Image from 'next/image';
import { isWeb } from '@/util/common';

const QRFileInput = ({ onFileUpload }) => {
  return (
    <label>
      <Image
        src={IconQRRed}
        alt='qr-icon'
        width={isWeb() ? 20 : 15}
        height={isWeb() ? 20 : 15}
        className='hover:cursor-pointer'
      />
      <input
        type='file'
        accept='image/*'
        onChange={(e) => {
          if (e.target.files) {
            onFileUpload(e.target.files[0]);
          }
        }}
        className='hidden'
      />
    </label>
  );
};

export default QRFileInput;
