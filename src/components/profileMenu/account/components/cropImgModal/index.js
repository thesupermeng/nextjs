import Image from 'next/image';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import { CrossWhite } from '@/asset/icons';
import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import getCroppedImg from './cropImg';
import { selectAvatar, setCroppedImg } from '@/store/profile';
import FullScreenModal from '@/components/FullScreenModal';
import convertDataUrlToFile from './convertDataUrl';
import useUser from '@/hook/user/useUser';
import SuccessModal from '../changePassword/components/successModal';
import { isWeb } from '@/util/common';

const CropImgModal = ({ avatarSelected }) => {
  const { t } = useTranslation();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const { files, croppedImg } = useSelector((s) => s.profile);

  const { updateProfilePic } = useUser();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        files[0].preview,
        croppedAreaPixels,
        0
      );

      //convert cropped img to
      const file = await convertDataUrlToFile(croppedImage, 'croppedImg.jpeg');

      if (file.size < 5000001) {
        updateProfilePic(file).then((s) => {
          setSuccess(true);
        });
      }
      dispatch(setCroppedImg(croppedImage));
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const onClose = () => {
    dispatch(selectAvatar(0));
  };

  return (
    <FullScreenModal>
      <div
        className={`rounded-3xl bg-[#121212] ${
          isWeb() ? 'w-[29.6875rem] ' : 'w-[20rem] '
        } h-[31.9375rem] p-7`}
      >
        <div className='flex justify-between'>
          <div></div>
          <div>{t('changeAvatar')}</div>
          <button onClick={onClose}>
            <Image
              className='w-9 h-9 opacity-20 hover:opacity-100'
              src={CrossWhite}
              alt='close'
            />
          </button>
        </div>
        <div
          className={`absolute h-[20.625rem] ${
            isWeb() ? 'w-[24.6875rem] ' : 'w-[15rem] '
          } mt-3 left-1/2 transform -translate-x-1/2 bg-[#121212]`}
        >
          <Cropper
            image={files[0]?.preview}
            crop={crop}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            cropShape={'round'}
            showGrid={false}
          />
        </div>
        <button
          className={`mt-[24.625rem] w-full tayagradient px-5 py-2.5 rounded-lg`}
          onClick={showCroppedImage}
        >
          <p className='text-[#FFFFFF] text-sm  font-medium'>{t('upload')}</p>
        </button>
      </div>
      <img />
      {/* {croppedImg !== null && <img src={croppedImg} alt={'not found'} style={{width: '100px', height: '100px'}} />} */}
      {/* <img src={} id='cropImg' /> */}

      {success && (
        <SuccessModal
          message={t('profileImageUpdated')}
          setModalOpen={() => {
            setSuccess(false);

            onClose();
          }}
        />
      )}
    </FullScreenModal>
  );
};

export default CropImgModal;
