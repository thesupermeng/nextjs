import React from 'react';
import {redirect} from 'next/navigation';
import Home from '@/app/page';


export async function generateMetadata({ params }) {
  console.log(params)
  let  id  = params.id;
  
  let title = '';

  switch (id) {
    case '1':
      title = '电视剧';
      break;
    case '2':
      title = '电影';
      break;
    case '3':
      title = '综艺';
      break;
    case '4':
      title = '动漫';
      break;
    case '5':
      title = '纪录片';
      break;
      case '6':
        title = '韩剧';
      break;
      case '7':
      title = '欧美剧';
      break;
      case '99':
      title = '午夜场';
      break;
    case '46':
      title = '短剧';
      break;
  }

  return {
    title: `推荐${title} - 影视TV-海量高清视频免费在线观看`,
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

export function generateStaticParams() {
  return [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: '7'},
    {id: '99'}
  ]
}

export default function Page({ params }) {
  const id = params.id;
  const headerId = [1, 2, 3, 4, 5, 6, 7, 99];
  const isInteger = (str) => {
    return /^\d+$/.test(str);
  };

  if (isInteger(id)) {
    const intId = parseInt(id);
    if (intId === 0) {
      redirect('/');
    } else if (intId === 998) {
      redirect('/topic/index/page');
    } else if (intId === 999) {
      redirect('/vod/show/by/time/id/1')
    } else if (headerId.includes(intId)) {
      // No routing needed, return to render Home component below
      return <Home category={parseInt(id)} />;
    } else {
      redirect('/404');
    }
  } else {
    redirect('/404');
  }
}


function generateFilterParams(path) {
  const filterParams = {}
  for (let i = 0; i < path.length; i+=2) {
    filterParams[path[i]] = path[i+1];
  }

  return {
    id: parseInt(filterParams.id)
  }
}