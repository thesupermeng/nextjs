import { URL_USER } from '@/config/url';
import { User_Refresh_Interval } from '@/config/User/setting';
import { UserApi } from '@/util/UserApi';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

export const useStreams = () => {
  const category = useSelector((s) => s.streams.category);
  const { data, mutate, isLoading } = useSWR(
    [URL_USER.getStreams, { page: 1, category, limit: 1000000 }],
    ([url, params]) => UserApi(url, params, { method: 'GET' }),
    { refreshInterval: User_Refresh_Interval.Streams }
  );
  return {
    streams: data?.data || [],
    isLoading,
  };
};
const arr = [
  {
    id: 55555,
    streamer_id: 510,
    status: 3,
    src: 'KFtARnlPKW/V5uaKBI9uyVGIMq9/5llbSebMC8F9oa5Aoa9aOO8HxcxY/D2MK85ZUrCAOhATd6q20SZAxq8toyYoBpo2vpYWKDf9KF2UOgSqpooIjtsqjbpa4wdou4fIYYU0nZfXem7L8c7LuCvfcBFZjq5Jvke0PK4LeMaL+F7M4YwWgF8544ZB3j7CBEXkQJIbwCmifIde17uX+rerSji+kjsO1CzH+Wr0u5A3f4k8',
    ql_status: 0,
    room_url: 'https://xxxxxxxx.com/stream/510',
    room_id: 'stream:55555',
    room_image_type: 1,
    room_image_url:
      'https://static.zbstg.co/img/user/510/room_image/510-room_image-20230821175934-GiztXg.png',
    view_num: 153,
    current_view: 9,
    title: 'lol',
    schedule_time: '2023-08-21 17:59:00',
    schedule_time_ts: 1692611940,
    category_id: 6,
    streamer: {
      id: 510,
      nickname: '334 LoL Fans',
      follower_count: 11,
      avatar:
        'https://static.zbstg.co/img/user/510/avatar/510-avatar-20230726173807-rfTM6n.jpg',
      cover_image: '',
      stream_count: 5,
      bio: 'w\r\ni\r\nn\r\nd\r\no\r\nw\r\ns \r\n\r\nx\r\np',
      is_live: true,
      last_live_at: '2023-08-21 17:57:05',
      last_live_at_ts: 1692611825,
    },
  },
  {
    id: 55557,
    streamer_id: 518,
    match_id: 1003746916,
    status: 3,
    src: 'tdST830Mw4GMz5/b02ErFUj9lv4Ii7hnP4wYltyT1s0b3xKzA5vbMbrAkAB1jxHaypMWLSZEKcsrW5BnGplcVBHpa/dG5Mi1C9XYMMiRuogSm8A3aGz+bxT+Wc8SApyvdrBjmhxCJQ6ggF8S49pPrdnWXtLm2QV2do9YOymw0bCtFkMr91fGncDP9l5YTYWaVJId',
    ql_status: 0,
    room_url: 'https://xxxxxxxx.com/stream/518',
    room_id: 'stream:55557',
    room_image_type: 1,
    room_image_url:
      'https://static.zbstg.co/img/user/518/room_image/518-room_image-20230821180057-jzElYK.png',
    view_num: 45,
    current_view: 0,
    title: 's',
    schedule_time: '2023-08-21 18:00:00',
    schedule_time_ts: 1692612000,
    category_id: 15,
    streamer: {
      id: 518,
      nickname: '338 soccer fan',
      follower_count: 10,
      avatar:
        'https://static.zbstg.co/img/user/518/avatar/518-avatar-20230726165843-keHRJt.jpg',
      cover_image: '',
      stream_count: 6,
      bio: '',
      is_live: true,
      last_live_at: '2023-08-21 15:36:48',
      last_live_at_ts: 1692603408,
    },
  },
  {
    id: 55563,
    streamer_id: 473,
    match_id: 3003724499,
    status: 3,
    src: 'ECGQVvqt4MvI9TZWurpINt1WM2/772x9SwQTIs7Mrco9+37SLMG5eIkcR0OgQTRxmFilxog/z+FwthzypF6KXYm6CwpsKf0+3/nCeeFRHqfF/zuFNKD9qY49RtLikQEG1MBRgExfW89Xkfvg4YfIfwhwSeCLgbh+WYy4UkC3m8K+eZxtZq4ddGeInP/quZqHSAsRxPUDnBhu1wBmpjDUV6MHf9geC8ArJPgZ2vTJ8olo',
    ql_status: 0,
    room_url: 'https://xxxxxxxx.com/stream/473',
    room_id: 'stream:55563',
    room_image_type: 2,
    room_image_url: '',
    view_num: 36,
    current_view: 0,
    title: 'FIBA Basketball World Cup\tSouth Sudan\tSerbia',
    schedule_time: '2023-08-30 16:14:00',
    schedule_time_ts: 1693383240,
    category_id: 16,
    streamer: {
      id: 473,
      nickname: 'bug 20%',
      follower_count: 10,
      avatar:
        'https://static.zbstg.co/img/user/473/avatar/473-avatar-20230724111150-p7FinV.png',
      cover_image: '',
      stream_count: 53,
      bio: '𒐫𒐫Á́́́́́́́́́́́́́́́́́́́́́́́́́́́́𒐫𒐫Á́́́́́́́́́́́́́́́́́́́́́́́́́́́́𒐫𒐫Á́́́́́́́́́́́́́́́́́́́́́́́́́́́́𒐫𒐫Á́́́́́́́́́́́́́́́́́́́́́́́́́́́́𒐫𒐫Á́́́́́́́́́́́́́́́́́́́́́́́́́́́́𒐫𒐫Á́́́́́́́́́́́́́́́́́́́́́́́́́́́́𒐫',
      is_live: true,
      last_live_at: '2023-08-30 16:13:24',
      last_live_at_ts: 1693383204,
    },
  },
  {
    id: 55559,
    streamer_id: 322,
    status: 3,
    src: 'sLgGcbn1ceDvPz6oq4DNvDKYQWQf1m7ANuTDQAiRC5MZyMQlwdOBXbtFy/fRc8jvsu9QN2nYojLS1Idjffnjxf2XYcnhlhFT7WwY9Ojfb5VOUhuR+4OA0ZvPT07wMv4eFYLfpB3KariUZeoLFkH139kB4vJpAwptt9OmBV+5ef3O9a/f2LfQwVHna6Mtu/+Srw3Z',
    ql_status: 0,
    room_url: 'https://xxxxxxxx.com/stream/322',
    room_id: 'stream:55559',
    room_image_type: 2,
    room_image_url: '',
    view_num: 27,
    current_view: 0,
    title: 'test flv',
    schedule_time: '2023-08-25 11:08:00',
    schedule_time_ts: 1692932880,
    category_id: 6,
    streamer: {
      id: 322,
      nickname: 'leelee',
      follower_count: 6,
      avatar: '',
      cover_image:
        'https://static.zbstg.co/img/user/322/cover_image/322-cover_image-20230616092843-YsNu3g.jpg',
      stream_count: 189,
      bio: '',
      is_live: true,
      last_live_at: '2023-08-21 18:10:05',
      last_live_at_ts: 1692612605,
    },
  },
];
const sampleData = {
  code: 0,
  data: [
    ...arr,
    ...arr.map((a) => ({ ...a, id: `a${a.id}` })),
    ...arr.map((a) => ({ ...a, id: `b${a.id}` })),
    ...arr.map((a) => ({ ...a, id: `c${a.id}` })),
    ...arr.map((a) => ({ ...a, id: `d${a.id}` })),
    ...arr.map((a) => ({ ...a, id: `e${a.id}` })),
    ...arr.map((a) => ({ ...a, id: `f${a.id}` })),
    ...arr.map((a) => ({ ...a, id: `g${a.id}` })),
    ...arr.map((a) => ({ ...a, id: `h${a.id}` })),
  ],
  msg: '',
};
