'use client';
import Gallery from '@/components/gallery';
import { StreamerInfo } from '@/components/streamer/StreamerInfo';
import { URL_USER } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function Page({ params }) {
  const [selected, setSelected] = useState(0);
  const [streamerData, setStreamerData] = useState({});
  const { t } = useTranslation();

  const getStreamerData = async () => {
    return UserApi(
      URL_USER.getSteamer,
      { id: params?.streamer_id, recommend_count: 10 },
      { method: 'GET' }
    );
  };

  useEffect(() => {
    getStreamerData().then((data) => {
      setStreamerData(data?.data);
    });
  }, [params?.streamer_id]);

  const tabs = [
    {
      label: t('photos'),
    },
    {
      label: t('videos'),
    },
  ];

  return (
    <>
      <div className='bg-[#09090990] py-5'>
        <StreamerInfo streamer={streamerData} />
      </div>

      <div className='flex gap-10 px-10 py-5'>
        {tabs?.map((t, index) => {
          return (
            <div
              key={index}
              className={`flex-col text-[15px] text-[#FFFFFF80] group cursor-pointer ${
                selected === index && 'text-[#ffffff] flex font-bold'
              }`}
              onClick={() => setSelected(index)}
            >
              {t.label}
              <div
                className={`h-1 rounded-lg bg-[#DE173D] mt-1 w-5  group-hover:visible ${
                  selected === index ? 'visible' : 'invisible'
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      <Gallery data={streamerData?.gallery} selected={selected} />
    </>
  );
}
