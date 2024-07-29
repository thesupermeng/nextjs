import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import TextInput from '../textInputBox/input';

export const RequestVideoDialog = ({ open, handler }) => {
  const [formData, setFormData] = useState({});
  const [isInputError, setIsInputError] = useState({
    email: true,
    videoName: true,
  });

  useEffect(() => {
    // Add any effect logic here
  }, []);

  const handleInput = (e, isError) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (['email', 'videoName'].includes(e.target.name)) {
      setIsInputError((prev) => ({
        ...prev,
        [e.target.name]: isError,
      }));
    }
  };

  const isEmailValid = (value) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)) {
      return false;
    }
    return true;
  };

  const isVideoNameValid = (value) => {
    if (!value) {
      return false;
    }
    return true;
  };

  const checkError = (obj) => {
    for (let key in obj) {
      if (obj[key] === true) {
        return true;
      }
    }
    return false;
  };

  return (
    <Dialog
      open={open}
      handler={handler}
      className={'w-[500px] bg-[#121212] rounded-[28px] p-2 relative'}
      dismiss={{ outsidePress: true }}
    >
      <DialogBody className={'p-[20px] w-full h-[80vh] flex flex-col'}>
        <FontAwesomeIcon
          icon={faTimesCircle}
          className={
            'absolute top-4 right-4 cursor-pointer w-[35px] h-[35px] text-[#FFFFFF33] hover-effect'
          }
          onClick={handler}
        />
        <div className={'flex flex-col gap-[19px] mb-[20px]'}>
          <p className={'text-[20px] text-center font-semibold text-white'}>
            求片
          </p>
          <p className={'text-[15px] text-center font-normal text-white'}>
            找不到心仪的影片？请填写详细信息，我们将尽快为您找到您想要的影片
          </p>
        </div>
        <div className='flex-grow w-full overflow-auto'>
        <div className={'flex flex-col gap-[15px]'}>
            <div>
              <div className='pb-2 pl-2'>
                <span className={'text-[15px] text-[#9C9C9C]'}>电邮地址 *</span>
              </div>
              <TextInput
                name='email'
                placeholder={'输入您的邮箱'}
                onChange={handleInput}
                errorMessage={
                  formData.email ? '电邮地址格式错误' : '必填项不能为空'
                }
                validator={isEmailValid}
                isShowIcon={true}
                checkNotEmpty={true} // Ensure email is not empty
              />
            </div>
            <div>
              <div className='pb-2 pl-2'>
                <span className={'text-[15px] text-[#9C9C9C]'}>
                  片名（只提供旧片）*
                </span>
              </div>
              <TextInput
                name='videoName'
                placeholder={'输入您需要的影片名称'}
                onChange={handleInput}
                errorMessage={'必填项不能为空'}
                validator={isVideoNameValid}
                isShowIcon={true}
                checkNotEmpty={true} // Ensure video name is not empty
              />
            </div>
            <div>
              <div className='pb-2 pl-2'>
                <span className={'text-[15px] text-[#9C9C9C]'}>上映年份</span>
              </div>
              <TextInput
                name='yearUp'
                placeholder={'输入上映年份'}
                onChange={handleInput}
                isShowIcon={true}
              />
            </div>
            <div>
              <div className='pb-2 pl-2'>
                <span className={'text-[15px] text-[#9C9C9C]'}>导演</span>
              </div>
              <TextInput
                name='directorName'
                placeholder={'输入导演名称'}
                onChange={handleInput}
                isShowIcon={true}
              />
            </div>
            <div>
              <div className='pb-2 pl-2'>
                <span className={'text-[15px] text-[#9C9C9C]'}>
                  主演（可超过一个）
                </span>
              </div>
              <TextInput
                name='actorName'
                placeholder={'输入主演名称'}
                onChange={handleInput}
                isShowIcon={true}
              />
            </div>
          </div>
          <Button
            disabled={
              Object.keys(isInputError).length > 0
                ? checkError(isInputError)
                : true
            }
            className={
              'w-full rounded-[10px] h-auto bg-shayuBlue py-2 text-[17px] font-semibold'
            }
            onClick={handler}
          >
            提交
          </Button>
          <div className={'flex items-center justify-center mt-[10px]'}>
            <span className={'text-[13px] text-[#9C9C9C]'}>
              *越完善的信息能够提高求片的成功率哦!
            </span>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};