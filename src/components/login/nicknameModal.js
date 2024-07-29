import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setYingshiUserInfo } from '@/store/yingshiUser';
import { updateUserInfo } from '@/services/yingshiUser';

export default function NicknameModal({ open, handler, onSuccess }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const getLoginParam = (s) => s.yingshiUser.loginParam;
  const loginParam = useSelector(getLoginParam);

  // useEffect(() => {
  //   // when first load this page, invalidate user info in redux, prevent stale data
  //   if (open) {
  //     dispatch(setYingshiUserInfo(null))
  //   }
  // }, [open])

  const validator = (val) => {
    // check whether val is between 2 and 18 characters
    return val.length >= 2 && val.length <= 18;
  };

  const handleChange = (e) => {
    setErrorMsg(null);
    const val = e.target.value;
    setNickname(val);
  };

  const handleConfirm = () => {
    updateUserInfo({ username: nickname }).then((res) => {
      if (res.code === 0) {
        // success
        onSuccess();
      } else if (res.code === -1) {
        setErrorMsg(res?.errors?.username ?? '昵称格式不正确');
      }
    });
  };

  const canSubmit = validator(nickname);

  return (
    <Dialog
      open={open}
      handler={handler}
      className={'w-[500px] bg-[#121212] rounded-[28px] p-[30px]'}
      size={'xs'}
    >
      <DialogBody className={'p-0 w-full h-full'}>
        <div className={'flex flex-col items-center w-full px-[23px]'}>
          <p className={'text-[22px] text-white text-center font-medium'}>
            输入属于您的昵称
          </p>
          <p className={'text-[16px] text-[#9C9C9C] text-center mt-[15px]'}>
            请输入2-18个字符
          </p>

          <div className={'flex flex-col mt-[19px] w-full'}>
            <span className={'text-[15px] text-[#9C9C9C] self-start'}>
              输入昵称
            </span>
            <div
              className={`mt-[15px] bg-[#1D2023] rounded-[10px] px-[20px] h-[48px] flex items-center border border-transparent ${
                errorMsg ? 'border-[#FF0000]' : ''
              }`}
            >
              <input
                onChange={handleChange}
                className={
                  'text-white text-[15px] outline-none bg-inherit w-full'
                }
                maxLength={18}
              />
            </div>
            <div className={'flex justify-between'}>
              <span className={'text-[16px] text-[#FF0000] flex-1'}>
                {errorMsg}
              </span>
              <span className={'text-[16px] text-[#9C9C9C] font-medium'}>
                {nickname.length}/18
              </span>
            </div>
          </div>

          <Button
            onClick={() => handleConfirm()}
            className={
              'text-[17px] enabled:text-white enabled:bg-shayuBlue disabled:text-[#9C9C9C] disabled:bg-[#1D2023] w-full rounded-[10px] py-3 mt-[15px] h-[48px]'
            }
            disabled={!canSubmit}
          >
            确定
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
