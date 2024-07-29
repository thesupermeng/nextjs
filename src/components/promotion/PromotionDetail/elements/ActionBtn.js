import { ProfileModalType } from '@/components/profileModal';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { Button } from '@/componentsH5/button';
import useUser from '@/hook/user/useUser';
import {
  hideRightBarContent,
  setProfileModal,
  showRightBarContent,
} from '@/store/common';
import { isWeb } from '@/util/common';
import { handleInAppWebview } from '@/util/inAppHandler';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export const ActionBtn = ({ tw, text, disabled = false }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLogin = useUser();

  const gotoLogin = () => {
    isWeb()
      ? dispatch(setProfileModal(ProfileModalType.LoginModal))
      : router.push('/user/login');
  };
  const onClick = () => {
    if (!isLogin) {
      if (window.flutter_inappwebview?.callHandler) {
        handleInAppWebview('login');
        return;
      } else {
        gotoLogin();
      }
    } else {
      if (isWeb()) {
        dispatch(hideRightBarContent('All'));
        dispatch(showRightBarContent(RightSidebarContantTypes.Deposit));
      } else {
        if (window.flutter_inappwebview?.callHandler) {
          handleInAppWebview('deposit', (result) => {
            if (result) {
              router.refresh();
            }
          });
        } else {
          router.push(`/user/deposit`);
        }
      }
    }
  };
  return text ? (
    <Button buttonColor='capitalize' onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  ) : null;
};
