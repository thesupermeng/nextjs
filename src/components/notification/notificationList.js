import { getNotifications, markReadNotification } from '@/services/user';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { formatDate } from '../matchHistory/utils';
import Image from 'next/image';
import { CrossWhite } from '@/asset/icons';
import { useDispatch } from 'react-redux';
import { hideRightBarContent } from '@/store/common';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { isWeb } from '@/util/common';
import { LoadingPage } from '../loading';

export const NotificationList = () => {
  const { t } = useTranslation();
  const [list, setList] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const getNotify = async () => {
    await getNotifications({ page: 1, limit: 100 }).then((data) => {
      setLoading(false);
      if (data?.code === 0) {
        setList(data?.data);
        const unreadIds = data?.data
          ?.filter((notification) => !notification.is_read)
          ?.map((notification) => notification.id);

        unreadIds.length > 0 && markReadNotification({ ids: unreadIds });
      }
    });
  };

  useEffect(() => {
    getNotify();
  }, []);

  const onClose = () => {
    dispatch(hideRightBarContent(RightSidebarContantTypes.Notification));
  };
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className={`flex flex-col px-5 flex-1 ${isWeb() ? ' mt-5' : ''}`}>
      {isWeb() && (
        <div className='flex justify-between'>
          <button>
            <div className={'mr-2 text-base text-tayaRed font-medium'}>
              {t('notification')}
            </div>
            <div className='h-[0.1875rem] w-6 rounded-t-2xl bg-tayaRed ml-auto mr-auto mt-1'></div>
          </button>
          <Image
            alt='close'
            src={CrossWhite}
            className='w-9 h-9 opacity-20 hover:opacity-100 cursor-pointer'
            onClick={onClose}
          />
        </div>
      )}
      <div className='flex flex-col overflow-y-auto flex-[1_0_0] gap-4 my-2'>
        {list?.map((l, idx) => {
          return (
            <div key={idx} className='flex justify-between items-center'>
              <div className='flex flex-col w-11/12 gap-1'>
                <p className='text-[14px] font-bold  leading-tight'>{l.text}</p>
                <p className='text-[#AEAEAE] text-xs'>
                  {formatDate(l.ts * 1000)}
                </p>
              </div>
              {!l?.is_read && (
                <div className='w-[10px] h-[10px] bg-[#DE173E] rounded-full'></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
