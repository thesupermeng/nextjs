import { CrossWhite, GameJoypad, GameMoney } from '@/asset/icons';
import useUser from '@/hook/user/useUser';
import { setGameIsRealPlay, setIsPopUp } from '@/store/games';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

const containerCss = 'rounded-lg justify-center flex px-2.5 py-1 gap-1.5';

export const GamePopup = ({ data, setShowPopup }) => {
  const { id, name, vendor, app_icon } = data;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { isLogin } = useUser();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, []);

  useEffect(() => {
    dispatch(setIsPopUp(show));
  }, [show]);

  return (
    <>
      <div
        className={`${
          show ? 'bg-black/40' : 'bg-black/0'
        } fixed z-[50] inset-0 transition-all duration-300`}
      ></div>
      <div
        className={`${
          show ? 'bottom-0' : '-bottom-full'
        } transition-all duration-300 fixed z-[55] left-0 right-0 flex flex-row px-4 pt-4 pb-5 gap-4 bg-black/[0.66]  backdrop-blur rounded-xl overflow-hidden`}
      >
        <div className='relative aspect-[430/326] w-[150px] flex flex-initial rounded-lg overflow-hidden'>
          <Image
            alt='game'
            src={app_icon}
            fill
            className='flex flex-initial object-stretch'
          />
        </div>
        <div className='flex flex-col flex-1 gap-2 px-2'>
          <div className='flex flex-initial flex-row mt-2'>
            {vendor.app_icon ? (
              <Image
                alt='vendor'
                src={vendor.app_icon}
                className='inline w-3.5 h-3.5'
                width={14}
                height={14}
              />
            ) : null}
            <div
              className={`text-[13px] font-medium text-[#CFCFCF] leading-[13px] ml-[3px]`}
            >
              {vendor.name}
            </div>
          </div>
          <div className={`text-[15px] font-medium text-white`}>{name}</div>
          <div className='flex flex-1' />
          {isLogin ? (
            <div
              className={`${containerCss} tayagradient `}
              onClick={() => {
                dispatch(setGameIsRealPlay(true));
                router.push(`/games/${id}`);
              }}
            >
              <Image alt='real' src={GameMoney} /> {t('realPlay')}
            </div>
          ) : (
            <div
              onClick={() => {
                router.push('/user/login');
              }}
              className={`${containerCss} tayagradient `}
            >
              Sign Up
            </div>
          )}
          <div
            className={`${containerCss} bg-[#FFFFFF14] backdrop-blur-sm`}
            onClick={() => {
              dispatch(setGameIsRealPlay(false));
              router.push(`/games/${id}`);
            }}
          >
            <Image alt='fun' src={GameJoypad} />
            {t('funPlay')}
          </div>
        </div>

        <Image
          alt='close'
          onClick={() => {
            setShow(false);
            setTimeout(() => {
              setShowPopup(false);
            }, 300);
          }}
          width={20}
          height={20}
          src={CrossWhite}
          className='absolute right-3 top-3'
        />
      </div>
    </>
  );
};
