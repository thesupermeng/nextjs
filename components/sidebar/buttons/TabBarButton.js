'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';

// Nav Icons
import Home from './images/home.svg';
import HomeActive from './images/homeActive.svg';
import HomeHover from './images/homeHover.svg';
import Live from './images/live.svg';
import LiveActive from './images/liveActive.svg';
import LiveHover from './images/liveHover.svg';
import Sports from './images/sports.svg';
import SportsActive from './images/sportsActive.svg';
import SportsHover from './images/sportsHover.svg';
import Games from './images/games.svg';
import GamesActive from './images/gamesActive.svg';
import GamesHover from './images/gamesHover.svg';
import Stats from './images/stats.svg';
import StatsActive from './images/statsActive.svg';
import StatsHover from './images/statsHover.svg';
import BettingRules from './images/bettingRules.svg';
import BettingRulesActive from './images/bettingRulesActive.svg';
import BettingRulesHover from './images/bettingRulesHover.svg';
import Promotion from './images/promotion.svg';
import PromotionActive from './images/promotionActive.svg';
import PromotionHover from './images/promotionHover.svg';
import More from './images/more.svg';
import MoreActive from './images/moreActive.svg';

export const NavItem = {
  home: {
    text: 'Home',
    translationKey: 'home',
    link: '/home',
    icon: Home,
    iconActive: HomeActive,
    iconHover: HomeHover,
  },
  live: {
    text: 'Live',
    translationKey: 'live',
    link: '/live',
    icon: Live,
    iconActive: LiveActive,
    iconHover: LiveHover,
  },
  sports: {
    text: 'Sports',
    translationKey: 'sports',
    link: '/sports',
    icon: Sports,
    iconActive: SportsActive,
    iconHover: SportsHover,
  },
  games: {
    text: 'Games',
    translationKey: 'games',
    link: '/games',
    icon: Games,
    iconActive: GamesActive,
    iconHover: GamesHover,
  },
  stats: {
    text: 'Stats',
    translationKey: 'stats',
    link: '/stats',
    icon: Stats,
    iconActive: StatsActive,
    iconHover: StatsHover,
  },
  bettingRules: {
    text: 'Betting Rules',
    translationKey: 'bettingRules',
    link: '/bettingrules',
    icon: BettingRules,
    iconActive: BettingRulesActive,
    iconHover: BettingRulesHover,
  },
  promotion: {
    text: 'Promotion',
    translationKey: 'promotion',
    link: '/promotion',
    icon: Promotion,
    iconActive: PromotionActive,
    iconHover: PromotionHover,
  },
  userMore: {
    text: 'More',
    translationKey: 'more',
    link: '/user',
    icon: More,
    iconActive: MoreActive,
  },
};

export const NavButtons = ({ isExpand, type, pathname }) => {
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsActive(pathname.startsWith(NavItem[type]?.link));
  }, [pathname, type]);

  return (
    <Link
      className={`py-3 px-4  flex h-12 flex-row flex-initial overflow-hidden items-center justify-start rounded-lg group ${
        isActive ? 'backdrop-blur-2xl bg-white/5' : ''
      }`}
      href={`${NavItem[type]?.link}`}
    >
      {isActive ? (
        // active icon
        <Image
          alt={type}
          className='flex-none w-6 h-6'
          src={NavItem[type]?.iconActive}
        />
      ) : (
        <>
          {/* inactive and hover */}
          <Image
            alt={type}
            className='flex-none hidden w-6 h-6 group-hover:block'
            src={NavItem[type]?.iconHover}
          />
          {/* inactive normal */}
          <Image
            alt={type}
            className='flex-none block w-6 h-6 group-hover:hidden'
            src={NavItem[type]?.icon}
          />
        </>
      )}
      <div
        className={`font-medium text-sm flex-1 ml-7 group-hover:text-white whitespace-nowrap ${
          isActive ? 'text-white' : 'text-[#6F7076]'
        }`}
      >
        {t(NavItem[type].text)}
      </div>
    </Link>
  );
};

export const TabBarButtons = ({ isExpand }) => {
  const pathname = usePathname();
  const commonProp = useMemo(
    () => ({
      isExpand,
      pathname,
    }),
    [pathname, isExpand]
  );

  return (
    <div className='flex flex-col flex-1 gap-3 bg-sideMenu'>
      <NavButtons type='home' {...commonProp} />
      {/* <NavButtons type='live' {...commonProp} /> */}
      <NavButtons type='games' {...commonProp} />
      <NavButtons type='sports' {...commonProp} />
      <NavButtons type='promotion' {...commonProp} />
      <NavButtons type='bettingRules' {...commonProp} />
    </div>
  );
};
