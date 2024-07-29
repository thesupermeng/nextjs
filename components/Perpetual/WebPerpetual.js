'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProfileModal, ProfileModalType } from '../profileModal';
import { OTPModal } from '../profileModal/OTPModal';
import { CommonPerpetual } from './commonPerpetual';
import { WithdrawModal } from '../withdrawModal';
import { MatchAnimation } from '../matchAnimation';
import useUser from '@/hook/user/useUser';
import { setProfileModal } from '@/store/common';
import { useDispatch } from 'react-redux';
import { updateBetSetting } from '@/store/betCart';
import { LocalStorageKeys } from '@/config/common';
import { DownloadSlides } from '../userGuide/DownloadSlides';
import { QrCodeModal } from '../qrCodeModal';
import { WebDraggableChat } from '../privateMsgRoom/webDraggableChat';
import { SpeechBubble } from '../privateMsgRoom/SpeechBubble';

// this is a place to put always-run logic and elements
export default function WebPerpetual() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [showQrModal, setShowQrModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (pathname?.includes('/user')) {
      router.replace('/home');
    }
    dispatch(
      updateBetSetting({
        name: 'format',
        value: Number(localStorage.getItem(LocalStorageKeys.OddsFormat)) || 1,
      })
    );
  }, [pathname]);

  useEffect(() => {
    if (user && user?.setup_required) {
      dispatch(setProfileModal(ProfileModalType.FinishSetupModal));
    }
  }, [user]);
  return (
    <>
      <CommonPerpetual />
      <ProfileModal />
      <WithdrawModal />
      <OTPModal />
      <MatchAnimation />
      {/* <DownloadSlides setShowQrModal={setShowQrModal} /> */}
      {showQrModal && <QrCodeModal setShowQrModal={setShowQrModal} />}
      <WebDraggableChat />
      <SpeechBubble />
    </>
  );
}
