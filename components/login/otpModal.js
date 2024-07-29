import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { loginEmail, loginRequestEmailOtp, loginRequestSmsOtp, loginSms } from '@/services/yingshiUser';
import { setAhaToken, setYingshiUserLoginParam, setYingshiUserToken , setYingshiUserInfo } from '@/store/yingshiUser';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {trackLoginSignUp} from '@/util/universalEvent';

const totalCountdownTime = 60 // seconds


export default function OtpModal({ open, handler, onLogin, onRegister , onCloseOTP }) {
  const [countdownTimer, setCountdownTimer] = useState(totalCountdownTime);
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  //redux
  const dispatch = useDispatch()
  const getLoginParam = (s) => s.yingshiUser.loginParam
  const loginParam = useSelector(getLoginParam)


  // refs
  const timerRef = useRef(null);
  const inputRefs = useRef([])
  const otpRef = useRef(new Array(6).fill(''))

  useEffect(() => {
    // if (timerRef.current) return;

    if (open) {
      timerRef.current = setInterval(() => {
        setCountdownTimer(prev => Math.max(0, prev - 1))
      }, 1000)
    }

    return () => {
      clearInterval(timerRef.current)
    }

  }, [open])

  // useEffect(() => {
  //   if (inputRefs.current.length !== 0) {
  //     inputRefs.current[0].focus()
  //   }
  // }, [])

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleChange = (value, index) => {
    setErrorMessage('')
    let newArr = [...otpRef.current];
    newArr[index] = value.target.value;
    otpRef.current = newArr

    if (value && index < inputRefs.current.length - 1) {
      if (value.target.value !== '') {
        inputRefs.current[index + 1].focus()
      }
    }
    else if (value && index === inputRefs.current.length - 1) {
      if (value.target.value !== '') {
        if (loginParam.loginMode === 'sms') {
          loginSms({ ...loginParam, otp: otpRef.current.join('') })
            .then(res => {
              // login = res.code = 0
              // signup = res.code = 201

              if (res.code === -1) {
                setErrorMessage(res.message)
                return
              }

              dispatch(setYingshiUserLoginParam({ success: true }))
              if (res.code === 0) {
                onLogin()
              }
              if (res.code === 201) {
                onRegister()
              }

              trackLoginSignUp(res.data.user)
              dispatch(setYingshiUserInfo(res.data.user))
              dispatch(setYingshiUserToken(res.data.access_token))
              dispatch(setAhaToken(res.data.aha_token))
              localStorage.setItem('AuthToken' ,res.data.aha_token )
              inputRefs.current[inputRefs.current.length - 1].blur()
            })
        } else {
          loginEmail({ ...loginParam, otp: otpRef.current.join('') })
            .then(res => {
              // login = res.code = 0
              // signup = res.code = 201
              if (res.code === -1) {
                setErrorMessage(res.message)
                return
              }



              dispatch(setYingshiUserLoginParam({ success: true }))
              if (res.code === 0) {
                onLogin()
              }
              if (res.code === 201) {
                onRegister()
              }

              trackLoginSignUp(res.data.user)
              dispatch(setYingshiUserInfo(res.data.user))
              dispatch(setYingshiUserToken(res.data.access_token))
              dispatch(setAhaToken(res.data.aha_token))
              localStorage.setItem('AuthToken' ,res.data.aha_token )
              inputRefs.current[inputRefs.current.length - 1].blur()
            })
        }

      }
    }
  }

  const handleResendOtp = () => {
    setCountdownTimer(totalCountdownTime)
    if (loginParam.loginMode === 'sms') {
      loginRequestSmsOtp(loginParam)
    } else {
      loginRequestEmailOtp(loginParam)

    }
  }

  return (
    <>
      {loginParam && loginParam.loginMode &&
        <Dialog open={open} handler={handler} className={'w-[600px] bg-[#121212] rounded-[28px] p-0 overflow-scroll relative no-scrollbar'} size={'xs'} dismiss={{outsidePress:false}}>
          <DialogBody className={'py-[25px] w-full h-full'}>
            <div className={'flex flex-col items-center]'}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',

              }}>
                <p className={' px-[15px] text-white font-semibold text-[20px] text-center mb-[24px]'}>输入验证码</p>

                <FontAwesomeIcon icon={faTimesCircle}
                                 className={'absolute top-4 right-4 cursor-pointer w-[35px] h-[35px] text-[#FFFFFF33] hover-effect'}
                                 onClick={handler}
                />
              </div>

              <div className={'px-[15px] flex flex-col items-center'}>
                <p className={'text-white text-center font-medium font-[18px]'}>请输入 6 位数字，验证码已发送至</p>
                <p className={'text-shayuBlue text-center font-medium font-[18px]'}>{loginParam.loginMode === 'sms' ? `+${loginParam.phoneNumber}` : loginParam.email}</p>
              </div>


              <div className={'flex justify-center mt-[13px] px-[15px]'}>
                <div className={'flex justify-between w-full max-w-[320px]'}>
                  {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <OtpInput
                      key={index}
                      onKeyPress={(e) => handleBackspace(e, index)}
                      onChange={(e) => handleChange(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)
                      }
                      isError={!!errorMessage}
                    />
                  ))}
                </div>
              </div>


              {errorMessage && <p className={'px-[15px] text-[#FF1010] text-[13px] mb-[13px]'}>{errorMessage}</p>}
              {!errorMessage && <p className={'px-[15px] text-transparent text-[13px] mb-[13px]'}>placeholder</p>}

              <div className={'px-[15px] flex flex-col items-center]'}>
                <Button className={'px-[15px] bg-shayuBlue text-[15px] font-semibold normal-case'} disabled={countdownTimer > 0} onClick={handleResendOtp}>重新发送验证码 {countdownTimer > 0 && `${countdownTimer}s`}</Button>
              </div>
            </div>
          </DialogBody>
        </Dialog>
      }
    </>

  )
}

const OtpInput = forwardRef(function OtpInput({ onKeyPress, onChange, isError }, ref) {
  const colorClasses = isError ? `border border-[#FF1010] bg-[#FF10101A]` : `border border-transparent focus:border-[#FAC33D]`

  return <input
    onKeyDown={onKeyPress}
    onChange={onChange}
    ref={ref}
    className={`w-[48px] h-[48px] rounded-[6px] bg-[#1D2023] text-[15px] text-center text-white font-bold outline-none ${colorClasses}`}
    maxLength={1}
    type={'tel'}
  />
}
)
