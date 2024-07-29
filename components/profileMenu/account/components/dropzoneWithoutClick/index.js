import { UploadImg } from '@/asset/icons';
import { selectAvatar, setFiles } from '@/store/profile';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';

const DropzoneWithoutClick = () => {
  //const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const { t } = useTranslation()
  const { files } = useSelector((s) => s.profile)

  const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
    noClick: true,
    onDrop: acceptedFiles => {
      dispatch(setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))));
      dispatch(selectAvatar(2));
    }
  });

  // const thumbs = files.map((file) => (
  //   <div
  //     key={file.name}
  //     style={{
  //       isplay: 'inline-flex',
  //       borderRadius: 2,
  //       border: '1px solid #eaeaea',
  //       marginBottom: 8,
  //       marginRight: 8,
  //       width: 100,
  //       height: 100,
  //       padding: 4,
  //       boxSizing: 'border-box',
  //     }}
  //   >
  //     <div style={{ display: 'flex', minWidth: 0, overflow: 'hidden' }}>
  //       <img alt={'default'} src={file.preview} />
  //     </div>
  //   </div>
  // ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className='mt-7 outline-dashed outline-2 rounded-lg h-[14.4375rem] flex justify-center items-center'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Image src={UploadImg} className='mx-auto' alt='upload' />
        <p className=' text-sm text-[#FFFFFF]'>
          {t('dragAndDropYourPhotoHere')}
        </p>
        <p className=' text-sm text-[#FFFFFF]/[.5] text-center'>or</p>
        <button
          className='block mx-auto tayagradient px-5 py-2.5 rounded-lg'
          onClick={open}
        >
          <p className='text-[#FFFFFF] text-sm  font-medium'>
            {t('uploadPhoto')}
          </p>
        </button>
        {/* <aside
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 16,
          }}
        >{thumbs}</aside> */}
      </div>
    </section>
  );
};

export default DropzoneWithoutClick;
