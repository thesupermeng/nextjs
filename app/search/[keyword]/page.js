import { isWeb } from '@/util/common';
import React from 'react';
import WebPage from './WebPage';
import H5Page from './H5Page';


export async function generateMetadata({ params }) {

  let  keyword  = params.keyword;
  keyword = decodeURIComponent(keyword);
  
  return {
    title: `${keyword} - 影视TV-海量高清视频免费在线观看`,
    description: '全球华人在线视频媒体平台,免费点播,免费提供最新高清的电影,电视剧,综艺,动漫,台劇,日劇,泰劇,韩剧,美剧等。',
    keywords : [
      '在线影院',
      '在线观看',
      '在线看电影',
      '海外影院',
      '免费电影',
      '免费电视剧',
      '韩剧',
      '美剧',
      '影视TV'
    ]
  }
}


export default function Page() {



  
  // return isWeb() ? <WebPage /> : <H5Page />;
  return <H5Page />;
}
