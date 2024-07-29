import { IconArrowWhite, TeamIconIrrPlaceholder } from '@/asset/icons';
import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import { MarketTile } from '@/components/marketType/MarketContainer';
import { MatchStatus } from '@/components/matchStatus';
import { useBlazeSlider } from '@/hook/useBlazeSlider';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import './TayaSportSingleMatch.css';

const web = isWeb();

export default function TayaSportSingleMatch({ match, nsg }) {
  const [datas, setDatas] = useState({});
  const [score, setScore] = useState('');
  const { t } = useTranslation();
  const [, mm, dd, yy, hhmm] = new Date(match?.bt).toString().split(' ');

  const blazeSliderRef = useBlazeSlider({
    all: {
      slidesToShow: 1,
      loop: false,
    },
  });

  useEffect(() => {
    const hdpData = match?.mg?.filter(
      ({ mty }) => mty === 1000 || mty === 3002
    )?.[0];
    const ouData = match?.mg?.filter(
      ({ mty }) => mty === 1007 || mty === 3003
    )?.[0];
    const winnersData = match?.mg?.filter(
      ({ mty }) => mty === 1005 || mty === 3004
    )?.[0];
    const cornerOrOEData = match?.mg?.filter(
      ({ mty }) => mty === 1010 || mty === 3005
    )?.[0];
    const htWinnerData = match?.mg?.filter(
      ({ mty }) => mty === 1005 || mty === 3004
    )?.[1];
    const htHDPData = match?.mg?.filter(
      ({ mty }) => mty === 1000 || mty === 3002
    )?.[1];
    const htOUData = match?.mg?.filter(
      ({ mty }) => mty === 1007 || mty === 3003
    )?.[1];
    // moneyline 1st half
    const ml1HFData = match?.mg
      ?.filter(({ mty }) => mty === 3020)
      ?.filter(({ pe }) => pe === 3003)?.[0];

    let dataObj = {
      hdp: hdpData || {},
      ou: ouData || {},
      winner: winnersData || {}, // winner = 1x2
      cornerOrOe: cornerOrOEData || {},
      htWinner: htWinnerData || {}, // HT 1x2, HT ML
      htHDP: htHDPData || {}, // HT HDP
      htOU: htOUData || {}, // HT O/U
      ml1HF: ml1HFData || {}, // Moneyline 1st Half
    };

    setDatas(dataObj || {});
  }, [match]);

  useEffect(() => {
    const data = nsg?.filter(({ tyg }) => tyg === 5);
    setScore(data);
  }, [nsg]);

  // Get op
  const getOpDatas = useCallback(
    (type, idx) => {
      try {
        return datas[`${type}`]?.mks[0].op[idx];
      } catch (e) {
        return {};
      }
    },
    [datas]
  );

  return (
    <Link
      className='flex flex-col self-stretch flex-1 gap-2 mt-3 text-white'
      href={`/sports/Eastrich/${match.id}`}
    >
      {!web && (
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center'>
            <MatchStatus match={match} />
            <div className='py-[2px] px-1 rounded-sm text-xs font-medium'>
              {`${dd} ${mm} ${yy}, ${hhmm.slice(0, 5)}`}
            </div>
          </div>
          <div className={`flex flex-row ${web ? '' : 'text-xs'}`}>
            {t('bet')} ({match.tms}){' '}
            <Image alt='right' src={IconArrowWhite} className='-rotate-90' />
          </div>
        </div>
      )}

      <WEBOnly>
        <div
          className={`grid overflow-x-auto items-stretch flex-1 grid-flow-row grid-cols-[minmax(160px,244px)_repeat(6,minmax(142px,150px))_68px] gap-1 py-2 rounded-lg 2xl:grid-cols-[minmax(288px,1fr)_repeat(6,minmax(150px,1fr))_68px]`}
        >
          <div className={`flex flex-col gap-1 mr-3.5 flex-initial`}>
            <div className='flex flex-row items-center pb-4'>
              <MatchStatus match={match} />
              <div className='flex flex-none py-[2px] px-1 rounded-sm text-xs font-medium'>
                {`${dd} ${mm} ${yy}, ${hhmm.slice(0, 5)}`}
              </div>
            </div>
            <Team data={match?.ts?.[0]} score={score?.[0]?.sc?.[0]} />
            <Team data={match?.ts?.[1]} score={score?.[0]?.sc?.[1]} />
            {match?.sid === 1 && <div className='text-right'>{t('draw')}</div>}
          </div>

          {match?.sid === 1 && (
            // soccer
            <>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  1&times;2
                </p>
                <MarketTile
                  marketId={datas['winner']?.mks?.[0]?.id}
                  opData={getOpDatas('winner', 0)}
                  matchData={match}
                  odd={getOpDatas('winner', 0)?.bod}
                  ss={datas['winner']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['winner']?.mks?.[0]?.id}
                  opData={getOpDatas('winner', 2)}
                  matchData={match}
                  odd={getOpDatas('winner', 2)?.bod}
                  ss={datas['winner']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['winner']?.mks?.[0]?.id}
                  opData={getOpDatas('winner', 1)}
                  matchData={match}
                  odd={getOpDatas('winner', 1)?.bod}
                  ss={datas['winner']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('hdp')}
                </p>
                <MarketTile
                  marketId={datas['hdp']?.mks?.[0]?.id}
                  opData={getOpDatas('hdp', 0)}
                  matchData={match}
                  name={getOpDatas('hdp', 0)?.nm}
                  odd={getOpDatas('hdp', 0)?.bod}
                  ss={datas['hdp']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['hdp']?.mks?.[0]?.id}
                  opData={getOpDatas('hdp', 1)}
                  matchData={match}
                  name={getOpDatas('hdp', 1)?.nm}
                  odd={getOpDatas('hdp', 1)?.bod}
                  ss={datas['hdp']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('ou')}
                </p>
                <MarketTile
                  marketId={datas['ou']?.mks?.[0]?.id}
                  opData={getOpDatas('ou', 0)}
                  matchData={match}
                  name={getOpDatas('ou', 0)?.nm}
                  odd={getOpDatas('ou', 0)?.bod}
                  ss={datas['ou']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['ou']?.mks?.[0]?.id}
                  opData={getOpDatas('ou', 1)}
                  matchData={match}
                  name={getOpDatas('ou', 1)?.nm}
                  odd={getOpDatas('ou', 1)?.bod}
                  ss={datas['ou']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('ht')} 1&times;2
                </p>
                <MarketTile
                  marketId={datas['htWinner']?.mks?.[0]?.id}
                  opData={getOpDatas('htWinner', 0)}
                  matchData={match}
                  odd={getOpDatas('htWinner', 0)?.bod}
                  ss={datas['htWinner']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['htWinner']?.mks?.[0]?.id}
                  opData={getOpDatas('htWinner', 2)}
                  matchData={match}
                  odd={getOpDatas('htWinner', 2)?.bod}
                  ss={datas['htWinner']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['htWinner']?.mks?.[0]?.id}
                  opData={getOpDatas('htWinner', 1)}
                  matchData={match}
                  odd={getOpDatas('htWinner', 1)?.bod}
                  ss={datas['htWinner']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('htHdp')}
                </p>
                <MarketTile
                  marketId={datas['htHDP']?.mks?.[0]?.id}
                  opData={getOpDatas('htHDP', 0)}
                  matchData={match}
                  name={getOpDatas('htHDP', 0)?.nm}
                  odd={getOpDatas('htHDP', 0)?.bod}
                  ss={datas['htHDP']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['htHDP']?.mks?.[0]?.id}
                  opData={getOpDatas('htHDP', 1)}
                  matchData={match}
                  name={getOpDatas('htHDP', 1)?.nm}
                  odd={getOpDatas('htHDP', 1)?.bod}
                  ss={datas['htHDP']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('htOu')}
                </p>
                <MarketTile
                  marketId={datas['htOU']?.mks?.[0]?.id}
                  opData={getOpDatas('htOU', 0)}
                  matchData={match}
                  name={getOpDatas('htOU', 0)?.nm}
                  odd={getOpDatas('htOU', 0)?.bod}
                  ss={datas['htOU']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['htOU']?.mks?.[0]?.id}
                  opData={getOpDatas('htOU', 1)}
                  matchData={match}
                  name={getOpDatas('htOU', 1)?.nm}
                  odd={getOpDatas('htOU', 1)?.bod}
                  ss={datas['htOU']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className={`flex flex-row items-center pl-4 max-h-24`}>
                <div className='self-center text-sm'>({match.tms}) </div>
                <Image
                  alt='right'
                  src={IconArrowWhite}
                  className='-rotate-90'
                />
              </div>
            </>
          )}
          {match?.sid === 3 && (
            // basketball
            <>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('winners')}
                </p>
                <MarketTile
                  marketId={datas['winner']?.mks?.[0]?.id}
                  opData={getOpDatas('winner', 0)}
                  matchData={match}
                  name={getOpDatas('winner', 0)?.nm}
                  odd={getOpDatas('winner', 0)?.bod}
                  ss={datas['winner']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['winner']?.mks?.[0]?.id}
                  opData={getOpDatas('winner', 1)}
                  matchData={match}
                  name={getOpDatas('winner', 1)?.nm}
                  odd={getOpDatas('winner', 1)?.bod}
                  ss={datas['winner']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('hdp')}
                </p>
                <MarketTile
                  marketId={datas['hdp']?.mks?.[0]?.id}
                  opData={getOpDatas('hdp', 0)}
                  matchData={match}
                  name={getOpDatas('hdp', 0)?.nm}
                  odd={getOpDatas('hdp', 0)?.bod}
                  ss={datas['hdp']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['hdp']?.mks?.[0]?.id}
                  opData={getOpDatas('hdp', 1)}
                  matchData={match}
                  name={getOpDatas('hdp', 1)?.nm}
                  odd={getOpDatas('hdp', 1)?.bod}
                  ss={datas['hdp']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('ou')}
                </p>
                <MarketTile
                  marketId={datas['ou']?.mks?.[0]?.id}
                  opData={getOpDatas('ou', 0)}
                  matchData={match}
                  name={getOpDatas('ou', 0)?.nm}
                  odd={getOpDatas('ou', 0)?.bod}
                  ss={datas['ou']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['ou']?.mks?.[0]?.id}
                  opData={getOpDatas('ou', 1)}
                  matchData={match}
                  name={getOpDatas('ou', 1)?.nm}
                  odd={getOpDatas('ou', 1)?.bod}
                  ss={datas['ou']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('htMl')}
                </p>
                <MarketTile
                  marketId={datas['ml1HF']?.mks?.[0]?.id}
                  opData={getOpDatas('ml1HF', 0)}
                  matchData={match}
                  name={getOpDatas('ml1HF', 0)?.nm}
                  odd={getOpDatas('ml1HF', 0)?.bod}
                  ss={datas['ml1HF']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['ml1HF']?.mks?.[0]?.id}
                  opData={getOpDatas('ml1HF', 1)}
                  matchData={match}
                  name={getOpDatas('ml1HF', 1)?.nm}
                  odd={getOpDatas('ml1HF', 1)?.bod}
                  ss={datas['ml1HF']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('htHdp')}
                </p>
                <MarketTile
                  marketId={datas['htHDP']?.mks?.[0]?.id}
                  opData={getOpDatas('htHDP', 0)}
                  matchData={match}
                  name={getOpDatas('htHDP', 0)?.nm}
                  odd={getOpDatas('htHDP', 0)?.bod}
                  ss={datas['htHDP']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['htHDP']?.mks?.[0]?.id}
                  opData={getOpDatas('htHDP', 1)}
                  matchData={match}
                  name={getOpDatas('htHDP', 1)?.nm}
                  odd={getOpDatas('htHDP', 1)?.bod}
                  ss={datas['htHDP']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className='flex flex-col gap-1 flex-initial'>
                <p className='text-xs text-center text-[#6F7076] pb-5'>
                  {t('htOu')}
                </p>
                <MarketTile
                  marketId={datas['htOU']?.mks?.[0]?.id}
                  opData={getOpDatas('htOU', 0)}
                  matchData={match}
                  name={getOpDatas('htOU', 0)?.nm}
                  odd={getOpDatas('htOU', 0)?.bod}
                  ss={datas['htOU']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
                <MarketTile
                  marketId={datas['htOU']?.mks?.[0]?.id}
                  opData={getOpDatas('htOU', 1)}
                  matchData={match}
                  name={getOpDatas('htOU', 1)?.nm}
                  odd={getOpDatas('htOU', 1)?.bod}
                  ss={datas['htOU']?.mks?.[0]?.ss}
                  isSingle={true}
                  isWebSportsPage={true}
                />
              </div>
              <div className={`flex flex-row items-center pl-4 max-h-24`}>
                <div className='self-center text-sm'>({match.tms}) </div>
                <Image
                  alt='right'
                  src={IconArrowWhite}
                  className='-rotate-90'
                />
              </div>
            </>
          )}
        </div>
      </WEBOnly>

      <H5Only>
        <div className='flex'>
          <div className='col1 w-7/12 pb-[5px] pt-[14px] pr-1.5 flex flex-col justify-center'>
            <Team data={match?.ts?.[0]} score={score?.[0]?.sc?.[0]} />
            <Team data={match?.ts?.[1]} score={score?.[0]?.sc?.[1]} />
          </div>
          <div className='col2 w-5/12 relative'>
            <div className='blaze-slider' ref={blazeSliderRef}>
              <div className='blaze-container'>
                <div className='blaze-track-container'>
                  <div className='blaze-track'>
                    {(match?.sid === 1 || match?.sid === 3) && (
                      <>
                        <div className='flex gap-1'>
                          <div className='hdpcol basis-6/12 text-center'>
                            <TypeTitle title={t('hdp')} />
                            <MarketTile
                              marketId={datas['hdp']?.mks?.[0]?.id}
                              opData={getOpDatas('hdp', 0)}
                              matchData={match}
                              name={getOpDatas('hdp', 0)?.nm}
                              odd={getOpDatas('hdp', 0)?.bod}
                              ss={datas['hdp']?.mks?.[0]?.ss}
                              isSingle={true}
                            />
                            <div className='h-[0.25rem]' />
                            <MarketTile
                              marketId={datas['hdp']?.mks?.[0]?.id}
                              opData={getOpDatas('hdp', 1)}
                              matchData={match}
                              name={getOpDatas('hdp', 1)?.nm}
                              odd={getOpDatas('hdp', 1)?.bod}
                              ss={datas['hdp']?.mks?.[0]?.ss}
                              isSingle={true}
                            />
                          </div>

                          <div className='oucol basis-6/12 text-center'>
                            <TypeTitle title={t('ou')} />
                            <MarketTile
                              marketId={datas['ou']?.mks?.[0]?.id}
                              opData={getOpDatas('ou', 0)}
                              matchData={match}
                              name={getOpDatas('ou', 0)?.nm}
                              odd={getOpDatas('ou', 0)?.bod}
                              ss={datas['ou']?.mks?.[0]?.ss}
                              isSingle={true}
                            />
                            <div className='h-[0.25rem]' />
                            <MarketTile
                              marketId={datas['ou']?.mks?.[0]?.id}
                              opData={getOpDatas('ou', 1)}
                              matchData={match}
                              name={getOpDatas('ou', 1)?.nm}
                              odd={getOpDatas('ou', 1)?.bod}
                              ss={datas['ou']?.mks?.[0]?.ss}
                              isSingle={true}
                            />
                          </div>
                        </div>

                        <div className='flex gap-1'>
                          <div className='winnercol basis-6/12 text-center'>
                            <TypeTitle title={t('winners')} />
                            <MarketTile
                              marketId={datas['winner']?.mks?.[0]?.id}
                              opData={getOpDatas('winner', 0)}
                              matchData={match}
                              name={getOpDatas('winner', 0)?.nm}
                              odd={getOpDatas('winner', 0)?.bod}
                              ss={datas['winner']?.mks?.[0]?.ss}
                              isSingle={true}
                            />
                            <div className='h-[0.25rem]' />
                            <MarketTile
                              marketId={datas['winner']?.mks?.[0]?.id}
                              opData={
                                match?.sid === 3
                                  ? getOpDatas('winner', 1)
                                  : getOpDatas('winner', 2)
                              }
                              matchData={match}
                              name={
                                match?.sid === 3
                                  ? getOpDatas('winner', 1)?.nm
                                  : getOpDatas('winner', 2)?.nm
                              }
                              odd={
                                match?.sid === 3
                                  ? getOpDatas('winner', 1)?.bod
                                  : getOpDatas('winner', 2)?.bod
                              }
                              ss={datas['winner']?.mks?.[0]?.ss}
                              isSingle={true}
                            />
                          </div>

                          <div className='cornercol basis-6/12 text-center'>
                            <TypeTitle
                              title={
                                match?.sid === 3 ? t('oddEven') : t('corner')
                              }
                            />
                            <MarketTile
                              marketId={datas['cornerOrOe']?.mks?.[0]?.id}
                              opData={getOpDatas('cornerOrOe', 0)}
                              matchData={match}
                              name={getOpDatas('cornerOrOe', 0)?.nm}
                              odd={getOpDatas('cornerOrOe', 0)?.bod}
                              ss={datas['cornerOrOe']?.mks?.[0]?.ss}
                              isSingle={true}
                            />
                            <div className='h-[0.25rem]' />
                            <MarketTile
                              marketId={datas['cornerOrOe']?.mks?.[0]?.id}
                              opData={getOpDatas('cornerOrOe', 1)}
                              matchData={match}
                              name={getOpDatas('cornerOrOe', 1)?.nm}
                              odd={getOpDatas('cornerOrOe', 1)?.bod}
                              ss={datas['cornerOrOe']?.mks?.[0]?.ss}
                              isSingle={true}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className='blaze-pagination' />
              </div>
            </div>
          </div>
        </div>
      </H5Only>
    </Link>
  );
}

const Team = ({ data = {}, score }) => {
  return (
    <div
      className={`flex flex-1 items-center justify-between gap-2 ${
        web ? 'min-h-[30px] flex-initial' : ''
      }`}
    >
      <Image
        alt='teamIcon'
        src={data?.lurl || TeamIconIrrPlaceholder}
        width={20}
        height={20}
        className='flex-initial'
      />
      <div
        className={`flex-1 ${
          web ? 'text-sm' : 'text-[13px]'
        } font-medium truncate `}
      >
        {data?.na}
      </div>
      <div className='flex-initial'>{score || 0}</div>
    </div>
  );
};

const TypeTitle = ({ title }) => {
  return <div className='text-[0.6rem] text-[#96979B]'>{title}</div>;
};

const ampleMatch = {
  nsg: [
    {
      pe: 1000,
      tyg: 5,
      sc: [1, 0],
    },
    {
      pe: 1000,
      tyg: 7,
      sc: [0, 0],
    },
    {
      pe: 1000,
      tyg: 8,
      sc: [0, 0],
    },
    {
      pe: 1000,
      tyg: 6,
      sc: [1, 3],
    },
    {
      pe: 1001,
      tyg: 5,
      sc: [1, 0],
    },
    {
      pe: 1001,
      tyg: 6,
      sc: [1, 3],
    },
    {
      pe: 1002,
      tyg: 5,
      sc: [1, 0],
    },
    {
      pe: 1002,
      tyg: 6,
      sc: [1, 3],
    },
    {
      pe: 1007,
      tyg: 5,
      sc: [1, 0],
    },
    {
      pe: 1008,
      tyg: 5,
      sc: [0, 0],
    },
    {
      pe: 1009,
      tyg: 5,
      sc: [0, 0],
    },
  ],
  mg: [
    {
      mty: 1000,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'Deportes Quindio',
              nm: '-0/0.5',
              ty: 1,
              od: 1.86,
              li: '-0/0.5',
            },
            {
              na: 'CD Real Santander',
              nm: '+0/0.5',
              ty: 2,
              od: 1.96,
              li: '+0/0.5',
            },
          ],
          id: 66378253,
          ss: 1,
          au: 1,
          mbl: 1,
          li: '-0.25',
        },
        {
          op: [
            {
              na: 'Deportes Quindio',
              nm: '-0.5',
              ty: 1,
              od: 2.25,
              li: '-0.5',
            },
            {
              na: 'CD Real Santander',
              nm: '+0.5',
              ty: 2,
              od: 1.62,
              li: '+0.5',
            },
          ],
          id: 66378233,
          ss: 1,
          au: 1,
          mbl: 2,
          li: '-0.5',
        },
      ],
      tps: ['p', 'h'],
      nm: 'Handicap',
    },
    {
      mty: 1007,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'Over',
              nm: 'o 2/2.5',
              ty: 4,
              od: 2.04,
              li: '2/2.5',
            },
            {
              na: 'Under',
              nm: 'u 2/2.5',
              ty: 5,
              od: 1.76,
              li: '2/2.5',
            },
          ],
          id: 65800866,
          ss: 1,
          au: 1,
          mbl: 1,
          li: '2.25',
        },
        {
          op: [
            {
              na: 'Over',
              nm: 'o 2',
              ty: 4,
              od: 1.63,
              li: '2',
            },
            {
              na: 'Under',
              nm: 'u 2',
              ty: 5,
              od: 2.2,
              li: '2',
            },
          ],
          id: 66377432,
          ss: 1,
          au: 1,
          mbl: 2,
          li: '2',
        },
      ],
      tps: ['p', 'h'],
      nm: 'Over/Under',
    },
    {
      mty: 1005,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'Deportes Quindio',
              nm: 'Home',
              ty: 1,
              od: 1.2,
            },
            {
              na: 'Draw',
              nm: 'Draw',
              ty: 3,
              od: 4.94,
            },
            {
              na: 'CD Real Santander',
              nm: 'Away',
              ty: 2,
              od: 12.3,
            },
          ],
          id: 65446862,
          ss: 1,
          au: 1,
        },
      ],
      tps: ['p'],
      nm: '1x2',
    },
    {
      mty: 1012,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'Deportes Quindio/Draw',
              nm: 'Home/Draw',
              ty: 50,
              od: 1.01,
            },
            {
              na: 'CD Real Santander/Draw',
              nm: 'Away/Draw',
              ty: 52,
              od: 4.68,
            },
            {
              na: 'Deportes Quindio/CD Real Santander',
              nm: 'Home/Away',
              ty: 51,
              od: 1.11,
            },
          ],
          id: 65446883,
          ss: 0,
          au: 1,
        },
      ],
      tps: ['p'],
      nm: 'Double Chance',
    },
  ],
  tms: 23,
  tps: ['h'],
  lg: {
    na: 'Colombia Primera B',
    id: 11098,
    or: 5121,
    lurl: 'https://static.fastbs55.com/data/89ed7b24974da44d83e2996f8d0f342f.png',
    sid: 1,
    rid: 184,
    rnm: 'Colombia',
    hot: false,
    slid: 110980000,
  },
  ts: [
    {
      na: 'Deportes Quindio',
      id: 59107,
      lurl: 'https://static.fastbs55.com/data/57a1aec9a806976f68272e566418fd5d.png',
    },
    {
      na: 'CD Real Santander',
      id: 59144,
      lurl: 'https://static.fastbs55.com/data/fcf67ac26176a2eed2ff3636588f9716.png',
    },
  ],
  mc: {
    s: 2700,
    pe: 1003,
    r: false,
    tp: 1,
  },
  id: 1577441,
  bt: 1692752400000,
  ms: 5,
  fid: 2,
  fmt: 100001,
  ne: 0,
  vs: {
    have: true,
  },
  as: ['https://animation.fb6pro.com/animation/index.html?matchId=42607805'],
  sid: 1,
  smt: 0,
  ty: 2,
  nm: 'Deportes Quindio vs. CD Real Santander',
  sb: {},
};
