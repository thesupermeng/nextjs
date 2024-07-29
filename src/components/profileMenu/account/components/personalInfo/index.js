import { Arrow, Avatar } from '@/asset/icons';
import { selectAvatar } from '@/store/profile';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import '../styles/Calendar.css';
import useUser from '@/hook/user/useUser';
import { isWeb } from '@/util/common';
import { updateNickname } from '@/services/user';
import SuccessModal from '../changePassword/components/successModal';
import BetError from '@/components/betCart/BetError';
import { Button } from '@/componentsH5/button';
import { useRouter } from 'next/navigation';
import UploadImgModal from '../uploadImgModal';
import CropImgModal from '../cropImgModal';
import { ImageWithFallback } from '@/components/fallbackImage';

const tailwindCss =
  'flex-none w-full h-[2.625rem] bg-tayaGrey rounded-md mb-[1.4375rem] flex flex-1 items-center px-3 text-[#969696] text-[13px]';
const twContent = '!m-0 text-[13px] !text-right flex';

const Column = ({ title, children }) => {
  return (
    <div className={`${tailwindCss}`}>
      <p className='flex flex-1'>{title}</p>
      <div className={`${twContent}`}>{children}</div>
    </div>
  );
};

const PersonalInfo = ({ toggleSheet = () => {} }) => {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const { user } = useUser();
  const { avatarSelected } = useSelector((s) => s.profile);

  const dispatch = useDispatch();

  const onAvatarClick = () => {
    if (isWeb()) {
      dispatch(selectAvatar(1));
    } else {
      toggleSheet();
    }
  };
  const onUpdateClick = () => {
    if (nickname) {
      updateNickname({ nickname: nickname }).then((data) => {
        if (data?.code === 0) {
          setSuccess(true);
        } else {
          setError(data?.msg);
        }
      });
    }
  };

  return (
    <>
      <div className={`flex flex-col flex-1 overflow-y-auto no-scrollbar p-4`}>
        <button
          onClick={onAvatarClick}
          className='flex w-full h-[2.625rem] bg-tayaGrey rounded-md pl-3.5 pr-1 py-3 justify-between mb-[1.4375rem]'
        >
          <p className='text-errorRed text-sm'>{t('avatar')}</p>
          <div className='flex'>
            <ImageWithFallback
              src={user?.avatar}
              fallbackSrc={Avatar}
              width={22}
              height={22}
              className='rounded-full w-[22px] h-[22px] object-cover'
            />
            <Image src={Arrow} alt='arrow' />
          </div>
        </button>

        <Column title={t('nickname')}>
          <input
            type='text'
            className={`${twContent} placeholder:text-[#969696] h-[2.625rem] bg-tayaGrey rounded-md pl-3.5 py-3 outline-none text-white font-extrabold`}
            placeholder={user?.nickname}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Column>

        <Column title={t('username')}>{user?.username}</Column>
        <Column title={t('email')}></Column>
        <Column title={t('phoneNumber')}>
          {user?.country_code && user?.mobile
            ? user?.country_code + ' ' + user?.mobile
            : ''}
        </Column>
        <Column title={t('firstName')}>{user?.kyc?.first_name}</Column>
        <Column title={t('middleName')}>{user?.kyc?.middle_name}</Column>
        <Column title={t('lastName')}>{user?.kyc?.last_name}</Column>
        <Column title={t('currentAddress')}>
          {user?.kyc?.current_address}
        </Column>
        <Column title={t('permanentAddress')}>
          {user?.kyc?.permanent_address}
        </Column>
        <Column title={t('birthday')}>{user?.kyc?.birthday}</Column>
      </div>

      <Button onClick={onUpdateClick} className={'px-2'}>
        {t('update')}
      </Button>

      {avatarSelected === 1 && (
        <UploadImgModal avatarSelected={avatarSelected} />
      )}
      {avatarSelected === 2 && <CropImgModal avatarSelected={avatarSelected} />}

      {success && (
        <SuccessModal
          message={t('profileUpdated')}
          setModalOpen={() => {
            setSuccess(false);
            if (!isWeb()) router.push('/user');
          }}
        />
      )}
      {error && (
        <BetError message={error} setShowErrorModal={() => setError('')} />
      )}
    </>
  );
};

export default PersonalInfo;
