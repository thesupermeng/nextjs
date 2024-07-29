'use client';
import { Camera, Gallery } from '@/asset/icons';
import PersonalInfo from '@/components/profileMenu/account/components/personalInfo';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import BottomSheet from '@/componentsH5/bottomSheet';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { selectAvatar, setFiles } from '@/store/profile';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="viewport"]');
    metaTag.name = 'viewport';
    if(metaTag) {
      metaTag.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    }
    return () => {
      metaTag.content = 'width=device-width, initial-scale=1';
    };
  }, []);

  const toggleSheet = () => {
    setModalOpen(!modalOpen);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        // Set selectedFile with a preview property
        const fileWithPreview = Object.assign(selectedFile, {
          preview: reader.result,
        });

        dispatch(setFiles([fileWithPreview]));
        dispatch(selectAvatar(2));
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // setPreviewURL(null);
    }
    toggleSheet();
  };

  return (
    <FullPageContent>
      <NavHeader label={t('personalInfo')} />
      <PersonalInfo toggleSheet={toggleSheet} />
      <BottomSheet
        isOpen={modalOpen}
        title={t('changeAvatar')}
        toggleSheet={() => toggleSheet()}
      >
        <div className='flex flex-1 items-center justify-center gap-10'>
          <label className='flex flex-col items-center'>
            <Image src={Camera} alt='camera' width={50} height={50} />
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
            <p>{t('camera')}</p>
          </label>
          <label className='flex flex-col items-center'>
            <Image src={Gallery} alt='camera' width={50} height={50} />
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
            <p>{t('gallery')}</p>
          </label>
        </div>
      </BottomSheet>
    </FullPageContent>
  );
}
