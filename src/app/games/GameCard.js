'use client';
import { GameJoypad, GameMoney, IconDefaultGames } from '@/asset/icons';
import { ProfileModalType } from '@/components/profileModal';
import useUser from '@/hook/user/useUser';
import { setProfileModal } from '@/store/common';
import { setGameIsRealPlay } from '@/store/games';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { GameFav } from './GameFav';

export const GameCard = ({ data = {}, onClick }) => {
  const { id, name, is_maintenance, game_type, vendor, web_icon, app_icon } =
    data;
  const { user, isLogin } = useUser();
  const router = useRouter();

  const onClickGame = () => {
    //todo handle h5 case
    isWeb() ? router.push(`/games/${id}`) : onClick?.(data);
  };

  return (
    <div
      className={`relative bg-tayaGrey rounded-lg overflow-hidden ${
        isWeb() ? 'group' : ''
      }`}
    >
      <div className='relative flex w-full aspect-[430/326] overflow-hidden'>
        <Image
          placeholder='blur'
          blurDataURL={IconDefaultGames.src}
          onClick={(e) => {
            e.preventDefault();
            onClickGame();
          }}
          alt='game'
          src={isWeb() ? web_icon : app_icon}
          fill
          className='object-contain transition group-hover:scale-110 group-hover:opacity-50'
        />
        {is_maintenance ? (
          <Maintain
            from={data.maintenance_start * 1000}
            to={data.maintenance_end * 1000}
          />
        ) : (
          <BeforePlay isLogin={isLogin} id={id} />
        )}
      </div>
      <div className='absolute right-3 top-3'>
        <GameFav id={id} />
      </div>
      <div className={`${isWeb() ? 'p-3' : 'p-2'}`}>
        <div className=''>
          {(isWeb() ? vendor?.web_icon : vendor?.app_icon) ? (
            <Image
              alt='vendor'
              src={isWeb() ? vendor.web_icon : vendor.app_icon}
              className='inline w-5 h-5 rounded-sm'
              width={14}
              height={14}
            />
          ) : null}
          <div
            className={`inline ${
              isWeb() ? 'text-sm' : 'text-[11px]'
            } font-medium text-[#CFCFCF] leading-[11px] ml-2`}
          >
            {vendor?.name}
          </div>
        </div>
        <div
          className={`mt-2 ${
            isWeb() ? 'text-base h-[37px]' : ' text-[13px]'
          }  font-medium text-white`}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

const BeforePlay = ({ isLogin, id }) => {
  const containerCss =
    'rounded-lg justify-center flex px-5 py-2.5 gap-1.5 mx-8';
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className='hidden group-hover:flex absolute top-0 bottom-0 left-0 right-0 text-center font-medium leading-[22px] flex-1 gap-2.5 items-stretch justify-center flex-col bg-black/50'>
      {isLogin ? (
        <div
          className={`${containerCss} tayagradient cursor-pointer`}
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
            dispatch(setProfileModal(ProfileModalType.LoginModal));
          }}
          className={`${containerCss} cursor-pointer tayagradient`}
        >
          {t('signUp')}
        </div>
      )}
      <div
        className={`${containerCss} bg-[#FFFFFF14] backdrop-blur-sm cursor-pointer`}
        onClick={() => {
          dispatch(setGameIsRealPlay(false));
          router.push(`/games/${id}`);
        }}
      >
        <Image alt='fun' src={GameJoypad} />
        {t('funPlay')}
      </div>
    </div>
  );
};

const Maintain = ({ from, to }) => {
  const { t } = useTranslation();

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 font-medium leading-[22px] flex items-stretch justify-center flex-col bg-black/70'>
      <div className='text-base text-center'>{t('underMaintenance')}</div>
      <div className='text-sm text-center'>
        {new Date(from)
          .toLocaleString('en-PH')
          .split(':')
          .slice(0, -1)
          .join(':')}
      </div>
      <div className='text-sm text-center'>to</div>
      <div className='text-sm text-center'>
        {new Date(to).toLocaleString('en-PH').split(':').slice(0, -1).join(':')}
      </div>
    </div>
  );
};
