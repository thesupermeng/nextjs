import { GamesHeaderTypes } from '@/config/Games/gameConfig';
import { useGameProviders } from '@/hook/games/useGameProviders';
import useUser from '@/hook/user/useUser';
import { setGameTypeHeader } from '@/store/games';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
// import { TwCss_hightlightBottom } from '../sports/Taya/HeaderMatchPlayType';
import { GameProviderFilterIcon } from './GameProviderFilterIcon';

export const GameTypes = () => {
  const { isLogin } = useUser();
  const dispatch = useDispatch();
  const headerType = useSelector((s) => s.games.headerType);
  const onClick = (type) => {
    dispatch(setGameTypeHeader(type));
  };
  return (
    <div className='flex flex-1 justify-between items-center'>
      <div
        className={`flex flex-[1_0_0] overflow-x-auto bg-transparent items-center justify-start ${
          isWeb() ? 'px-3 gap-4 items-center' : 'p-3 gap-2 items-stretch'
        }`}
      >
        {GamesHeaderTypes.filter((type) => !type.userOnly || isLogin).map(
          (type) => {
            return (
              <div
                key={type.key}
                onClick={() => {
                  onClick(type);
                }}
                className={
                  isWeb()
                    ? `relative h-11 shrink-0 flex-initial rounded-lg py-[0.375rem] px-[0.625rem] overflow-hidden flex flex-row items-center gap-[5px] transition-length duration-300 ease-in-out cursor-pointer ` +
                      `${
                        headerType.key === type.key
                          ? 'tayagradient shadow-inner text-white max-w-[40rem]'
                          : 'bg-white/5 text-transparent max-w-[2.5rem] hover:max-w-[40rem] hover:text-[#7B7B7B]'
                      }`
                    : `relative flex-initial text-center self-center text-sm font-normal rounded-lg py-1.5 px-2.5 common-transition  ${
                        headerType.key === type.key
                          ? `text-white/100 tayagradient `
                          : `text-white/50`
                      }`
                }
              >
                {isWeb() ? (
                  <Image
                    alt={type.label}
                    width={22}
                    height={22}
                    src={headerType.key === type.key ? type.iconA : type.icon}
                    className={`flex-initial w-[22px] h-[22px]`}
                  />
                ) : null}
                {type.label}
              </div>
            );
          }
        )}
      </div>
      <GameProviderFilterIcon />
    </div>
  );
};
