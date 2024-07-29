import { PlayVod } from './playVod';
import { YingshiApi } from '@/util/YingshiApi';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import { redirect } from 'next/navigation';
import { PlayXVod } from '@/app/vod/play/[...slug]/playXVod';
import { decodeVSN } from '@/util/vsn';

export async function generateMetadata({ params }) {
  const { vodId, tId, nId, vsn } = generateFilterParams(params.slug);

  const vod =
    nId != 9999 ? await getVod(vodId, tId, vsn) : await getXVod(vodId, tId);

  if (nId == 9999) {
    if (vod && vod.List) {
      const title = `${vod.List[0]?.vod_name}在线观看 - 影视TV-海量高清视频免费在线观看`;
      const blurb = vod.List[0]?.vod_blurb;
      let keywordsArray = blurb.split(' '); // Split the blurb into an array of words using space as the delimiter

      if (keywordsArray?.length > 10) {
        keywordsArray = keywordsArray.slice(0, 10);
      }
      return {
        title: title,
        description: blurb,
        keywords: keywordsArray,
      };
    }
  } else {
    if (vod && vod) {
      let title = `${vod.vod_name}在线观看 - 影视TV-海量高清视频免费在线观看`;

      if(tId.toString() =='1')
      {
        title = `${vod.vod_name} 第${nId}集 在线观看 - 影视TV-海量高清视频免费在线观看`;
      }

      const blurb = vod.vod_content;
      let keywordsArray =[] 
      if(blurb)
      {
        keywordsArray = blurb.split(' '); // Split the blurb into an array of words using space as the delimiter
      }
    
      if (keywordsArray.length > 10) {
        keywordsArray = keywordsArray.slice(0, 10);
      }
      return {
        title: title,
        description: blurb,
        keywords: keywordsArray,
      };
    }
  }
}

export default function Page({ params }) {
  const path = params.slug;
  const { vodId, tId, nId, sourceId, vsn } = generateFilterParams(path);

  return nId !== 9999 ? (
    <PlayVod vodId={vodId} tId={tId} nId={nId} sourceId={sourceId} vsn={vsn} />
  ) : (
    <PlayXVod vodId={vodId} tId={tId} nId={nId} />
  );
}

function generateFilterParams(path) {


  const filterParams = {};
  for (let i = 0; i < path.length; i += 2) {
    filterParams[path[i]] = path[i + 1];
  }

  if (
    !filterParams.id ||
    !filterParams.sid ||
    !filterParams.nid
  ) {
    redirect('/404');
  }

  return {
    vodId: filterParams.id,
    tId: filterParams.sid,
    nId: parseInt(filterParams.nid),
    sourceId: parseInt(filterParams.source),
    vsn: filterParams.vsn,
  };
}

async function getVod(vodId, tId, vsn) {
  const params = {
    id: vodId,
    ...(tId !== 0 && { tid: tId }),
    ...(vsn !== undefined && { vod_source_name: decodeVSN(vsn) }),
  };

  return await YingshiApi(URL_YINGSHI_VOD.getVodDetails, params, {
    method: 'GET',
  });
  // if (tId == 0) {
  //   return YingshiApi(
  //     URL_YINGSHI_VOD.getVodDetails,
  //     {
  //       id: vodId,
  //     },
  //     {
  //       method: 'GET',
  //     }
  //   );
  // } else {
  //   return YingshiApi(
  //     URL_YINGSHI_VOD.getVodDetails,
  //     {
  //       id: vodId,
  //       tid: tId,
  //     },
  //     {
  //       method: 'GET',
  //     }
  //   );
  // }
}

async function getXVod(vodId, tId) {
  if (tId == 0) {
    return YingshiApi(
      URL_YINGSHI_VOD.getXVodDetails,
      {
        id: vodId,
        xMode: true,
      },
      {
        method: 'GET',
      }
    );
  } else {
    return YingshiApi(
      URL_YINGSHI_VOD.getXVodDetails,
      {
        id: vodId,
        tid: tId,
        xMode: true,
      },
      {
        method: 'GET',
      }
    );
  }
}
