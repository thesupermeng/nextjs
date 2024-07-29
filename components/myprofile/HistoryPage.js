import { ArrowLeftIcon, clear, ImagePlaceholder, searchEmptyIcon } from '@/asset/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogBody, Progress } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { VideoHorizontalHistoryCard } from '../videoItem/videoHorizontalHistoryCard';

const getObjectValue = (obj, targetKey) => {
  // Check if the object is defined and if it contains the 'times' key
  if (obj && obj.times && obj.times[targetKey]) {
    return obj.times[targetKey];
  } else {
    return 0; // Return null if the key is not found
  }
};

export default function HistoryPage() {
  const [watchHistoryList, setWatchHistoryList] = useState([]);
  const [openConfirmClearHistory, setOpenConfirmClearHistory] = useState(false);

  const router = useRouter();

  const handleOpenConfirmClearHistory = () => {
    setOpenConfirmClearHistory((x) => !x);
  };

  const handleClearWatchHistory = () => {
    localStorage.removeItem('artplayer_settings');
    localStorage.removeItem('watchHistoryList');
    setWatchHistoryList([]);
  };

  useEffect(() => {
    let watchHistoryData = JSON.parse(localStorage.getItem('watchHistoryList'));
    let artPlayerData = JSON.parse(localStorage.getItem('artplayer_settings'));

    if (watchHistoryData !== null) {
      const updatedWatchHistoryData = watchHistoryData.map((item) => {
        const watchedTimes = getObjectValue(artPlayerData, item.vodurl);
        if (watchedTimes !== 0) {
          return { ...item, watchtimes: watchedTimes };
        } else {
          if (item.watchtimes !== 0) {
            return { ...item };
          } else {
            return { ...item, watchtimes: watchedTimes };
          }
        }
      });

      localStorage.setItem(
        'watchHistoryList',
        JSON.stringify(updatedWatchHistoryData)
      );
      setWatchHistoryList(JSON.parse(localStorage.getItem('watchHistoryList')));
    }
  }, []);

  return (
    <>
      <div className={'desktop w-full'}>
        <div className={`flex flex-col gap-[36px] w-full`}>
          <ConfirmClearHistoryModal
            open={openConfirmClearHistory}
            handler={handleOpenConfirmClearHistory}
            onConfirm={() => {
              handleClearWatchHistory();
              setOpenConfirmClearHistory(false);
            }}
            onCancel={() => setOpenConfirmClearHistory(false)}
          />
          <div className={'relative flex justify-center items-center'}>
            <span
              className={'text-[28px] font-semibold text-center text-white'}
            >
              播放历史
            </span>
      
              <div className={'absolute right-0'}>
                <div
                  className={`flex-row justify-center cursor-pointer ${watchHistoryList.length === 0 ? 'hidden' : 'flex'
                    }`}
                  onClick={() => {
                    setOpenConfirmClearHistory(true);
                  }}
                >
                  <span
                    className='text-sm hover-effect'
                    style={{ color: 'rgba(156, 156, 156, 1)' }}
                  >
                    清除记录
                  </span>
                  <Image className='mx-1' src={clear} alt='clear' width={10} />
                </div>
              </div>
          </div>
          <div>
            <div className={'flex grid grid-cols-3 gap-2 mb-2'}>
              {watchHistoryList
                .slice()
                .reverse()
                .map((vod, idx) => {
                  return (
                    <VideoHorizontalHistoryCard key={idx} vod={vod} index={idx} displayStyle={'bottom-content'} />
                    // <HistoryCard
                    //   key={idx}
                    //   vod={vod}
                    //   onClick={() => {
                    //     router.push(`/vod/play/id/${vod.vodid}/sid/${vod.tid}/nid/${vod.nid}`);
                    //   }}
                    // />
                  );
                })}
            </div>
            {watchHistoryList.length === 0 && (
              <div className='flex-col items-center flex'>
                <Image
                  className='mx-2'
                  src={searchEmptyIcon}
                  alt='empty'
                  width={120}
                />
                <span className='text-sm font-semibold text-white'>
                  暂无播放历史
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmClearHistoryModal
        open={openConfirmClearHistory}
        handler={handleOpenConfirmClearHistory}
        onConfirm={() => {
          handleClearWatchHistory();
          setOpenConfirmClearHistory(false);
        }}
        onCancel={() => setOpenConfirmClearHistory(false)}
      />

      <div className='mobile sticky top-0 z-20 bg-[#000000]'>
        <div className='flex py-3 mx-2.5'>
          <div className='gap-y-2 flex-col w-full md:flex-row flex'>
            <div className='relative flex-1 flex gap-x-2 justify-between'>
              <div
                className={
                  'flex w-[30px] h-[30px] justify-center items-center z-10 self-center'
                }
                onClick={() => {
                  router.back();
                }}
              >
                <Image src={ArrowLeftIcon} alt={'back button'} height={16} />
              </div>
              <div
                className={
                  'flex-1 absolute h-full w-full flex items-center justify-center'
                }
              >
                <span className={'text-white'}>播放历史</span>
              </div>
              {watchHistoryList.length > 0 && (
              <Button
                variant={'text'}
                size={'sm'}
                className={'self-center mr-2 z-10 text-white text-[15px]'}
                onClick={() => setOpenConfirmClearHistory(true)}
              >
                清除
              </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={'mobile'}>
        <div className={'flex flex-col'}>
          {watchHistoryList.length !== 0 && (
            <div className={'flex-1 flex flex-col px-4 gap-4 overflow-hidden mb-2'}>
              {watchHistoryList
                .slice()
                .reverse()
                .map((vod, idx) => {
                  return (
                    <VideoHorizontalHistoryCard key={idx} vod={vod} index={idx} displayStyle={'side-content'}/>
                    // <HistoryCard
                    //   key={idx}
                    //   vod={vod}
                    //   onClick={() => {
                    //     router.push(`/vod/play/id/${vod.vodid}/sid/${vod.tid}/nid/${vod.nid}`);
                    //   }}
                    // />
                  );
                })}
            </div>
          )}

          {watchHistoryList.length === 0 && (
            <div className='flex-col items-center flex'>
              <Image
                className='mx-2'
                src={searchEmptyIcon}
                alt='empty'
                width={120}
              />
              <span className='text-sm font-semibold text-white'>
                暂无播放历史
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// {
//   "tid": "2",
//   "nid": 1,
//   "vodid": "201644",
//   "vodpic": "https://oss.yingshi.tv/images/vod/e5/e5d-e8-ca7.jpg",
//   "vodname": "超意神探(粤)",
//   "vodurl": "https://m3u.haiwaikan.com/xm3u8/49bcfa2efa367893f6700a82697fde24323fe367e803251207d0615eba053c719921f11e97d0da21.m3u8",
//   "watchtimes": 74.832744
// }

// function HistoryCard({ vod, onClick }) {
//   if (!vod) return null;
//   else {
//     return (
//       <>
//         <div className={'desktop'}>
//           <div
//             className={
//               'flex flex-col w-[224px] mb-2 cursor-pointer hover:text-shayuBlue'
//             }
//             onClick={onClick}
//           >
//             <div
//               className={
//                 'h-[126px] rounded-[12px] overflow-hidden relative mb-2'
//               }
//             >
//               <Image
//                 src={ImagePlaceholder}
//                 alt={`Image for ${vod.vodname}`}
//                 fill={true}
//                 objectFit={'cover'}
//                 className={'absolute'}
//               />
//               <Image
//                 src={vod.vodpic}
//                 alt={`Image for ${vod.vodname}`}
//                 fill={true}
//                 objectFit={'cover'}
//               />
//               {/* add placeholder  */}
//             </div>
//             <span className={'hover:text-inherit text-[15px] mb-1'}>
//               {vod.vodname}
//             </span>
//             <span className={'text-white text-[12px] mb-1'}>
//               观看至 {secondsToHHMMSS(vod.watchtimes)}
//             </span>
//             {/*<Progress*/}
//             {/*  value={10}*/}
//             {/*  size={'sm'}*/}
//             {/*  color={'blue'}*/}
//             {/*  className={'bg-[#FFFFFF38]'}*/}
//             {/*/>*/}
//           </div>
//         </div>
//         <div className={'mobile'}>
//           <div className={'flex gap-3 my-[12px]'} onClick={onClick}>
//             <div
//               className={
//                 'h-[87px] w-[154px] rounded-[12px] overflow-hidden relative'
//               }
//             >
//               <Image
//                 src={ImagePlaceholder}
//                 alt={`Image for ${vod.vodname}`}
//                 fill={true}
//                 objectFit={'cover'}
//                 className={'absolute'}
//               />
//               <Image
//                 src={vod.vodpic}
//                 alt={`Image for ${vod.vodname}`}
//                 fill={true}
//                 objectFit={'cover'}
//               />
//               {/* add placeholder  */}
//             </div>
//             <div className={'flex-1 flex flex-col justify-evenly truncate'}>
//               <span className={'text-[17px] font-medium truncate'}>{vod.vodname}</span>
//               <span className='text-xs '>{`第${vod.nid}集`}</span>
//               <span className={'text-[12px]'}>
//                 观看至 {secondsToHHMMSS(vod.watchtimes)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

function ConfirmClearHistoryModal({ open, handler, onConfirm, onCancel }) {
  return (
    <Dialog
      open={open}
      handler={handler}
      className={'bg-[#121212] rounded-[28px] p-[30px]'}
      size={'xs'}
    >
      <DialogBody className={'p-0 w-full h-full'}>
        <div className={'desktop'}>
          <div className={'flex flex-col gap-[16px] px-10 font-medium'}>
            <span className={'text-[17px] text-white text-center'}>
              清除提示
            </span>
            <span className={'text-[17px] text-white text-center'}>
              您确定要清空播放历史吗？
            </span>
            <div className={'flex flex-col py-[10px]'}>
              <Button
                className={'text-[15px] text-white bg-shayuBlue'}
                onClick={onConfirm}
              >
                确定
              </Button>
              <Button
                className={'text-[15px] text-[#9C9C9C] bg-transparent'}
                onClick={onCancel}
              >
                取消
              </Button>
            </div>
          </div>
        </div>
        <div className={'mobile'}>
          <div className={'flex flex-col gap-[16px] px-2 font-medium'}>
            <span className={'text-[17px] text-white text-center'}>
              清除提示
            </span>
            <span className={'text-[13px] text-white text-center'}>
              您确定要清空播放历史吗？
            </span>
            <div className={'flex gap-3 pt-2'}>
              <Button
                className={'flex-1 text-[15px] text-white'}
                onClick={onCancel}
                variant={'outlined'}
                tabIndex={-1}
              >
                取消
              </Button>
              <Button
                className={'flex-1 text-[15px] text-shayuBlue'}
                onClick={onConfirm}
                variant={'outlined'}
                tabIndex={-1}
                color={'blue'}
              >
                确定
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
