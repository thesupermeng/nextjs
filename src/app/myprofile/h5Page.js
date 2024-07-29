'use client';
// import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import {
  AboutusIconGrey,
  FavouriteIconGrey,
  FeedbackIconGrey,
  HistoryIconGrey,
  LogoutGrey,
  PinIconGrey,
} from '@/asset/icons';

import { getNewAhaToken, logout } from '@/services/yingshiUser';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAhaToken,
  setYingshiUserInfo,
  setYingshiUserLoginParam,
  setYingshiUserToken,
} from '@/store/yingshiUser';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import NavCard from '@/components/myprofile/NavCard';
import VipCard from '@/components/myprofile/VipCard';
import ProfileCard from '@/components/myprofile/ProfileCard';
import LogoutModal from '@/components/login/logoutModal';
import { useRouter } from 'next/navigation';
import { useLoginOpen } from '@/hook/yingshiScreenState/useLoginOpen';
import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import {setShowLogin, setShowLoginSuccess , setShowPinSuccess , setShowWithdrawalSuccess , setIsSessionExpired} from '@/store/yingshiScreen';

import { setIsSessionExpired } from '@/store/yingshiScreen';
// import { Spinner } from './../../components/spinner';

export default function H5Page({ params }) {
  const router = useRouter();

  const navs = [
    // {
    //   title: '我的收藏',
    //   icon: FavouriteIconGrey,
    //   onClick: () => {},
    //   isSelected: false,
    //   platform: 'mobile',
    //   isRequireLogin: false
    //
    // },
    {
      title: '播放历史',
      icon: HistoryIconGrey,
      onClick: () => {},
      isSelected: false,
      platform: 'mobile',
      isRequireLogin: false,
      href: '/myprofile/watchHistory',
    },
    // {
    //   title: '安全PIN码',
    //   icon: PinIconGrey,
    //   onClick: () => {},
    //   isSelected: false,
    //   platform: 'mobile',
    //   isRequireLogin: true,
    //   href: '/setpin',
    // },
    {
      title: '我要反馈',
      icon: FeedbackIconGrey,
      onClick: () => {},
      isSelected: false,
      platform: 'mobile',
      isRequireLogin: false,
      href: '/myprofile/feedback',
    },
    {
      title: '关于我们',
      icon: AboutusIconGrey,
      onClick: () => {
        setOpenAboutus(true);
      },
      isSelected: false,
      platform: 'mobile',
      isRequireLogin: false,
    },
    {
      title: '登出',
      icon: LogoutGrey,
      onClick: () => {
        setOpenLogoutConfirmation(true);
      },
      isSelected: false,
      platform: 'mobile',
      isRequireLogin: true,
    },
  ];

  const [openSignInUp, setOpenSignInUp] = useLoginOpen();
  const [openLoginSuccess, setOpenLoginSuccess] = useState(false);
  const [openLogoutConfirmation, setOpenLogoutConfirmation] = useState(false);
  const [frameToken, setFrameToken] = useState(null);
  const { isVip, userInfo, ahaToken, refreshUserInfo } = useYingshiUser();

  const dispatch = useDispatch();
  const getLoginParam = (s) => s.yingshiUser.loginParam;
  const loginParam = useSelector(getLoginParam);
  let isRefreshing = false;

  // temp
  const [openAboutus, setOpenAboutus] = useState(false);

  const aboutusHandler = () => {
    setOpenAboutus((x) => !x);
  };

  const handleClickEmail = () => {
    window.location = 'mailto:contactus@yingshi.tv';
  };

  // temp end

  useEffect(() => {
    if (loginParam && loginParam.success) {
      setOpenLoginSuccess(true);

      setTimeout(() => {
        setOpenLoginSuccess(false);
        dispatch(setYingshiUserLoginParam(null));
      }, 2000);
    }
  }, [loginParam]);

  // useLayoutEffect(() => {
  //   console.log('refreshUserInfo')
  //   refreshUserInfo()
  // }, [])

  const handleOnClickVip = () => {
    if (!userInfo) {
      setOpenSignInUp(true);
    } else {
      router.push('/payment');
    }
  };

  const onRefreshToken = async () => {
    // setFrameToken(null)
    let res = await getNewAhaToken();
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (res) {
      //setFrameToken(res)
      dispatch(setAhaToken(res));
      //updateLocalstorage(LocalStorageKeys.AhaToken, res)
      localStorage.setItem('AuthToken', res);
      setFrameToken(res);
      isRefreshing = false;
    }

    return res;
  };

  const iframeMessageListener = async (event) => {
    if (
      event.data.message === 'iframe' &&
      event.data.type != 'TikTokPixelSPAMonitor'
    ) {
      //  console.log('iframe message', event.data)
      if (event.data.type === 'login') {
        //  console.log('login type ')
        if (!userInfo) {
          setOpenSignInUp(true);
        }
        // onRefreshToken()
      } else if (event.data.type === 'invalidToken' && userInfo) {
        //   console.log('invalid aha token')
        dispatch(setIsSessionExpired(true));
        // if (frameToken == -1) {
        //   return
        // }
        // console.log('invalid aha token')
        // setFrameToken(-1)
      } else if (event.data.type === 'share') {
        console.log('share');
        // router.push('/setpin')
        window.open(event.data.url, '_blank', 'noopener,noreferrer');
      } else {
        if (event.data.url.includes('undefined')) {
          dispatch(setIsSessionExpired(true));
        } else {
          router.push(`/sport/${event.data.url}`);
        }
      }
    }
  };

  useEffect(() => {
    // dispatch(setIsSessionExpired(true))

    // window.addEventListener('message', iframeMessageListener);
    // return () => {
    //   window.removeEventListener('message', iframeMessageListener);
    // };
  }, []);

  useEffect(() => {
    // let x = await onRefreshToken()
    //let xx = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudHJ5X2NvZGUiOiIrNjUiLCJleHAiOjE3NDg2NjY4NDMsImlhdCI6MTcxNzEzMDg0MywibW9iaWxlIjoiODEyMzMzODciLCJ1c2VyX2lkIjoyMDU4fQ.kVo5WYOCwVmLRByTNjY1CpRc5aeKFx1aEIwnMXcGa0s`
    const init = async () => {
      setFrameToken(-1);
      let tempToken = localStorage.getItem('AuthToken');
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFrameToken(tempToken);
      dispatch(setAhaToken(tempToken));
    };
    init();
  }, []);

  const debounceRef = useRef(null);

  // useEffect(() => {

  //   if (frameToken === -1) {
  //     if (debounceRef.current) {
  //       clearTimeout(debounceRef.current);
  //     }

  //     debounceRef.current = setTimeout(() => {
  //       onRefreshToken();
  //     }, 8000);
  //   }
  // }, [frameToken]);

  return (
    <div>
      {/*{openLoginSuccess &&*/}
      {/*  <div className={'absolute top-0 left-0 flex justify-center items-center w-full h-full'}*/}
      {/*       onClick={() => setOpenSignInUp(false)}>*/}
      {/*    <div*/}
      {/*      className={'w-[270px] h-[195px] rounded-[14px] bg-[#222222CC] flex flex-col items-center justify-center'}>*/}
      {/*      <Image src={TickAnimation} alt={'Login success'} width={95} height={95}/>*/}
      {/*      <span className={'text-[17px]'}>登录成功</span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*}*/}
      <LogoutModal
        open={openLogoutConfirmation}
        handler={() => setOpenLogoutConfirmation((x) => !x)}
        onCancel={() => setOpenLogoutConfirmation(false)}
        onConfirm={() => {
          logout();

          setTimeout(() => {
            dispatch(setYingshiUserInfo(null));
            dispatch(setYingshiUserToken(null));
            dispatch(setAhaToken(null));
            setOpenLogoutConfirmation(false);
          }, 10);
        }}
      />
      {/* user profile */}
      <div
        style={{
          background: '#1D2023',
          borderRadius: '12px',
          marginBottom: '16px',
        }}
      >
        <div className='flex flex-col p-[12px] gap-[12px]'>
          <div>
            <ProfileCard
              userInfo={userInfo}
              isVip={isVip}
              isH5={true}
              onSignin={() => setOpenSignInUp(true)}
            />
          </div>
          <VipCard onClick={handleOnClickVip} />
        </div>
      </div>

      {/*aha iframe  background: '#1D2023', */}
      {/* {userInfo && frameToken && frameToken != -1 && (
        <div style={{ borderRadius: '12px', marginBottom: '16px' }}>
          <iframe
            className={'h-[74px] w-full rounded-[12px]'}
            src={`https://iframe-h5.aha666.site/user/wallet?authToken=${frameToken}&channelCode=100019`}
            scrolling={'no'}
            allow='clipboard-read; clipboard-write'
          />

        </div>
      )} */}

      {/* background: '#1D2023', */}
      {frameToken == -1 && userInfo && (
        <div
          style={{
            borderRadius: '12px',
            marginBottom: '16px',
            height: '73px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '22px',
          }}
        >
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )}

      <div className={'flex flex-col gap-[16px] pb-[20px]'}>
        {navs
          .filter((x) => {
            if (userInfo) {
              // is logged in
              return true; // show all
            } else {
              return x.isRequireLogin === false; // show only those that don't require login
            }
          })
          .map((x, idx) => {
            return <NavCard key={x.title} {...x} />;
          })}
      </div>

      {/* temporary only  */}
      <Dialog
        open={openAboutus}
        handler={aboutusHandler}
        className={'bg-[#121212] rounded-[28px] p-[30px] outline-none'}
        size={'xs'}
      >
        <DialogBody className={'p-0 w-full h-full flex flex-col items-center'}>
          <p
            className={
              'text-center text-white text-[17px] font-medium mb-[12px]'
            }
          >
            影视TV
          </p>
          <p className={'text-[14px] text-white'}>
            如果本站提供内容侵犯了您的版权，请来函说明，本网站将立即删除，保护版权所有者的权益。
          </p>
          <div className={'w-full'}>
            <span className={'text-white text-[14px]'}>联系邮箱：</span>
            <span
              className={'text-shayuBlue text-[14px]'}
              onClick={handleClickEmail}
            >
              contactus@yingshi.tv
            </span>
          </div>
          <Button
            className={'text-shayuBlue text-[16px] mt-[12px] outline-none'}
            color={'blue'}
            tabIndex={-1}
            variant={'outlined'}
            size={'sm'}
            onClick={() => setOpenAboutus(false)}
          >
            确定
          </Button>
        </DialogBody>
      </Dialog>
      {/* temporary only end  */}
    </div>
  );
}
