import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import Image from 'next/image';
import { ArrowDownFillIcon } from '@/asset/icons';

import styles from './style.module.css';
import { useTranslation } from 'react-i18next';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { ArrowRightIcon } from '@/asset/icons';

export const VodEpisodeList = ({
  episodeGroups,
  episodeGroup,
  vodSource,
  episodeSource,
  onSelectEpisodeGroup,
  onSelectEpisode,
  style,
}) => {
  const selectedEpisodeGroupRef = useRef(null);
  const selectedEpisodeRef1 = useRef(null);
  const selectedEpisodeRef2 = useRef(null);
  const episodeContainerRef = useRef(null);
  const [selectedEpisodeGroupDivWidth, setSelectedEpisodeGroupDivWidth] =
    useState(0);
  const [episodeContainerHeight, setEpisodeContainerHeight] = useState(0);

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const onEpisodeGroupDropBtnPress = () => {
    setShowDropdown(!showDropdown);
  };

  const onEpisodeGroupPress = (group) => {
    onSelectEpisodeGroup(group);
    setShowDropdown(false);
  };

  // if (episodeGroup == undefined || episodeSource == undefined) {
  //   onSelectEpisodeGroup(episodeGroups[episodeGroups.length - 1]);
  //   onSelectEpisode(vodSource.vod_play_list.urls[
  //     vodSource.vod_play_list.url_count - 1
  //   ]);
  // }

  useLayoutEffect(() => {
    try{
      if (episodeGroup == undefined || episodeSource == undefined) {
        onSelectEpisodeGroup(episodeGroups[episodeGroups.length - 1]);
        onSelectEpisode(
          vodSource.vod_play_list.urls[vodSource.vod_play_list.url_count - 1]
        );
      }
    }catch(e)
    {
      console.log('xvod c')
    }
   

  }, [episodeGroups, episodeGroup, vodSource, episodeSource]);

  useEffect(() => {
    if (selectedEpisodeGroupRef.current) {
      setSelectedEpisodeGroupDivWidth(
        selectedEpisodeGroupRef.current.offsetWidth
      );
    }

    if (episodeContainerRef.current) {
      console.log(episodeContainerRef.current.offsetHeight);
      setEpisodeContainerHeight(episodeContainerRef.current.offsetHeight);
    }
  }, [open]);

  useEffect(() => {
    scrollEpisode();
  }, []);

  const scrollEpisode = () => {
    if (selectedEpisodeRef1.current) {
      selectedEpisodeRef1.current.scrollIntoView({
        // behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }

    if (selectedEpisodeRef2.current) {
      selectedEpisodeRef2.current.scrollIntoView({
        // behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  const selectEpisode = (episode) => {
    setOpen(false);
    onSelectEpisode(episode);
  };

  return (
    <>
      {episodeGroup != undefined && episodeSource != undefined && (
        <div className='flex flex-col space-y-4 pl-4' style={style}>
          {/* PC */}
          <div className='lg:flex hidden relative'>
            <div
              ref={selectedEpisodeGroupRef}
              id='episodeGroup-selected'
              style={{ width: 'fit-content' }}
              className={`hover-effect cursor-pointer ${styles.radioOptionCard} ${styles.unselectedOptionCard}`}
              onClick={onEpisodeGroupDropBtnPress}
            >
              <label
                htmlFor='episodeGroup-selected'
                className='flex flex-row space-x-1 cursor-pointer'
              >
                <span className='text-md'>{episodeGroup.from}</span>
                <span className='text-md'>-</span>
                <span className='text-md'>{episodeGroup.to}</span>
                <span className='text-md'>{t('集')}</span>
                <Image
                  style={{ paddingLeft: '4px' }}
                  src={ArrowDownFillIcon}
                  alt='Icon'
                />
              </label>
            </div>

            {showDropdown && (
              <ul
                className={`flex flex-col overflow-y-scroll max-h-48 ${styles.dropdownContainer} no-scrollbar overscroll-none`}
              >
                {episodeGroups.map((group, index) => (
                  <li
                    style={{
                      background: '#1D2023E0 !important',
                      width: `${selectedEpisodeGroupDivWidth}px`,
                      marginBottom: `${
                        index != episodeGroups.length - 1 ? '7px' : '0px'
                      }`,
                    }}
                    key={`key-episodeGroup-${index}`}
                    id={`episodeGroup-${index} `}
                    className={`${styles.radioOptionCard} ${
                      episodeGroup === group
                        ? styles.selectedOptionDropdownGroup
                        : styles.unselectedOptionDropdownGroup
                    }`}
                    onClick={() => onEpisodeGroupPress(group)}
                  >
                    <label
                      htmlFor={`episodeGroup-${index}`}
                      className='flex flex-row space-x-1'
                    >
                      <span className='text-sm'>{group.from}</span>
                      <span className='text-sm'>-</span>
                      <span className='text-sm'>{group.to}</span>
                      <span className='text-sm'>{t('集')}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul
            className='lg:flex hidden flex-column styling-scrollbar overscroll-none'
            style={{
              flexWrap: 'wrap',
              overflowX: 'auto',
              position: 'relative',
              right: '4px',
              fontFamily:'monospace'
            }}
          >
            {vodSource?.vod_play_list?.urls
              ?.slice(episodeGroup.from - 1, episodeGroup.to)
              .map((episode) => {
                return (
                  <li
                    ref={
                      episodeSource.nid === episode.nid
                        ? selectedEpisodeRef1
                        : null
                    }
                    style={{
                      padding: '10px',
                      margin: '4px',
                      minWidth: '70px',
                      justifyContent: 'center',
                    }}
                    key={`key-episode-${episode.nid}`}
                    id={`episode-${episode.nid}`}
                    className={`hover-effect cursor-pointer ${
                      styles.radioOptionCard
                    } ${
                      episodeSource.nid === episode.nid
                        ? styles.selectedOptionCard
                        : styles.unselectedOptionCard
                    }`}
                    onClick={() => selectEpisode(episode)}
                  >
                    <label htmlFor={`episode-${episode.nid}`}>
                      <div className='text-sm cursor-pointer'>
                        {episode.name}
                      </div>
                    </label>
                  </li>
                );
              })}
          </ul>

          {/* Mobile H5 */}
          {vodSource?.vod_play_list?.urls?.length > 0 && (
            <div
              className='lg:hidden flex relative'
              style={{ justifyContent: 'space-between' }}
            >
              <div>
                <span>选集</span>
              </div>

              <div>
                {vodSource?.vod_play_list?.urls?.length > 3 && (
                  <div
                    id='episodeGroup-selected'
                    onClick={() => setOpen(true)}
                    style={{ color: '#9C9C9C' }}
                  >
                    <label
                      htmlFor='episodeGroup-selected'
                      className='flex flex-row space-x-1'
                    >
                      <span className='text-md'>{episodeGroup.from}</span>
                      <span className='text-md'>-</span>
                      <span className='text-md'>{episodeGroup.to}</span>
                      <span className='text-md'>{t('集')}</span>
                      <span style={{ margin: 'auto', paddingLeft: '0.5rem' }}>
                        <Image src={ArrowRightIcon} alt='Icon' />
                      </span>
                    </label>
                  </div>
                )}
              </div>
              {/* Bottom Sheet Episode */}
              <BottomSheet
                open={open}
                onDismiss={() => {
                  setOpen(false);
                }}
                data-body-scroll-lock-ignore='true'
              >
                <ul
                  className='flex flex-column overflow-auto no-scrollbar'
                  style={{ overflowY: 'scroll' }}
                >
                  {episodeGroups.map((group, index) => (
                    <li
                      key={`key-episodeGroup-${index}`}
                      id={`episodeGroup-${index}`}
                      className={`${styles.radioOptionCard} ${
                        episodeGroup === group
                          ? styles.selectedOptionDetailsCard
                          : styles.unselectedOptionDetailsCard
                      }`}
                      onClick={() => onEpisodeGroupPress(group)}
                    >
                      <label
                        htmlFor={`episodeGroup-${index}`}
                        className='flex flex-row space-x-1'
                      >
                        <span className='text-md'>{group.from}</span>
                        <span className='text-md'>-</span>
                        <span className='text-md'>{group.to}</span>
                        <span className='text-md'>{t('集')}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                <div
                  className='px-4'
                  ref={episodeContainerRef}
                  style={{ height: '320px', marginTop: '0.5rem' }}
                >
                  <ul
                    className='flex flex-column no-scrollbar'
                    style={{
                      flexWrap: 'wrap',
                      overflowY: 'scroll',
                      minHeight: '150px',
                      maxHeight: '300px',
                    }}
                  >
                    {vodSource?.vod_play_list?.urls
                      ?.slice(episodeGroup.from - 1, episodeGroup.to)
                      .map((episode) => {
                        return (
                          <div
                            className='py-1'
                            style={{
                              marginRight: '0.4rem',
                              height: 'fit-content',
                              minWidth: '4.5rem',
                              maxWidth: '11rem',
                            }}
                            key={`key-episode-${episode.nid}`}
                          >
                            <li
                              style={{ justifyContent: 'center' }}
                              key={`key-episode-${episode.nid}`}
                              id={`episode-${episode.nid}`}
                              className={`${styles.radioOptionCard} ${
                                episodeSource.nid === episode.nid
                                  ? styles.selectedOptionCard
                                  : styles.unselectedOptionCard
                              }`}
                              onClick={() => selectEpisode(episode)}
                            >
                              <label htmlFor={`episode-${episode.nid}`}>
                                <div className='text-sm'>{episode.name}</div>
                              </label>
                            </li>
                          </div>
                        );
                      })}
                  </ul>
                </div>
              </BottomSheet>
            </div>
          )}
          <ul className='lg:hidden flex flex-column overflow-auto no-scrollbar'>
            {vodSource?.vod_play_list?.urls
              ?.slice(episodeGroup.from - 1, episodeGroup.to)
              .map((episode) => {
                return (
                  <div
                    ref={
                      episodeSource.nid === episode.nid
                        ? selectedEpisodeRef2
                        : null
                    }
                    style={{ margin: '0.2rem 0.4rem' }}
                    key={`key-episode-${episode.nid}`}
                  >
                    <li
                      style={{ justifyContent: 'center' }}
                      key={`key-episode-${episode.nid}`}
                      id={`episode-${episode.nid}`}
                      className={`${styles.radioOptionCard} ${
                        episodeSource.nid === episode.nid
                          ? styles.selectedOptionCard
                          : styles.unselectedOptionCard
                      }`}
                      onClick={() => selectEpisode(episode)}
                    >
                      <label htmlFor={`episode-${episode.nid}`}>
                        <div className='text-sm text-nowrap'>
                          {episode.name}
                        </div>
                      </label>
                    </li>
                  </div>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};
