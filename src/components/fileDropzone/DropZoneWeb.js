import { SignIcon, UploadIcon } from '@/asset/icons';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Files from './files';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

export default function DropZoneWeb({
  setReceivedFiles,
  maxFiles = 1,
  receivedFiles,
}) {
  const [isExceed, setIsExceed] = useState(false);
  const { t } = useTranslation();

  const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
    noClick: true,
    maxFiles: maxFiles,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    onDrop: (acceptedFiles) => {
      if (
        receivedFiles.length !== maxFiles &&
        receivedFiles.length < maxFiles
      ) {
        setIsExceed(false);

        setReceivedFiles((prev) => prev.concat(acceptedFiles));
      } else if (receivedFiles.length === maxFiles) {
        setIsExceed(true);
      } else {
        setIsExceed(true);
      }
    },
  });

  const onDel = (idx) => {
    setReceivedFiles((prev) => prev.filter((file, index) => index !== idx));

    setIsExceed(false);
  };

  return (
    <section
      className={`min-h-[22.4375rem] mx-1 my-5 outline-dashed outline-2 rounded-lg flex justify-center items-center flex-1 ${
        isExceed ? 'outline-[#781427]' : ''
      }`}
    >
      <div
        {...getRootProps({ className: 'dropzone' })}
        className='flex flex-1 flex-col justify-center items-center h-full'
      >
        <input {...getInputProps()} />
        <Image
          onClick={open}
          src={UploadIcon}
          className='cursor-pointer mx-auto'
          width={55}
          height={55}
          alt='upload'
        />

        {isExceed ? (
          <div className='bg-[#781427] rounded-[5px] px-2 py-1 flex items-center gap-2 mt-3'>
            <Image src={SignIcon} alt='sign' width={20} height={20} />
            <p className='text-[11px] '>
              {t(`maximumOnlyAllowUpload${maxFiles}Document`)}
            </p>
          </div>
        ) : (
          <p className='text-sm text-[#FFFFFF] text-center mt-3'>
            {t('dragAndDropAFileHereOrClick')}
          </p>
        )}
        <p className=' text-sm text-[#666666] text-center mt-1'>
          {t(`maximumUploadFileIs${maxFiles}`)}
        </p>
        <Files receivedFile={receivedFiles} onDel={onDel} />
      </div>
    </section>
  );
}
