'use client';
import useSWR from 'swr';
import {URL_YINGSHI_VOD} from '@/config/yingshiUrl';
import fetcher from '@/util/fetcher';
import useSWRInfinite from 'swr/infinite';

export function useFilterTypeList() {
  const { data } = useSWR(URL_YINGSHI_VOD.filteringTypeList, url => fetcher(url, {}, { method: 'GET' }), { revalidateOnFocus: false});
  return data;
}

export function useSearchingListApi(params) {
  let defaultParams;
  let inputParams;

  if (params) {
    defaultParams = {
      order: 'desc',
      limit: 30,
      tid: params.typeId,
      by: params.by
    };

    inputParams = defaultParams;
    if (params.class != '全部类型') {
      inputParams = {
        ...inputParams,
        class: params?.class,
      };
    }

    if (params.area != '全部地区') {
      inputParams = {
        ...inputParams,
        area: params.area,
      };
    }

    if (params?.lang != '全部语言') {
      inputParams = {
        ...inputParams,
        lang: params.lang,
      };
    }

    if (params?.year != '全部时间') {
      inputParams = {
        ...inputParams,
        year: params.year,
      };
    }
  }

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.List.length) return null;

    if(params && params?.typeId == 46)
    {
      // 短剧拓展 API 【黑木耳、量子、华为吧】
      return inputParams ? generateKey(URL_YINGSHI_VOD.searchingList2, {...inputParams, page: pageIndex + 1}) : null;
    }
    return inputParams ? generateKey(URL_YINGSHI_VOD.searchingList, {...inputParams, page: pageIndex + 1}) : null;
  };

  return useSWRInfinite(getKey, url => fetcher(url, {}, { method: 'GET' }), { revalidateFirstPage: false });
}

export function generateKey(url, body) {
  let getParams = '';
  const objectToGetParams = (paramsObject) => {
    const searchParams = new URLSearchParams();
    for (const key in paramsObject) {
      // eslint-disable-next-line no-prototype-builtins
      if (paramsObject.hasOwnProperty(key)) {
        searchParams.append(key, paramsObject[key]);
      }
    }
    return searchParams.toString();
  };

  getParams = objectToGetParams(body);
  if (body.class) {
    getParams = getParams.replace(encodeURIComponent(body.class), decodeURIComponent(body.class));
  }

  if (getParams !== '') {
    url += '?' + getParams;
  }

  return url;
}

