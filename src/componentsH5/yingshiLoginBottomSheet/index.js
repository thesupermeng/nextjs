'use client'
import { BottomSheet } from 'react-spring-bottom-sheet';
import React, { useEffect, useState } from 'react';
import { loginRequestEmailOtp, loginRequestSmsOtp } from '@/services/yingshiUser';
import TextInput from '@/components/textInputBox/input';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setYingshiUserLoginParam } from '@/store/yingshiUser';
import CountryInput from '@/componentsH5/yingshiLoginBottomSheet/countryInput';
import { Button, Checkbox } from '@material-tailwind/react';

export default function YingshiLoginBottomSheet({ visible, onDismiss }) {
    const router = useRouter()
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const [loginMode, setLoginMode] = useState('email')
    const [isInputError, setIsInputError] = useState(false);
    const [isAgreementChecked, setIsAgreementChecked] = useState(true);
    const isInputEmpty = !formData.phoneNumber && !formData.email
    const [countryPrefix, setCountryPrefix] = useState('');


    useEffect(() => {
        setFormData({})
    }, [loginMode])

    const handleRegister = () => {

        // const loginParam = loginMode === 'sms' ?
        //     {
        //         loginMode,
        //         ...formData,
        //     }
        //     :
        //     {
        //         loginMode,
        //         ...formData
        //     }
        const loginParam = { ...formData, loginMode }
        loginParam.phoneNumber = countryPrefix + loginParam.phoneNumber


        if (loginMode === 'sms') {
            loginRequestSmsOtp(loginParam)
        } else {
            loginRequestEmailOtp(loginParam)
        }

        dispatch(setYingshiUserLoginParam(loginParam))
        onDismiss()
        router.push('/login/otp')


    }

    const handleInput = (e, isError) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setIsInputError(isError)
    }

    const isEmailValid = (value) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)) {
            return false;
        }

        return true;
    }

    const isPhoneValid = (value) => {
        if (!/^[0-9]{7,12}$/.test(value.replace(RegExp(' ', 'g'), ''))) {
            return false;
        }

        return true;
    }

    const handleClickEmail = () => {
        setLoginMode('email')
    }

    const handleClickPhone = () => {
        setLoginMode('sms')
    }

    const handleClickPrivacy = () => {
        onDismiss()
        router.push('/privacy')
    }

    const handleClickService = () => {
        onDismiss()
        router.push('/service')
    }

    return (
        <BottomSheet
            onDismiss={()=>{setTimeout(() => {
                onDismiss()
              }, 100);}}
            open={visible}
            snapPoints={({ minHeight, maxHeight }) => minHeight}
        >
            <div className={'flex-col items-center'} style={{ paddingBottom: 15 }}>
                <p className={'text-xl text-center'}>注册/登录</p>
                <p className={'text-sm text-center text-[#9C9C9C] mt-2.5'}>登录后可管理您的账号，多端同步观看历史和收藏夹。</p>
                <div className={'px-[23px] mt-[22px]'}>
                    <div className={'flex'}>
                        <Tabs title={'电邮地址'} onClick={handleClickEmail} isSelected={loginMode === 'email'} />
                        <Tabs title={'手机号码'} onClick={handleClickPhone} isSelected={loginMode === 'sms'} />
                    </div>
                    <div className={'flex flex-col'}>
                        {loginMode === 'email' &&
                            <TextInput
                                name="email"
                                placeholder={'输入邮箱账号'}
                                onChange={handleInput}
                                errorMessage={'电邮地址格式错误'}
                                validator={isEmailValid}
                                isShowIcon={true}
                            />}
                        {loginMode === 'sms' &&
                            <CountryInput
                                name="phoneNumber"
                                placeholder={'2 345 6789'}
                                onChange={handleInput}
                                errorMessage={'手机号码格式错误'}
                                validator={isPhoneValid}
                                isShowIcon={true}
                                setCountryPrefix={setCountryPrefix}
                            />
                        }
                        {/* <TextInput
                            name="referralCode"
                            placeholder={'邀请码（选填）'}
                            onChange={handleInput}
                            isShowIcon={false}
                        /> */}
                        <Button className={'h-12 w-full rounded-[10px] disabled:bg-[#1D2023] enabled:bg-[#FAC33D] disabled:text-[#9C9C9C] enabled:text-white text-[17px]'} onClick={handleRegister} disabled={isInputError || isInputEmpty || !isAgreementChecked}>下一步</Button>
                        <div className={'flex items-center justify-center mt-[20px]'}>
                            <Checkbox
                                defaultChecked={isAgreementChecked}
                                ripple={false}
                                className={'w-4 h-4 rounded-full hover:before:opacity-0'}
                                color={'blue'}
                                onChange={(e) => setIsAgreementChecked(e.target.checked)}
                            />
                            <span className={'text-[13px] text-[#9C9C9C]'}>我已阅读并同意
                                <span className={'text-[#FAC33D]'} onClick={handleClickService}>用户协议</span>
                                和
                                <span className={'text-[#FAC33D]'} onClick={handleClickPrivacy}>隐私协议</span>
                            </span>
                        </div>
                        {/*<div className={'flex flex-col gap-[12px] mt-[20px]'} >*/}
                        {/*    <p className={'text-[#9C9C9C] text-[13px] text-center'}>使用以下方式登录</p>*/}
                        {/*    <button className={'w-full h-12 flex items-center bg-[#1D2023] rounded-lg px-[20px]'}>*/}
                        {/*        <Image src={GoogleIcon} alt={'Google Icon'} width={24} height={24} />*/}
                        {/*        <span className={'font-semibold text-[17px] text-white flex-1'}>使用Google账号登录</span>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </BottomSheet>
    )
}

function Tabs({ title, isSelected, onClick }) {
    const color = isSelected ? '#FAC33D' : 'transparent'
    const textStyle = isSelected ? 'text-white font-semibold' : 'text-[#FFFFFF80] '

    return (<div className={'p-2.5 flex flex-col items-center justify-center'} onClick={onClick}>
        <span className={textStyle}>{title}</span>
        <div className={`rounded h-[3px] w-[22px] bg-[${color}]`}></div>
    </div>)
}
