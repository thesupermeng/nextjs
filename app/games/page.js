'use client';
import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import { PageContent } from '@/components/pageElement/PageContent';
import { Pageheader } from '@/components/pageElement/PageHeader';
import { NavItem } from '@/components/sidebar/buttons/TabBarButton';
import { useGameProviders } from '@/hook/games/useGameProviders';
import { useState } from 'react';
import { GamesList } from './GameList';
import { GamePopup } from './GamePopup';
import { GameTypes } from './GameTypes';
import Footer from '@/components/Footer';
import Announcement from '@/components/announcement';
import { NavFooter } from '@/componentsH5/NavFooter/NavFooter';
import { useOffsetPosition } from '@/hook/useOffsetPosition';

export default function Page() {
  const [showGameData, setShowGameData] = useState(false);
  const { checkOffset } = useOffsetPosition();

  const onClick = (data) => {
    setShowGameData(data);
  };
  useGameProviders();
  return (
    <>
      <WEBOnly>
        <PageContent
          header={
            <Pageheader navItem={NavItem.games}>
              <div className='flex flex-row flex-1 gap-2 items-center'>
                <GameTypes />
              </div>
            </Pageheader>
          }
        >
          <GamesList />
        </PageContent>
      </WEBOnly>
      <H5Only>
        <div
          style={{ marginTop: `${checkOffset(3.2)}rem` }}
          className='fixed top-0 flex flex-row flex-initial gap-2 items-center z-50 bg-black w-full'
        >
          <GameTypes />
        </div>
        <div
          style={{ marginTop: `${checkOffset(7)}rem` }}
          className='px-1.5 flex overflow-y-auto z-20 bg-[#121212]'
        >
          <div className='w-full'>
            <GamesList onClick={onClick} />
            <Footer />
          </div>
        </div>

        {showGameData && (
          <GamePopup data={showGameData} setShowPopup={setShowGameData} />
        )}
        <Announcement />
        <NavFooter />
      </H5Only>
    </>
  );
}
