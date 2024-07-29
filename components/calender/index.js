import { IconCalendarWhite } from '@/asset/icons';
import { isWeb } from '@/util/common';
import { formatOnlyDate } from '@/util/date';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useTranslation } from 'next-i18next';

export const CalendarComp = ({ setSelectedDateRange, call = () => {} }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const getDefaultDateRange = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    return [startDate, endDate];
  };
  const [tempDateRange, setTempDateRange] = useState(getDefaultDateRange());
  const [minDate, setMinDate] = useState(new Date());
  const { t } = useTranslation();

  useEffect(() => {
    const onMinDate = () => {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      setMinDate(d);
    };
    onMinDate();
  }, []);
  useEffect(() => {
    setSelectedDateRange(tempDateRange);
  }, [tempDateRange]);

  const formatDate = (date) => {
    const formattedDate = formatOnlyDate(date);
    return `${formattedDate.day} ${formattedDate.monthShort} ${formattedDate.year}`;
  };

  const onDateRangeSelected = (dateRange) => {
    setTempDateRange(dateRange);
  };

  const onCalCancel = () => {
    setShowCalendar(false);
  };

  const onCalConfirm = () => {
    setShowCalendar(!showCalendar);
    call();
  };

  return (
    <>
      {showCalendar && (
        <div
          className={`absolute m-auto left-0 top-0 bottom-0 right-0 z-10 rounded-lg bg-tayaGrey h-fit py-3 w-[350px]`}
        >
          <div>
            <Calendar
              locale='en'
              selectRange={true}
              value={tempDateRange}
              minDate={minDate}
              onChange={onDateRangeSelected}
              className=''
              maxDate={new Date()}
            />
            <div className='h-[10px] w-full'></div>
            <div className='float-right mr-3.5'>
              <button
                className='py-3 px-3.5 opacity-50 mr-[6px]'
                onClick={onCalCancel}
              >
                <p className='text-[#FFFFFF] text-[15px] mx-3'>{t('cancel')}</p>
              </button>
              <button
                className='py-3 px-3.5 tayagradient rounded-md'
                onClick={onCalConfirm}
              >
                <p className='text-[#FFFFFF] text-[15px] mx-3'>
                  {t('confirm')}
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='flex'>
        <div className='flex flex-1'></div>
        <label
          className='cursor-pointer flex py-1 bg-tayaGrey rounded-md px-1 gap-1'
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <Image
            src={IconCalendarWhite}
            alt='calendar'
            width={20}
            height={20}
          />
          <p
            className={`text-[#FFFFFF] font-medium ${
              isWeb() ? 'text-xs' : 'text-[10px]'
            }  my-auto`}
          >
            {formatDate(tempDateRange[0] ?? new Date()) +
              ' - ' +
              formatDate(tempDateRange[1] ?? new Date())}
          </p>
        </label>
      </div>
    </>
  );
};
