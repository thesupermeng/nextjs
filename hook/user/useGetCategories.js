import { URL_USER } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import useSWR from 'swr';

export default function () {
  const { data } = useSWR(
    URL_USER.getCategories,
    (url) => UserApi(url, {}, { method: 'GET' }),
    {
      revalidateOnFocus: false,
    }
  );
  return {
    categories: data?.data,
    sportsCategories: getSportsCategories(data?.data),
    categoryIcons: data?.data
      ?.find((e) => e.id === 1)
      ?.categories?.reduce((obj, cur) => {
        return { ...obj, [cur.id]: cur.icon2 };
      }, {}),
  };
}

const all = {
  id: -1,
  name: 'All',
  icon1: 'https://static.97kqb.com/img/icon/icon-20231025075112-c4zY1w.svg',
  icon2: 'https://static.97kqb.com/img/icon/icon-20231025075113-kuVjiX.svg',
  icon3: 'https://static.97kqb.com/img/icon/icon-20231025075113-wIWRqU.png',
  rules: '',
};

const getSportsCategories = (data) => {
  // let list = categories?.[0]?.categories;
  // const foundItem = list?.find((element) => element.id === all.id);
  // if (!foundItem && list) list?.unshift(all);

  try {
    return data.find((e) => e.id === 1).categories;
  } catch (e) {
    return [];
  }
};
// const sample = {
//   code: 0,
//   data: [
//     {
//       id: 3,
//       name: 'Sports',
//       icon: '',
//     },
//     {
//       id: 1,
//       name: 'Esports',
//       icon: 'http://localhost/img/user/1/icon/1-icon-20230912111042-4Re5MF.jpg',
//       categories: [
//         {
//           id: 3,
//           name: 'DOTA2',
//           icon: '',
//         },
//         {
//           id: 1,
//           name: 'LOL',
//           icon: 'http://localhost/img/user/1/icon/1-icon-20230911162251-Z26czU.jpg',
//         },
//       ],
//     },
//   ],
//   msg: '',
// };
