import { useCurrentMatchDetail } from '@/hook/useCurrentMatchDetail';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { FBAnimation, FBVideo, TeamIconIrrPlaceholder } from '@/asset/icons';
import { useDispatch } from 'react-redux';
import { setAnimationUrl } from '@/store/sportsTaya';
import { useEffect, useState } from 'react';

const sampleMatch = {
  nsg: [
    { pe: 1000, tyg: 5, sc: [2, 0] },
    { pe: 1000, tyg: 7, sc: [4, 3] },
    { pe: 1000, tyg: 8, sc: [3, 3] },
    { pe: 1001, tyg: 5, sc: [2, 0] },
    { pe: 1001, tyg: 7, sc: [4, 3] },
    { pe: 1001, tyg: 8, sc: [3, 3] },
    { pe: 1002, tyg: 5, sc: [2, 0] },
    { pe: 1002, tyg: 7, sc: [4, 3] },
    { pe: 1002, tyg: 8, sc: [3, 3] },
    { pe: 1009, tyg: 5, sc: [2, 0] },
  ],
  mg: [],
  tms: 19,
  tps: [],
  lg: {
    na: 'Belarus Premier League',
    id: 11305,
    or: 150,
    lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/798a038cc27de8b29c61e5c9e0cf00f.png',
    sid: 1,
    rid: 28,
    rnm: 'Belarus',
    hot: true,
    slid: 113050000,
  },
  ts: [
    {
      na: 'Torpedo Belaz Zhodino',
      id: 55314,
      lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/431ef72d58ec595f9fc8f5a995eea172.png',
    },
    {
      na: 'FC Dinamo Minsk',
      id: 55256,
      lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/1a010961e2ebb700e43ffdd0f795f239.png',
    },
  ],
  mc: { s: 2363, pe: 1002, r: false, tp: 1 },
  id: 850839,
  bt: 1688657400000,
  ms: 5,
  fid: 2,
  fmt: 100001,
  ne: 0,
  vs: {
    flvSD:
      'https://fv2.04lv.com/live/L18285400.flv?definition=SD&txSecret=253ead9fd7bb0d3b8319f9bd52a46273&txTime=64CB644E',
    m3u8SD:
      'https://hs2.04lv.com/live/L18285400.m3u8?definition=SD&txSecret=8e9513fd229c72ed21aca5bc5210ba9e&txTime=64CB644E',
    web: 'https://video.fb9pro.com/live/index.html',
    have: true,
  },
  as: ['https://animation.fb6pro.com/animation/index.html?matchId=39576231'],
  sid: 1,
  smt: 0,
  ty: 2,
  nm: 'Torpedo Belaz Zhodino vs. FC Dinamo Minsk',
  sb: {},
};

const TeamRow = ({ data, score }) => {
  const { na, id, lurl } = data;
  // const score = '';
  return (
    <div className='flex flex-row items-center justify-between gap-2 mt-2'>
      <Image
        alt='teamicon'
        width={26}
        height={26}
        className='flex-initial w-7 h-7 object-contain'
        src={lurl ? lurl : TeamIconIrrPlaceholder}
      />
      <div
        className={`flex-initial text-white ${
          isWeb() ? 'text-base' : 'text-sm'
        } font-medium leading-5`}
      >
        {na}
      </div>
      <div className='flex-1'></div>
      <div className='flex-initial text-white text-base font-medium leading-5'>
        {score}
      </div>
    </div>
  );
};
export const MatchInfo = ({ leagueTw = '', withVideoIcon }) => {
  const { data } = useCurrentMatchDetail();
  const dispatch = useDispatch();

  const {
    bt = 0,
    lg: { na: leagueName },
    ts = [],
  } = Array.isArray(data) ? { lg: { na: '' } } : data;
  const [, mm, dd, , hhmm] = new Date(bt).toString().split(' ');
  // todo show time after starting or fav before start
  if (bt === 0) {
    return null;
  }
  const showAnimation = (e) => {
    dispatch(
      setAnimationUrl({ url: `${data.as[0]}&language=en`, title: data.nm })
    );
    e?.preventDefault();
    e.stopPropagation();
  };

  if (data?.ms === 0) return;
  return (
    <div className='flex flex-initial flex-col items-stretch px-5 mb-2'>
      <div className='flex flex-row items-center'>
        <div
          className={`${
            isWeb() ? 'mb-4 text-[15px]' : 'text-xs'
          } text-[#96979B] text-base font-medium leading-3  ${leagueTw}`}
        >
          {dd} {mm} {hhmm.slice(0, 5)}, {leagueName}
        </div>
        {withVideoIcon
          ? data.as && (
              <Image
                alt='live'
                src={FBAnimation}
                className='w-7 h-7 mb-4 mx-1 cursor-pointer'
                onClick={(e) => showAnimation(e)}
              />
            )
          : null}
        {/* <Image alt='live' src={} className='w-5 h-5 mb-4 mr-2' /> */}
      </div>
      <TeamRow
        data={ts[0] || {}}
        score={data?.nsg?.filter(({ tyg }) => tyg === 5)?.[0]?.sc?.[0]}
      />
      <TeamRow
        data={ts[1] || {}}
        score={data?.nsg?.filter(({ tyg }) => tyg === 5)?.[0]?.sc?.[1]}
      />
    </div>
  );
};
