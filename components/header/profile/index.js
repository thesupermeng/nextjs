import {
  Account,
  Deposit,
  Following,
  Logout,
  OrderHistory,
  Transaction,
  Withdraw,
  IconArrowWhite,
  Avatar,
  ShareVideo,
  Notification,
  FeedbackIcon,
  VoucherWhiteFill,
} from '@/asset/icons';
import { Count } from '@/components/count';
import LogoutModal from '@/components/profileMenu/logoutModal';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import ShareModal from '@/components/shareModal';
import useUser from '@/hook/user/useUser';
import { hideRightBarContent, showRightBarContent } from '@/store/common';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { ImageWithFallback } from '@/components/fallbackImage';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';

const DropdownItem = ({ icon, text, onClick, countType }) => (
  <div
    className='flex py-2 px-1.5  rounded justify-between items-center '
    onClick={onClick}
  >
    <div className='flex'>
      <Image alt={text} src={icon} width={20} />
      <p className='text-sm ml-1.5 font-medium'>{text}</p>
    </div>

    {countType !== undefined && <Count type={countType} />}
  </div>
);

const Profile = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigateToRightSidebar = (type) => {
    dispatch(hideRightBarContent('All'));
    dispatch(showRightBarContent(type));
    setDropdownOpen(false);
  };

  const openNotification = () => {
    navigateToRightSidebar(RightSidebarContantTypes.Notification);
  };

  useEffect(() => {
    return () => {
      setDropdownOpen(false);
    };
  }, [pathname]);

  const menuItems = [
    {
      icon: Deposit,
      text: t('deposit'),
      onClick: () => {
        navigateToRightSidebar(RightSidebarContantTypes.Deposit);
      },
    },
    {
      icon: Withdraw,
      text: t('withdraw'),
      onClick: () =>
        navigateToRightSidebar(RightSidebarContantTypes.Withdrawal),
    },
    {
      icon: Transaction,
      text: t('transaction'),
      onClick: () =>
        navigateToRightSidebar(RightSidebarContantTypes.Transactions),
      countType: 2,
    },
    {
      icon: OrderHistory,
      text: t('orderHistory'),
      onClick: () =>
        navigateToRightSidebar(RightSidebarContantTypes.OrderHistory),
      countType: 1,
    },
    {
      icon: VoucherWhiteFill,
      text: t('myVoucher'),
      onClick: () => navigateToRightSidebar(RightSidebarContantTypes.MyVoucher),
    },
    {
      icon: Account,
      text: t('account'),
      onClick: () => navigateToRightSidebar(RightSidebarContantTypes.Account),
    },
    {
      icon: Following,
      text: t('following'),
      onClick: () => navigateToRightSidebar(RightSidebarContantTypes.Following),
    },
    {
      icon: FeedbackIcon,
      text: t('feedback'),
      onClick: () => navigateToRightSidebar(RightSidebarContantTypes.Feedback),
    },
    {
      icon: Notification,
      text: t('notification'),
      onClick: openNotification,
      countType: 0,
    },
    {
      icon: ShareVideo,
      text: t('share'),
      onClick: () => setShowModal(true),
    },
    {
      icon: Logout,
      text: t('logOut'),
      onClick: () => setIsLogoutOpen(true),
    },
  ];

  return (
    <div className='text-white'>
      <Menu allowHover open={dropdownOpen} handler={setDropdownOpen}>
        <MenuHandler>
          <button
            onClick={toggleDropdown}
            className='py-[0.38rem] px-2 flex flex-initial flex-row gap-2 rounded-[2.5rem] bg-white/5 items-center'
          >
            <div className='place-content-center flex flex-initial rounded-full my-auto w-[36px] h-[36px]'>
              <ImageWithFallback
                src={user?.avatar}
                fallbackSrc={Avatar}
                width={36}
                height={36}
                className='rounded-full object-cover'
              />
            </div>
            <div className='flex flex-initial text-white text-[0.9375rem] font-bold text-base'>
              {user?.username}
            </div>
            <div
              className={`flex flex-initial transition-transform place-content-center items-center my-auto ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            >
              <Image alt='arrow' src={IconArrowWhite} />
            </div>
          </button>
        </MenuHandler>
        <MenuList className='border-0 border-none text-white bg-[#090909] w-44 rounded-xl '>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              className='text-white p-0 hover:bg-white/5 focus:bg-white/5 active:bg-white/5 hover:text-white focus:text-white active:text-white'
            >
              <DropdownItem key={index} {...item} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {isLogoutOpen && <LogoutModal setIsLogoutOpen={setIsLogoutOpen} />}
      {showModal && <ShareModal setShowShareModal={setShowModal} />}
    </div>
  );
};

export default Profile;
