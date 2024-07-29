'use client'
import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { updateUserInfo } from '@/services/yingshiUser';
import Image from 'next/image';
import { MemberUser, VipUser, profileIcon } from '@/asset/icons';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditNicknameModal({ open, handler, onSuccess }) {
  const { isVip, userInfo, refreshUserInfo } = useYingshiUser()
  const [nickname, setNickname] = useState(userInfo ? userInfo.user_name : '')
  const [errorMsg, setErrorMsg] = useState(null)
  const [isOriginal, setIsOriginal] = useState(true)

  useEffect(() => {
    setNickname(userInfo ? userInfo.user_name : '')
    setIsOriginal(true)
  }, [open])

  const validator = (val) => {
    // check whether val is between 2 and 18 characters
    return val.length >= 2 && val.length <= 18;
  }

  const handleChange = (e) => {
    setErrorMsg(null)
    setIsOriginal(false)
    const val = e.target.value
    setNickname(val)
  }

  const handleConfirm = async () => {
    let res = await updateUserInfo({ username: nickname })

    if (res.code === 0) {
      // success
      // refreshUserInfo()
      onSuccess()
    } else if (res.code === -1) {
      setErrorMsg(res?.errors?.username ?? '昵称格式不正确')
    }

  }

  const canSubmit = !isOriginal && validator(nickname)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <>
      {!isMobile &&
        <Dialog open={open} handler={handler} className={'bg-[#121212] rounded-[28px] p-0 relative'} size={'sm'} dismiss={{ outsidePress: false }}>
          <DialogBody className={'p-[30px] w-full h-full'}>
            <FontAwesomeIcon icon={faTimesCircle}
              className={'absolute top-4 right-4 cursor-pointer w-[35px] h-[35px] text-[#FFFFFF33] hover-effect'}
              onClick={handler}
            />
            <div className={'flex flex-col items-center w-full px-[23px]'}>
              {/*<p className={'text-[22px] text-white text-center font-medium'}>输入属于您的昵称</p>*/}
              {/*<p className={'text-[16px] text-[#9C9C9C] text-center mt-[15px]'}>请输入2-18个字符</p>*/}

              <p className={'text-[22px] text-white text-center font-medium mb-[20px]'}>个人信息</p>
              <Image
                src={
                  isVip ? VipUser : MemberUser
                }
                alt={'profile icon'}
                width={100}
                height={100}
              />

              <div className={'flex flex-col mt-[19px] w-full'}>
                <span className={'text-[15px] text-white self-start font-semibold'}>昵称</span>
                <div
                  className={`mt-[15px] bg-[#1D2023] rounded-[10px] px-[20px] h-[48px] flex items-center border border-transparent ${errorMsg ? 'border-[#FF0000]' : ''}`}>
                  <input onChange={handleChange} className={'text-white text-[15px] outline-none bg-inherit w-full'}
                    maxLength={18} value={nickname} />
                </div>
                <div className={'flex justify-between'}>
                  <span className={'text-[16px] text-[#FF0000] flex-1'}>{errorMsg}</span>
                  <span className={'text-[16px] text-[#9C9C9C] font-medium'}>{nickname.length}/18</span>
                </div>
              </div>

              <Button onClick={handleConfirm}
                className={'text-[17px] enabled:text-white enabled:bg-shayuBlue disabled:text-[#9C9C9C] disabled:bg-[#1D2023] w-full rounded-[10px] py-3 mt-[15px] h-[48px]'}
                disabled={!canSubmit}>
                修改
              </Button>
            </div>
          </DialogBody>
        </Dialog>
      }
      {isMobile &&
        <BottomSheet
          open={open}
          onDismiss={handler}
          snapPoints={({ minHeight, maxHeight }) => minHeight}
        >
          <div className={'flex flex-col mt-[19px] w-full px-4 pb-4'}>
            <div className={'flex justify-between items-center'}>
              <Button className={'text-[15px] text-white'} variant={'text'} onClick={handler} size={'sm'} tabIndex={-1}>取消</Button>
              <span className={'text-[19px]'}>设置昵称</span>
              <Button className={'text-[15px] text-shayuBlue'} variant={'text'} onClick={handleConfirm} disabled={!canSubmit} size={'sm'} tabIndex={-1}>保存</Button>
            </div>
            <div
              className={`mt-[15px] bg-[#1D2023] rounded-[10px] px-[20px] h-[48px] flex items-center border border-transparent ${errorMsg ? 'border-[#FF0000]' : ''}`}>
              <input onChange={handleChange} className={'text-white text-[15px] outline-none bg-inherit w-full'}
                maxLength={18} value={nickname} />
            </div>
            <div className={'flex justify-between'}>
              <span className={'text-[16px] text-[#FF0000] flex-1'}>{errorMsg}</span>
              <span className={'text-[16px] text-[#9C9C9C] font-medium'}>{nickname.length}/18</span>
            </div>
          </div>
        </BottomSheet>
      }
    </>

  )
}
