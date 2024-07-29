import Image from 'next/image';
import { CrossWhite } from '@/asset/icons';
import DropzoneWithoutClick from '../dropzoneWithoutClick';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { selectAvatar } from '@/store/profile';
import FullScreenModal from '@/components/FullScreenModal';

const UploadImgModal = ({avatarSelected}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(selectAvatar(0))
  }

  return (
      <FullScreenModal>
        <div className='rounded-3xl bg-[#121212] w-[29.6875rem] h-[21.8125rem] p-7'>
          <div className='flex justify-between'>
            <div></div>
            <div>{t('changeAvatar')}</div>
            <button onClick={onClose}>
              <Image className='w-9 h-9 opacity-20 hover:opacity-100' src={CrossWhite} alt='close' />
            </button>
          </div>
          <div>
            <DropzoneWithoutClick />
          </div>
        </div>
      </FullScreenModal>
  );
};

export default UploadImgModal;
