'use client'
import React, {useEffect, useState} from 'react';
import {updateUserInfo} from '@/services/yingshiUser';
import {useRouter} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {setYingshiUserInfo} from '@/store/yingshiUser';
import {Button} from '@material-tailwind/react';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';

export default function Nickname () {
  const dispatch = useDispatch()
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const {userInfo, refreshUserInfo} = useYingshiUser()
  const getLoginParam = (s) => s.yingshiUser.loginParam
  const loginParam = useSelector(getLoginParam)

  useEffect(() => {
    if (!loginParam) router.push('/')
  })

  useEffect(() => {
    // when first load this page, invalidate user info in redux, prevent stale data
    dispatch(setYingshiUserInfo(null))
  }, [])

  const validator = (val) => {
    // check whether val is between 2 and 18 characters
    return val.length >= 2 && val.length <= 18;
  }

  const handleChange = (e) => {
    setErrorMsg(null)
    const val = e.target.value
    setNickname(val)
  }

  const handleConfirm = async () => {
   let res = await updateUserInfo({username: nickname})
   
        if (res.code === 0) {
          // success

          await refreshUserInfo()
          

          router.push('/myprofile')
        } else if (res.code === -1) {
          setErrorMsg(res?.errors?.username ?? '昵称格式不正确')
        }
     
  }

  const canSubmit = validator(nickname)


  return (
    <div>
      <div className="desktop" style={{paddingTop: '100px', minHeight: '80vh'}}>
        WEB
      </div>
      <div className="mobile w-screen p-4">
        <div className={'flex flex-col items-center w-full px-[23px] pt-10'}>
          <p className={'text-[22px] text-center font-medium'}>输入属于您的昵称</p>
          <p className={'text-[14px] text-center mt-[23px]'}>请输入2-18个字符</p>

          <div className={'flex flex-col mt-[32px] w-full'}>
            <div className={`bg-[#1D2023] rounded-[10px] px-[20px] h-[48px] flex items-center border border-transparent ${errorMsg ? 'border-[#FF0000]' : ''}`}>
              <input onChange={handleChange} className={'text-white text-[15px] outline-none bg-inherit w-full'}
                     maxLength={18}/>
            </div>
            <div className={'flex justify-between'}>
              <span className={'text-[16px] text-[#FF0000] flex-1'}>{errorMsg}</span>
              <span className={'text-[16px] text-[#9C9C9C] font-medium'}>{nickname.length}/18</span>
            </div>
          </div>

          <Button onClick={handleConfirm}
                  className={'text-[17px] enabled:text-white enabled:bg-shayuBlue disabled:text-[#9C9C9C] disabled:bg-[#1D2023] w-full rounded-[10px] py-3 mt-[32px] h-[48px]'}
                  disabled={!canSubmit}>
            确定
          </Button>
        </div>
      </div>
    </div>

  )
}
