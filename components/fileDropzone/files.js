import React from 'react';
import { DeleteBin, PdfIcon } from '@/asset/icons';
import Image from 'next/image';

export default function Files({ receivedFile, onDel }) {
  return (
    <>
      {receivedFile.length > 0 && (
        <div className={`flex gap-7 my-5`}>
          {receivedFile.map((file, idx) => {
            if (file?.type === 'image/png' || file?.type === 'image/jpeg') {
              return (
                <div
                  key={file.name + '-' + file.size}
                  className='relative flex items-center'
                >
                  <button
                    onClick={() => onDel(idx)}
                    className='absolute bg-tayaRed -right-3 -top-3 w-[26px] h-[26px] rounded-full p-[5px]'
                  >
                    <Image
                      alt='delete'
                      src={DeleteBin}
                      width={26}
                      height={26}
                    />
                  </button>
                  <Image
                    alt={file.name + ' ' + file.size}
                    width={122}
                    height={86}
                    src={URL.createObjectURL(file)}
                    className='max-h-[86px] overflow-hidden rounded-[6px] object-cover'
                  />
                </div>
              );
            } else if (file?.type === 'application/pdf') {
              return (
                <div className='relative' key={file.name + '-' + file.size}>
                  <button
                    onClick={() => onDel(idx)}
                    className='ml-[-16px] mt-[-10px] bg-tayaRed right-0 w-[26px] h-[26px] rounded-full p-[5px] gap-[14.444px] float-right'
                  >
                    <Image
                      alt='deleteBin'
                      src={DeleteBin}
                      width={26}
                      height={26}
                    />
                  </button>
                  <div className='flex justify-center w-[122px] h-[86px] rounded-lg bg-[#171717]'>
                    <Image
                      alt='pdfIcon'
                      width={35}
                      height={39}
                      src={PdfIcon}
                    ></Image>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
}
