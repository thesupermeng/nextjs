import { YingshiApi2 } from '@/util/YingshiApi';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';

let functionCalled = false;

const getAllAds = async () => {
  // console.log('hello there')
  return YingshiApi2(URL_YINGSHI_VOD.getAllAds, {}, { method: 'GET' });
};

const initAds = async () => {
  if (!sessionStorage.getItem('adsList') && !functionCalled) {
    functionCalled = true;
    // console.log('Calling API to get ads');
    const allAds = await getAllAds();
    // console.log('data', allAds)
    sessionStorage.setItem('adsList', JSON.stringify(allAds.data));
    return allAds.data;
  } else {
    // console.log('Ads already in sessionStorage or function has already been called');
    return JSON.parse(sessionStorage.getItem('adsList'));
  }
};

export default initAds;
