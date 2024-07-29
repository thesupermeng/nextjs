import {
  AllActive,
  AllInactive,
  FavActive,
  FavInactive,
  FeaturedActive,
  FeaturedInactive,
  RecentActive,
  RecentInactive,
} from '@/asset/icons';
import i18n from 'i18next';

export const GamesHeaderType = {
  All: {
    label: i18n.t('all'),
    key: 'all',
    iconA: AllActive,
    icon: AllInactive,
  },
  Favourite: {
    label: i18n.t('favourite'),
    key: 'fav',
    userOnly: true,
    iconA: FavActive,
    icon: FavInactive,
  },
  Recent: {
    label: i18n.t('recent'),
    key: 'recent',
    userOnly: true,
    iconA: RecentActive,
    icon: RecentInactive,
  },
  Featured: {
    label: i18n.t('featured'),
    key: 'featured',
    iconA: FeaturedActive,
    icon: FeaturedInactive,
  },
};

export const GamesHeaderTypes = [
  GamesHeaderType.All,
  GamesHeaderType.Featured,
  GamesHeaderType.Favourite,
  GamesHeaderType.Recent,
];
export const GameListRefreshInterval = 60 * 1000;
