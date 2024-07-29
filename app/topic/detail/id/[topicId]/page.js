import TopicDetails from '@/app/topic/detail/id/[topicId]/topicDetails';
import {YingshiApi} from '@/util/YingshiApi';
import {URL_YINGSHI_VOD} from '@/config/yingshiUrl';

export async function generateMetadata({ params }) {
  const getTopicDetailsApi = async () => {
    return YingshiApi(
      URL_YINGSHI_VOD.playlistGetTopicDetail + '?id=' + params.topicId,
      {},
      { method: 'GET' }
    );
  };
  const topic = await getTopicDetailsApi();

  if (topic) {
    return {
      title: `${topic.topic_name}专题详情 - 影视TV-海量高清视频免费在线观看`,
      description: `本站提供${topic.topic_name},最新最全精品专题数据`
    };
  }
}

export default function Page() {

  return (
    <TopicDetails />
  );
}