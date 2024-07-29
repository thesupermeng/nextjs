import {YingshiApi , YingshiApi2} from '@/util/YingshiApi';
import {URL_YINGSHI_USER} from '@/config/yingshiUrl';

const platformId = 5 // for web

export const loginRequestEmailOtp = async ({email, referralCode}) => {
    return YingshiApi(
        URL_YINGSHI_USER.signInUp,
        {
            request_otp_by: 'EMAIL',
            is_social_login: false,
            email: email,
            referral_code: referralCode,
            platform_id: platformId
        },
        {method: 'POST'}
    )
}

export const loginRequestSmsOtp = async ({phoneNumber, countryId, referralCode}) => {
    return YingshiApi(
        URL_YINGSHI_USER.signInUp,
        {
            request_otp_by: 'SMS',
            is_social_login: false,
            phone_number: phoneNumber,
            country_id: countryId,
            referral_code: referralCode,
            platform_id: platformId
        },
        {method: 'POST'}
    )
}

export const loginEmail = async ({email, referralCode, otp}) => {
    return YingshiApi(
        URL_YINGSHI_USER.signInUp,
        {
            request_otp_by: 'EMAIL',
            is_social_login: false,
            email: email,
            referral_code: referralCode,
            platform_id: platformId,
            otp: otp
        },
        {
            method: 'POST',
            saveUserToken: true,
            saveAhaToken: true,
            returnFullResponse: true
        }
    )
}

export const loginSms = async ({phoneNumber, countryId, referralCode, otp}) => {
    return YingshiApi(
        URL_YINGSHI_USER.signInUp,
        {
            request_otp_by: 'SMS',
            is_social_login: false,
            phone_number: phoneNumber,
            country_id: countryId,
            referral_code: referralCode,
            platform_id: platformId,
            otp
        },
        {
            method: 'POST',
            saveUserToken: true,
            saveAhaToken: true,
            returnFullResponse: true

        }
    )
}

export const logout = async () => {
    return YingshiApi2(
        URL_YINGSHI_USER.logout,
        {},
        {
            method: 'POST',
            removeToken: true
        }
    )
}

export const queryUserInfo = async () => {
    return YingshiApi(
        URL_YINGSHI_USER.userInfo,
        {},
        {method: 'GET'}
    )
}

export const getCountryList = async () => {
    return YingshiApi(
        URL_YINGSHI_USER.countryList,
        {},
        {method: 'GET'}
    )
}

export const updateUserInfo = async (data) =>{
    return YingshiApi(
        URL_YINGSHI_USER.updateUser,
        data,
        {
          method: 'POST',
          returnFullResponse: true
        }
    )
}

export const submitFeedback = async ({email, feedback}) => {
    return YingshiApi(
        URL_YINGSHI_USER.feedback,
        {
          email,
          feedback,
          platform_id:platformId
        },
        {
            method: 'POST',
        }
    )
}

export const getNewAhaToken = async () => {
  return YingshiApi(
    URL_YINGSHI_USER.refreshAhaToken,
    {},
    {
      method : 'GET',
    }
  )
}
