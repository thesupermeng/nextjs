import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import {URL_YINGSHI_VOD} from '@/config/yingshiUrl';
import {YingshiApi} from '@/util/YingshiApi';
import {useEffect, useState} from 'react';

export const VodPopularList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {
    setLoading(true);
    fetchTopicDetail().then((result) => {
      setTopic(result);
      setLoading(false);
    });
  }

  const fetchTopicDetail = async () => {
    return YingshiApi(URL_YINGSHI_VOD.topTenList + '?id=1', {}, { method: 'GET' });
  }

  return <div className="p-4 space-y-4">
    <span className="text-lg">热搜总榜</span>

    {topic?.map((vod, index) => (
      <Link
        href={`/vod/play/id/${vod.vod_id}/sid/${vod.type_id}/nid/1`}
        key={`key-vodTopic-${index}`}
        className="flex flex-row space-x-4 items-center cursor-pointer hover-effect"
      >
        <span className={index === 0
          ? 'text-hot-1'
          : index === 1
            ? 'text-hot-2'
            : index === 2
              ? 'text-hot-3'
              : 'text-hot-4'
        }>{index + 1}</span>
        <span className="text-sm flex-1">{vod.vod_name}</span>
        <span className="text-xs text-white/75">{vod.type_name}</span>
      </Link>
    ))}
  </div>
}