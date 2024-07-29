import { SignIcon, UploadIcon } from '@/asset/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Files from './files';
import { useDropzone } from 'react-dropzone';

export default function DropZoneH5({
  setReceivedFiles,
  maxFiles = 1,
  receivedFiles,
}) {
  const [isExceed, setIsExceed] = useState(false);
  const { t } = useTranslation();
  const { getInputProps, open } = useDropzone({
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
        // setReceivedFile((prev) => prev.concat(acceptedFiles));
        setReceivedFiles((prev) => prev.concat(acceptedFiles));
      } else if (receivedFiles.length === 1) {
        setIsExceed(true);
      } else {
        setIsExceed(true);
      }
    },
  });

  const onDel = (idx) => {
    setReceivedFiles((prev) => prev.filter((file, index) => index !== idx));
    // setReceivedFile(receivedFile.filter((file, index) => index !== idx));
    setIsExceed(false);
  };

  useEffect(() => {}, []);
  return (
    <>
      <Files receivedFile={receivedFiles} onDel={onDel} />
      {isExceed ? (
        <div className='bg-[#781427] rounded-[5px] px-2 py-1 flex items-center gap-2 mt-5'>
          <Image src={SignIcon} alt='sign' width={20} height={20} />
          <p className='text-[11px] text-[#666]'>
            {t('maximumOnlyAllowUpload2Documents')}
          </p>
        </div>
      ) : (
        <></>
      )}
      {/* {receivedFile.length !== maxFiles && ( */}
      <section
        className={`opacity-50 mx-1 my-5 outline-dashed outline-2 rounded-lg flex justify-center items-center flex-1 ${
          isExceed ? 'outline-[#781427]' : ''
        }`}
      >
        <div className='flex flex-1 items-center justify-between p-3 relative'>
          <div className='flex items-center text-[13px]' onClick={open}>
            <input {...getInputProps()} />
            <Image
              src={UploadIcon}
              className='mx-auto'
              width={22}
              height={21}
              alt='upload'
            />
            <p className='ml-3'>+ {t('uploadFile')}</p>
          </div>
          <p className=' text-xs text-[#666666] text-center mt-1'>
            {t(`maximumUploadFileIs${maxFiles}`)}
          </p>
        </div>
      </section>
      {/* )} */}
    </>
  );
}
