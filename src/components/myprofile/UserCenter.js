import Image from 'next/image';
import {ArrowLeftIcon, editIcon, guestUser, MemberUser, profileIcon, VipUser} from '@/asset/icons';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import EditNicknameModal from '@/components/myprofile/editNicknameModal';
import {useEffect, useLayoutEffect, useState} from 'react';
import LoginSuccess from '@/components/login/loginSuccess';
import {useRouter} from 'next/navigation';

export default function UserCenter() {
  const { isVip, userInfo, refreshUserInfo } = useYingshiUser()
  const [openEditNickname, setOpenEditNickname] = useState(false)
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false)

  const router = useRouter();

  const handleOpenEditNickname = () => {
    setOpenEditNickname(x => !x)
  }

  const handleOpenSuccessAlert = () => {
    setOpenSuccessAlert(x => !x)
  }

  useLayoutEffect(()=> {
    if (!userInfo){
      router.push(`/`);
    }
  }, [])

  return (
    <>
      <EditNicknameModal
        open={openEditNickname}
        handler={handleOpenEditNickname}
        onSuccess={() => {
          setOpenEditNickname(false)
          setOpenSuccessAlert(true)
          refreshUserInfo()
          setTimeout(() => {
            setOpenSuccessAlert(false)
          }, 2000)
        }}
      />
      <LoginSuccess
        open={openSuccessAlert}
        handler={handleOpenSuccessAlert}
        msg={'昵称修改成功'}
      />
      <div className={'desktop w-full'}>
        <div className={'flex flex-col gap-[36px] w-full'}>
          <span className={'text-[28px] font-semibold text-center text-white'}>个人中心</span>
          <div>
            <span className={'text-white text-[16px] font-semibold'}>个人信息</span>
            <div className={'flex bg-[#1D2023] rounded-[10px] px-[20px] py-[17px] items-center gap-[12px] mt-[14px]'}>
            <Image
                src={ isVip ? VipUser : MemberUser }
                alt={'profile icon'}
                width={56}
              />
              <span className={'text-white text-[15px] font-semibold flex-1'}>{userInfo?.user_name}</span>
              <Image src={editIcon} alt={'edit'} width={30} onClick={handleOpenEditNickname}
                     className={'cursor-pointer'}/>
            </div>
          </div>
          <div>
            <span className={'text-white text-[16px] font-semibold'}>账号与安全</span>
            {userInfo?.user_email &&
              <div className={'flex bg-[#1D2023] rounded-[10px] px-[20px] py-[25px] items-center gap-[20px] mt-[14px]'}>
                <span className={'text-[#9C9C9C] text-[15px] font-semibold'}>电邮地址</span>
                <span className={'text-white text-[15px] font-semibold flex-1'}>{userInfo.user_email}</span>
              </div>
            }
            {!!(userInfo?.user_phone) &&
              <div className={'flex bg-[#1D2023] rounded-[10px] px-[20px] py-[25px] items-center gap-[20px] mt-[14px]'}>
                <span className={'text-[#9C9C9C] text-[15px] font-semibold'}>手机号码</span>
                <span
                  className={'text-white text-[15px] font-semibold flex-1'}>+{userInfo.user_phone}</span>
              </div>
            }
          </div>
        </div>
      </div>

      <div className={'mobile'}>
        <div className='flex py-3 mx-2.5'>
          <div className='gap-y-2 flex-col w-full md:flex-row flex'>
            <div className="relative flex-1 flex gap-x-2 md:justify-start">
              <div
                className={
                  'flex w-[30px] h-[30px] justify-center items-center z-10'
                }
                onClick={() => {
                  router.back();
                }}
              >
                <Image src={ArrowLeftIcon} alt={'back button'} height={16}/>
              </div>
              <div
                className={
                  'flex-1 absolute h-full w-full flex items-center justify-center'
                }
              >
                <span className={'text-white'}>个人中心</span>
              </div>
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-[16px] px-4 py-2'}>
          <div className={'h-12 w-full flex justify-between items-center bg-[#1D2023] rounded-[10px] px-[21px]'}>
            <span className={'text-[#9C9C9C] text-[15px] font-medium'}>头像</span>
            <Image
                src={ isVip ? VipUser : MemberUser }
                alt={'Profile picture'} width={30} height={30}
              />
          </div>

          <div className={'h-12 w-full flex justify-between items-center bg-[#1D2023] rounded-[10px] px-[21px]'} onClick={handleOpenEditNickname}>
            <span className={'text-[#9C9C9C] text-[15px] font-medium'}>昵称</span>
            <span className={'text-white text-[15px] font-medium'}>{userInfo?.user_name}</span>
          </div>
        </div>
      </div>
    </>
  )
}
