import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { convertTimeStampToDateTime } from '@/util/date';
import { ShareHorizontal } from '@/components/shareHorizontal';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import styles from './style.module.css';
import { CloseX, ImagePlaceholder } from '@/asset/icons';
import { ArrowLeftIcon, ArrowRightIcon } from '@/asset/icons';
import { ExtraDesc } from '../extraDesc';
import base64PlaceholderString from '@/app/placeholder';

export const VodCard = ({
  imgSource,
  vodName,
  vodUpdateDate,
  vodYear,
  vodClass,
  vodRemark,
  vod,
  vodEpisodeInfo,
  vodEpisodeSelected,
  vodDirector,
  vodActor,
  vodBlurb,
  openJianJie,
  setShowShareBox,
  xMode = false,
  episodeSelected = '',
}) => {
  const { t } = useTranslation();

  const _vodUpdateDate = convertTimeStampToDateTime(vodUpdateDate);
  const [openIntroBottomSheet, setOpenIntroBottomSheet] = useState(false);
  const [episodeInfo, setEpisodeInfo] = useState(null);
  const [desc, setDesc] = useState('');
  const [imageError, setImageError] = useState(false);

  const selectIntro = () => {
    setOpenIntroBottomSheet(true);
  };

  const webOpenJianJie = () => {
    openJianJie();
  };

  useEffect(() => {
    if (vod) {
      let desc = vod.vod_year + ' ' + vod.vod_area;
      let vodClass = [];
      if (vod.vod_class != null) {
        vodClass = vod.vod_class.split(',');
      }
      vodClass = vodClass.slice(0, 2);
      vodClass.forEach((item, i) => {
        desc += ' ' + item;
      });

      setDesc(desc);
    }
  }, [vod]);

  useEffect(() => {
    if (vodEpisodeInfo != null && vodEpisodeSelected != null) {
      const episodeId = vodEpisodeSelected.nid;
      const selectedItem = vodEpisodeInfo.filter(
        (info) => info.episode == episodeId + 1
      );
      if (selectedItem.length > 0) {
        setEpisodeInfo(selectedItem[0]);
      } else {
        setEpisodeInfo(null);
      }
    }
  }, [vodEpisodeInfo, vodEpisodeSelected]);
  return (
    <div className='flex flex-row space-x-4'>
      {/* Bottom Sheet Intro H5*/}
      <BottomSheet
        onDismiss={() => {
          setOpenIntroBottomSheet(false);
        }}
        style={{
          zIndex: '10',
        }}
        open={openIntroBottomSheet}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
          className='pb-1'
        >
          <div>
            <span
              className='text-md text-white px-2'
              style={{ fontWeight: '500' }}
            >
              {t('简介')}
            </span>
          </div>
          <div
            style={{ paddingRight: '0.8rem' }}
            onClick={() => {
              setOpenIntroBottomSheet(false);
            }}
          >
            <Image src={CloseX} alt='Icon' />
          </div>
        </div>
        <div
          className={styles.vodMetaContainer}
          style={{ overflowY: 'auto', maxHeight: '40vh', marginBottom: '1rem' }}
        >
          <div className='space-y-4'>
            <div className='pb-3' style={{ color: '#9C9C9C' }}>
              <div className='text-sm pt-1'>{desc}</div>
              <div className='text-sm pt-1'>导演: {vod.vod_director}</div>
              <div className='text-sm pt-1'>主演: {vod.vod_actor}</div>
              <div className='text-sm pt-3'>
                <p>
                  {vod?.vod_blurb == null ? vod.vod_content : vod.vod_blurb}
                </p>
              </div>
            </div>

            {episodeInfo && (
              <div>
                <span className=''>
                  {t('分集剧情 : ')}
                  {episodeInfo.title}
                </span>
                <p
                  className={`text-white/75 text-sm`}
                  style={{ color: '#9C9C9C' }}
                >
                  {episodeInfo.gpt_content}
                </p>
              </div>
            )}
          </div>
        </div>
      </BottomSheet>
      {xMode ? (
        <>
          <div className='flex w-full' style={{ flexDirection: 'column' }}>
            <div className={`relative hidden lg:w-3/3 lg:flex rounded-xl ${imageError? 'h-[171px]': ''}`}>
              {/* <img
                className='rounded-xl'
                onError={(e) => setImageError(true)}
                src={imageError ? ImagePlaceholder : imgSource}
              /> */}
              <Image
                placeholder='blur'
                blurDataURL={'data:image/png;base64,' + base64PlaceholderString}
                alt='video'
                src={imageError ? ImagePlaceholder : imgSource}
                style={{
                  objectFit: imageError? 'cover': 'fill',
                }}
                layout={imageError ? 'none' : 'intrinsic'}
                width={304} // Set the intrinsic width of the image
                height={171} // Set the intrinsic height of the image to maintain aspect ratio
                // sizes='100%'
                className='rounded-xl'
                onError={(e) => setImageError(true)}
              />
              {/* <span className='absolute bottom-2 left-0 text-xs bg-black/50 rounded-r py-0.5 pr-0.5'>
                {vodRemark}
              </span> */}
            </div>

            <div className='flex flex-col lg:w-3/3 pt-3'>
              <div className='flex flex-row'>
                <span
                  className='text-lg pr-5 line-clamp-2'
                  dangerouslySetInnerHTML={{ __html: vodName }}
                ></span>
                <div
                  className='lg:hidden flex flex-row space-x-2 py-1'
                  onClick={() => setOpenIntroBottomSheet(true)}
                >
                  {/* <span className="text-sm text-white/75" style={{ fontWeight: '300' }}>{t('简介')}</span>
                <Image
                  src={ArrowRightIcon}
                  alt="Icon"
                /> */}
                </div>
              </div>
              <span
                className='text-sm text-white/75 py-1 pt-3'
                style={{ fontWeight: '300', color: '#9C9C9C' }}
              >
                {vodYear} {vodClass}
              </span>
              <span
                className='text-sm text-white/75 py-1'
                style={{ fontWeight: '300', color: '#9C9C9C' }}
              >
                {t('更新')}: {_vodUpdateDate.year}-{_vodUpdateDate.month}-
                {_vodUpdateDate.day}
              </span>
              <div
                className='lg:flex hidden flex-row space-x-2 py-1 cursor-pointer'
                onClick={webOpenJianJie}
              >
                <span
                  className='text-sm text-white/75'
                  style={{ fontWeight: '300', color: '#9C9C9C' }}
                >
                  {t('简介')}
                </span>
                <Image src={ArrowRightIcon} alt='Icon' />
              </div>
              {/* H5 Share Horizontal */}
              <div className='lg:hidden flex vod-share'>
                <ShareHorizontal
                  className={'w-[90%]'}
                  setShowShareBox={setShowShareBox}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='relative hidden lg:flex rounded-xl'>
            {/* <img
              className='rounded-xl'
              src={imgSource}
              style={{ width: '120px', height: 'auto' }}
            /> */}
            <Image
              placeholder='blur'
              blurDataURL={'data:image/png;base64,' + base64PlaceholderString}
              alt='video'
              src={imageError ? ImagePlaceholder : imgSource}
              layout='intrinsic'
              width={117} // Set the intrinsic width of the image
              height={208} // Set the intrinsic height of the image to maintain aspect ratio
              className='rounded-xl'
              onError={(e) => setImageError(true)}
            />
            {/* <span className='absolute bottom-2 left-0 text-xs bg-black/50 rounded-r py-0.5 pr-0.5'>
              {vodRemark}
            </span> */}
          </div>

          <div className='flex flex-col lg:w-2/3 allow-select'>
            <div className='flex flex-row'>
              <span
                className='text-lg pr-5 line-clamp-2'
                dangerouslySetInnerHTML={{ __html: vodName }}
              ></span>
              <div
                className='lg:hidden flex flex-row space-x-2 py-1'
                onClick={() => setOpenIntroBottomSheet(true)}
              >
                <span
                  className='text-sm text-white/75'
                  style={{ fontWeight: '300' }}
                >
                  {t('简介')}
                </span>
                <Image src={ArrowRightIcon} alt='Icon' />
              </div>
            </div>
            <span
              className='text-sm text-white/75 py-1 pt-3'
              style={{ fontWeight: '300', color: '#9C9C9C' }}
            >
              {vodYear} {vodClass}
            </span>
            <span
              className='text-sm text-white/75 py-1'
              style={{ fontWeight: '300', color: '#9C9C9C' }}
            >
              {t('更新')}: {_vodUpdateDate.year}-{_vodUpdateDate.month}-
              {_vodUpdateDate.day}
            </span>
            <div
              className='lg:flex hidden flex-row space-x-2 py-1 cursor-pointer'
              onClick={webOpenJianJie}
            >
              <span
                className='text-sm text-white/75'
                style={{ fontWeight: '300', color: '#9C9C9C' }}
              >
                {t('简介')}
              </span>
              <Image src={ArrowRightIcon} alt='Icon' />
            </div>
            {/* 
          <div className='mobile'>  
            <ExtraDesc isMobile={true} vod={vod} episodeSelected={episodeSelected} />
            </div> */}
            {/* H5 Share Horizontal */}
            <div className='lg:hidden flex vod-share'>
              <ShareHorizontal
                className={'w-[90%]'}
                setShowShareBox={setShowShareBox}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
