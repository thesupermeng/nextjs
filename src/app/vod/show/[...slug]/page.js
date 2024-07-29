import { FilmLibrary } from './filmLibrary';

export async function generateMetadata({ params }) {
  const { id } = generateFilterParams(params.slug);
  let title = '';
  let category = ''


  category = getClassFromArray(params.slug);
  switch (id) {
    case 1:
      title = '电视剧';
      break;
    case 2:
      title = '电影';
      break;
    case 3:
      title = '综艺';
      break;
    case 4:
      title = '动漫';
      break;
    case 5:
      title = '纪录片';
      break;
    case 46:
      title = '短剧';
      break;
  }



  return {
    title: `${category}${title} - 影视TV-海量高清视频免费在线观看`,
    description: '全球华人在线视频媒体平台,免费点播,免费提供最新高清的电影,电视剧,综艺,动漫,台劇,日劇,泰劇,韩剧,美剧等。',
  }
}

export default function Page() {

  return <FilmLibrary />
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

function getClassFromArray(arr) {
  // Check if 'class' is present in the array
  const classIndex = arr.indexOf('class');
  
  // If 'class' is found and there is a following part, return it
  if (classIndex !== -1 && arr[classIndex + 1]) {
    return decodeURIComponent(arr[classIndex + 1])+'-';
  }
  
  // If 'class' is not found, return an empty string
  return '';
}



