import React, { useEffect, useLayoutEffect, useState } from 'react';
import initAds from './initAds';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import { usePathname } from 'next/navigation';

const SingletonAdsBanner = ({ useMargin2 = false, verticalAds = false }) => {
  const { isVip, userInfo } = useYingshiUser();
  const pathName = usePathname();

  const [ads, setAds] = useState(null);

  const allSameProperty = (arr, prop) =>
    arr.every((item) => item[prop] === arr[0][prop]);

  const findAdBySlotId = (ads, slotId) => {
    if (!ads) {
      return;
    }

    let result = ads.filter(
      (ad) => ad.slot_id_list_array && ad.slot_id_list_array.includes(slotId)
    );
    result = result.sort((a, b) => b.ads_sort - a.ads_sort);

    const sameSortFlag = allSameProperty(result, 'ads_sort');

    if (result.length > 0 && sameSortFlag) {
      const randomIndex = Math.floor(Math.random() * result.length);

      return result[randomIndex];
    } else {
      return result[0];
    }
  };

  useLayoutEffect(() => {
    const fetchAds = async () => {
      const adsData = await initAds();
      let navId = '1-13';
      //home
      if (pathName == '/') {
        navId = '1-13';
      } else {
        //home categories
        if (pathName.startsWith('/index/type')) {
          let getIndex = pathName.lastIndexOf('/');
          let pathFlag = pathName.slice(getIndex + 1, pathName.length)
          // console.log(pathName,pathFlag);
          //综合
          if (
            pathFlag == '1' ||
            pathFlag == '2' ||
            pathFlag == '3' ||
            pathFlag == '4' ||
            pathFlag == '5'
          ) {
            navId = '4-16';
          }
          //韩剧
          else if (pathFlag == '6') {
            navId = '9-17';
          }
          //美剧
          else if (pathFlag == '7') {
            navId = '10-18';
          } else if (pathFlag == '99') {
            // navId = '1-13';
            navId = '23-24';
          } else {
            navId = '1-13';
          }
        } else if (pathName.startsWith('/topic')) {
          navId = '11-14';
        } else if (pathName.startsWith('/vod/show')) {
          navId = '12-15';
        } else if ('/vod/play') {
          // console.log(verticalAds)
          if (verticalAds) {
            navId = '3-20';
            // navId = '1-13';
          } else {
            navId = '2-19';
          }
        } else {
          navId = '1-13';
        }
      }

      const parts = navId.split('-').map(Number);

      const filteredAdsList = [];

      parts.forEach((item, index) => {
        let result = findAdBySlotId(adsData, item);
        filteredAdsList.push(result);
      });

      // console.log(adsData);

      // console.log(filteredAdsList);
      setAds(filteredAdsList);
    };

    fetchAds();
  }, []);

  return (
    <>
      {ads && !isVip ? (
        <div
          className={
            ads[0] !== undefined && ads[1] !== undefined
              ? useMargin2
                ? 'margin-banner margin-banner2'
                : 'margin-banner'
              : null
          }
          style={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <img
            className='desktop'
            src={ads[0]?.ads_pic}
            onClick={() => {
              window.open(ads[0].ads_url, '_blank');
            }}
          />
          <img
            className='mobile'
            src={ads[1]?.ads_pic}
            onClick={() => {
              window.open(ads[1].ads_url, '_blank');
            }}
          />
        </div>
      ) : (
        <div className='rounded-xl'></div>
      )}
    </>
  );
};

export default SingletonAdsBanner;
