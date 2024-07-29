import { isWeb } from '@/util/common';
import { useEffect, useState } from 'react';
import { Dices } from './Dices';
import { GAMES_ID, GAMES_TITLE } from '@/config/streamGames';
import { useDispatch } from 'react-redux';
import { setGameId } from '@/store/streamGame';
import { useStreamGameList } from '@/hook/streamGames/useStreamGameList';
import { useTranslation } from 'next-i18next';

export const StreamGames = ({ isMini }) => {
  const [selectedTab, setSelectedTab] = useState(GAMES_ID.DICES);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGameId(selectedTab));
  }, [selectedTab]);

  return (
    <div className={`relative flex flex-col flex-1 ${isWeb() ? 'my-5' : ''}`}>
      <div className='absolute inset-0 overflow-y-hidden'>
        <ButtonTabBar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          isMini={isMini}
        />
        <div className='flex-1 overflow-y-auto w-full h-full pb-4'>
          {selectedTab === GAMES_ID.DICES && <Dices />}
        </div>
      </div>
    </div>
  );
};

const ButtonTabBar = ({ selectedTab, setSelectedTab, isMini }) => {
  const { gameList } = useStreamGameList();
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-none gap-3 ${
        isWeb() ? 'pb-2' : 'p-2 bg-black'
      }        ${isMini && 'fixed top-16 bg-black  w-full z-10'} `}
    >
      {gameList?.map((item) => {
        return (
          <div
            key={item.id}
            className={`cursor-pointer  px-3  rounded-[6px] ${
              selectedTab === item.id ? 'bg-[#DE173E52]' : 'bg-tayaGrey'
            } ${isWeb() ? 'text-sm py-2' : 'text-[13px] py-1'}`}
            onClick={() => setSelectedTab(item.id)}
          >
            <p>{t(GAMES_TITLE[item.id])}</p>
          </div>
        );
      })}
    </div>
  );
};
