import LoginModal from '@/components/login/index';
import OtpModal from '@/components/login/otpModal';
import NicknameModal from '@/components/login/nicknameModal';
import LoginSuccess from '@/components/login/loginSuccess';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useRouter } from 'next/navigation';
import {useLoginOpen} from '@/hook/yingshiScreenState/useLoginOpen';
import {useLoginSuccessOpen} from '@/hook/yingshiScreenState/useLoginSuccessOpen';

export default function LoginFlow(props) {
  const [openLogin, setOpenLogin] = useLoginOpen();
  const [openOTP, setOpenOTP] = useState(false);
  const [openLoginSuccess, setOpenLoginSuccess] = useLoginSuccessOpen();
  const [openNickname, setOpenNickname] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(!openLogin);
  };

  const handleOpenOTP = () => {
    setOpenOTP((x) => !x);
  };

  const handleOpenLoginSuccess = () => {
    setOpenLoginSuccess(!openLoginSuccess);
  };

  const handleOpenNickname = () => {
    setOpenNickname((x) => !x);
  };

  return (
    <>
      {openLogin &&
        <LoginModal
          open={openLogin}
          handler={handleOpenLogin}
          onRegsiter={() => {
            setOpenLogin(false)
            setOpenOTP(true)
          }}
        />
      }

      {openOTP &&
        <OtpModal
          open={openOTP}
          handler={handleOpenOTP}
          onLogin={() => {
            setOpenOTP(false);
            setOpenLoginSuccess(true);
            setTimeout(() => {
              setOpenLoginSuccess(false);
            }, 2000);
          }}
          onRegister={() => {
            setOpenOTP(false);
            setOpenNickname(true);
          }}
        />
      }

      {/*<NicknameModal*/}
      {/*  open={openNickname}*/}
      {/*  handler={handleOpenNickname}*/}
      {/*  onSuccess={() => {*/}
      {/*    setOpenNickname(false)*/}
      {/*    setOpenLoginSuccess(true)*/}
      {/*    setTimeout(() => {*/}
      {/*      setOpenLoginSuccess(false)*/}
      {/*      router.refresh()*/}
      {/*    }, 2000)*/}
      {/*  }}*/}
      {/*/>*/}
      <LoginSuccess
        open={openLoginSuccess}
        handler={handleOpenLoginSuccess}
        msg={'登录成功'}
      />
    </>
  );
}

