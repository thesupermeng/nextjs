import { URL_USER } from '@/config/url';
import { User_Refresh_Interval } from '@/config/User/setting';
import { UserApi } from '@/util/UserApi';
import useSWR from 'swr';

const EmptyArray = [];
export const useAnnouncements = () => {
  const { data } = useSWR(
    URL_USER.getAnnouncements,
    (url) => UserApi(url, {}, { method: 'GET' }),
    {
      refreshInterval: User_Refresh_Interval.Announcement,
      revalidateOnFocus: false,
    }
  );
  return {
    textsAnnouncements: data?.data?.texts || EmptyArray,
    imagesAnnouncements: data?.data?.images || EmptyArray,
    downloadsAnnouncements: data?.data?.downloads || EmptyArray,
    othersAnnouncements: data?.data?.others || EmptyArray,
  };
};
