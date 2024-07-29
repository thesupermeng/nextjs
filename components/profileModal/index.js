import { useSelector } from 'react-redux';
import { ForgorPasswordModal } from './ForgotPasswordModal';
import { ResetPasswordModal } from './ResetPasswordModal';
import SignupLoginModal from './SignupLoginModal';
import { FinishSetupModal } from './FinishSetupModal';

export const ProfileModal = () => {
  const profileModal = useSelector((s) => s.common.profileModal);
  switch (profileModal) {
    case ProfileModalType.LoginModal:
      return <SignupLoginModal type='login' />;
    case ProfileModalType.SignUpModal:
      return <SignupLoginModal type='signup' />;
    case ProfileModalType.forgotPasswordModal:
      return <ForgorPasswordModal />;
    case ProfileModalType.ResetPasswordModal:
      return <ResetPasswordModal />;
    case ProfileModalType.FinishSetupModal:
      return <FinishSetupModal />;
    default:
      return null;
  }
};
export const ProfileModalType = {
  LoginModal: 1,
  SignUpModal: 2,
  forgotPasswordModal: 3,
  ResetPasswordModal: 4,
  FinishSetupModal: 5,
};
