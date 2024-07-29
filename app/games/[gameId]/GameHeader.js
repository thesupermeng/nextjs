import { Close, FullScreenIcon, FullScreenExitIcon } from '@/asset/icons';
import ToggleRed from '@/components/Fragments/ToggleRed';
import { ProfileModalType } from '@/components/profileModal';
import { useGames } from '@/hook/games/useGames';
import useUser from '@/hook/user/useUser';
import { setProfileModal } from '@/store/common';
import { setGameFullScreen, setGameIsRealPlay } from '@/store/games';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { GameFav } from '../GameFav';

export default function GameHeader({ id }) {
  const router = useRouter();
  const { isLogin } = useUser();
  const { getGameInfo } = useGames();
  const gameData = getGameInfo(id);
  const vendorIcon = isWeb()
    ? gameData?.vendor.web_icon
    : gameData?.vendor.app_icon;
  const dispatch = useDispatch();
  const { isRealPlay, gameFullScreen } = useSelector((s) => s.games);
  const { t } = useTranslation();

  const toggleFullScreen = () => {
    dispatch(setGameFullScreen(!gameFullScreen));
  };

  const togglePlayType = (isRealPlay) => {
    if (!isLogin && !isRealPlay) {
      if (isWeb()) {
        dispatch(setProfileModal(ProfileModalType.LoginModal));
      } else {
        router.push('/user/login');
      }
    } else {
      dispatch(setGameIsRealPlay(!isRealPlay));
    }
  };

  return (
    <div
      className={`flex flex-initial justify-between items-center p-4 ${
        isWeb() ? 'rounded-t-xl' : ''
      } bg-tayaGrey opacity-80`}
    >
      <GameFav id={id} />
      <div className='flex-1 ml-2.5'>
        <div className=''>
          {vendorIcon && (
            <Image
              alt='icon'
              src={vendorIcon}
              className='inline w-3.5 h-3.5'
              width={14}
              height={14}
            />
          )}
          <div className='inline text-sm font-medium text-[#CFCFCF] ml-2'>
            {gameData?.vendor?.name}
          </div>
        </div>
        <div className='text-base font-medium text-white'>{gameData?.name}</div>
      </div>

      <ToggleRed
        left={t('funPlay')}
        right={t('realPlay')}
        isLeft={!isRealPlay}
        toggle={() => {
          togglePlayType(isRealPlay);
        }}
      />

      {isWeb() ? (
        <Image
          onClick={toggleFullScreen}
          alt='full screen'
          src={gameFullScreen ? FullScreenExitIcon : FullScreenIcon}
          className='ml-16 opacity-70 hover:opacity-100 cursor-pointer'
        />
      ) : null}

      <Image
        alt='full screen'
        src={Close}
        className='ml-4 opacity-70 hover:opacity-100 cursor-pointer'
        onClick={() => {
          router.push('/games');
        }}
      />
    </div>
  );
}
