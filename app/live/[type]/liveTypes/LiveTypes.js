import useGetCategories from '@/hook/user/useGetCategories';
import LiveType from '.';
import i18n from 'i18next';
import { AllActiveIcon, AllInactiveIcon } from '@/asset/icons';

export const LiveTypes = ({ selectedId, onTypeChange, isRules = false }) => {
  const { sportsCategories: types } = useGetCategories();
  return (
    <>
      {!isRules && (
        <LiveType
          key={all.id}
          typeData={all}
          selected={selectedId === all.id}
          onClick={() => {
            onTypeChange?.(all);
          }}
        />
      )}

      {types?.map((type, idx) => {
        return (
          <LiveType
            key={`${type.id}`}
            typeData={type}
            selected={selectedId == type.id}
            onClick={() => {
              onTypeChange?.(type);
            }}
          />
        );
      })}
    </>
  );
};

const all = {
  id: 'all',
  name: 'all',
  icon1: AllInactiveIcon,
  icon2: AllActiveIcon,
  icon3: AllInactiveIcon,
  rules: '',
};

const categories = [
  {
    id: 1,
    name: 'Sports',
    icon: '',
    categories: [
      {
        id: 2,
        name: 'Basketball',
        icon1:
          'https://static.zbstg.co/img/user/15/avatar/15-avatar-20231011034822-lVIGGR.png',
        icon2:
          'https://static.zbstg.co/img/user/15/avatar/15-avatar-20231011034822-lVIGGR.png',
        icon3:
          'https://static.zbstg.co/img/user/15/avatar/15-avatar-20231011034822-lVIGGR.png',
      },
      {
        id: 1,
        name: 'Soccer',
        icon1:
          'https://static.zbstg.co/img/user/15/avatar/15-avatar-20231011034001-tYdt1x.png',
        icon2:
          'https://static.zbstg.co/img/user/15/avatar/15-avatar-20231011034001-tYdt1x.png',
        icon3:
          'https://static.zbstg.co/img/user/15/avatar/15-avatar-20231011034001-tYdt1x.png',
      },
    ],
  },
];
