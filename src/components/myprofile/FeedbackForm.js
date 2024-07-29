import {Alert, Button} from '@material-tailwind/react';
import React, {useRef, useState} from 'react';
import TextInput from '../textInputBox/input';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import {submitFeedback} from '@/services/yingshiUser';
import Image from 'next/image';
import {ArrowLeftIcon} from '@/asset/icons';
import {useRouter} from 'next/navigation';
import {FeedbackAnimation, TickAnimation} from '@/asset/gif';

export default function FeedbackForm() {

  const {userInfo} = useYingshiUser()
  const router = useRouter()

  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState(userInfo?.user_email)

  const [isShowSuccess, setIsShowSuccess] = useState(false)

  const handleChange = (e) => {
    setFeedback(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const canSubmit = feedback.length > 0 && feedback.length <= 200 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)

  const handleSubmit = () => {
    submitFeedback({email, feedback}).then(()=> {
      setIsShowSuccess(true)
      setTimeout(() => {
        setIsShowSuccess(false)
      }, 1500)
      setFeedback('')
    })
  }

  return (
    <>
      <div className={'desktop w-full'}>
        <div className={'relative flex flex-col gap-[36px] w-full'}>
          {isShowSuccess &&
            <div className={'absolute top-0 left-0 flex justify-center items-center w-full h-full z-10'}
                 onClick={() => setIsShowSuccess(false)}>
              <div
                className={'w-[270px] h-[195px] rounded-[14px] bg-[#222222CC] flex flex-col items-center justify-center'}>
                <Image src={FeedbackAnimation} alt={'Submit success'} width={95} height={95}/>
                <span className={'text-[17px]'}>反馈提交成功</span>
              </div>
            </div>
          }
          <div className={`relative flex flex-col gap-[36px] w-full ${isShowSuccess ? 'blur' : ''}`}>
            <span className={'text-[28px] font-semibold text-center text-white'}>我要反馈</span>
            <div className={'flex flex-col'}>
              <span className={'text-white text-[16px] font-semibold'}>电子邮箱</span>
              <div className={'mt-[14px] font-semibold'}>
                <TextInput
                  name="email"
                  placeholder={'输入邮箱账号'}
                  onChange={handleEmailChange}
                  errorMessage={'电邮地址格式错误'}
                  validator={(value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)}
                  initValue={email}
                />
              </div>


              <span className={'text-white text-[16px] font-semibold mt-[20px]'}>问题反馈</span>
              <div className={'flex bg-[#1D2023] rounded-[10px] px-[20px] py-[17px] mt-[14px] h-[176px]'}>
          <textarea className={'w-full h-full bg-inherit text-white font-semibold resize-none outline-none'}
                    placeholder={'请详细描述您的问题和建议'} onChange={handleChange} maxLength={200} value={feedback}/>
              </div>
              <span className={'self-end text-[#9C9C9C] mt-[14px]'}>{feedback.length}/200</span>
              <Button className={'lg:w-[33%] bg-shayuBlue text-[17px] font-semibold text-white'}
                      disabled={!canSubmit} onClick={handleSubmit}>提交</Button>
            </div>
          </div>

        </div>
      </div>

      <div className={'mobile w-full'}>
        {isShowSuccess &&
          <div className={'absolute top-0 left-0 flex justify-center items-center w-full h-full z-10'}
               onClick={() => setIsShowSuccess(false)}>
            <div
              className={'w-[270px] h-[195px] rounded-[14px] bg-[#222222CC] flex flex-col items-center justify-center'}>
              <Image src={FeedbackAnimation} alt={'Submit success'} width={95} height={95}/>
              <span className={'text-[17px]'}>反馈提交成功</span>
            </div>
          </div>
        }
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
                <span className={'text-white'}>我要反馈</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex flex-col px-4 ${isShowSuccess ? 'blur' : ''}`}>
          <span className={'text-white text-[16px] font-semibold'}>电子邮箱</span>
          <div className={'mt-[14px] font-semibold'}>
            <TextInput
              name="email"
              placeholder={'输入邮箱账号'}
              onChange={handleEmailChange}
              errorMessage={'电邮地址格式错误'}
              validator={(value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)}
              initValue={email}
            />
          </div>


          <span className={'text-white text-[16px] font-semibold mt-[12px]'}>问题反馈</span>
          <div className={'flex bg-[#1D2023] rounded-[10px] px-[20px] py-[17px] mt-[14px] h-[176px]'}>
          <textarea className={'w-full h-full bg-inherit text-white font-semibold resize-none outline-none'}
                    placeholder={'请详细描述您的问题和建议'} onChange={handleChange} maxLength={200} value={feedback}/>
          </div>
          <span className={'self-end text-[#9C9C9C] mb-[14px]'}>{feedback.length}/200</span>
          <Button className={'bg-shayuBlue text-[17px] font-semibold text-[#1D2023]'}
                  disabled={!canSubmit} onClick={handleSubmit} size={'sm'}>提交</Button>
        </div>
      </div>
    </>

  )
}
