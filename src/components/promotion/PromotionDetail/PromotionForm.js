import { IconCalendar } from '@/asset/icons';
import DropZoneH5 from '@/components/fileDropzone/DropZoneH5';
import DropZoneWeb from '@/components/fileDropzone/DropZoneWeb';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useTranslation } from 'next-i18next';
import { isWeb } from '@/util/common';
import { formatDateToDashOnly } from '@/util/date';

export const PromotionForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    depositDate: '',
    depositAmount: '',
    orderId: '',
    receivedFiles: [],
  });
  const [maxDate, setMaxDate] = useState(false);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const { t } = useTranslation();

  const handleInputChange = useCallback((field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  }, []);

  const onCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const onCalendarSelected = (value) => {
    const dateFormat = formatDateToDashOnly(value);
    handleInputChange('depositDate', dateFormat);
    setShowCalendar(false);
  };

  useEffect(() => {
    const d = new Date();
    setMaxDate(d);
  }, []);

  return (
    <>
      <InputField
        field={'username'}
        handleInputChange={handleInputChange}
        placeholder='username if login?'
        value={formData.username}
      />

      <InputDateField
        maxDate={maxDate}
        onCalendarClick={onCalendarClick}
        onCalendarSelected={onCalendarSelected}
        placeholder='deposit date'
        showCalendar={showCalendar}
        value={formData.depositDate}
      />

      <InputField
        field={'depositAmount'}
        handleInputChange={handleInputChange}
        placeholder='deposit amount'
        value={formData.depositAmount}
      />

      <InputField
        field={'orderId'}
        handleInputChange={handleInputChange}
        placeholder='order id'
        value={formData.orderId}
      />

      <div>Upload a clear screenshot of deposit transaction screen.</div>

      {isWeb() ? (
        <DropZoneWeb
          setReceivedFiles={setReceivedFiles}
          maxFiles={2}
          receivedFiles={receivedFiles}
        />
      ) : (
        <DropZoneH5
          setReceivedFiles={setReceivedFiles}
          maxFiles={2}
          receivedFiles={receivedFiles}
        />
      )}

      <div className='text-[#D8BA92] text-xs'>
        *To confirm your identification, please upload clear and readable
        screenshot.
      </div>
    </>
  );
};

const INPUT_FIELD_CLS = 'relative mb-3.5';
const INPUT_CLS = 'bg-tayaGrey h-full w-full outline-none p-3 rounded-lg';

const InputField = ({ field, handleInputChange, placeholder, value }) => {
  return (
    <div className={INPUT_FIELD_CLS}>
      <input
        className={INPUT_CLS}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        type='text'
        value={value}
      />
    </div>
  );
};

const InputDateField = ({
  maxDate,
  onCalendarClick,
  onCalendarSelected,
  placeholder,
  showCalendar,
  value,
}) => {
  return (
    <div className='relative'>
      <div
        className={`cursor-pointer ${INPUT_FIELD_CLS}`}
        onClick={onCalendarClick}
      >
        <input
          className={`pointer-events-none ${INPUT_CLS}`}
          defaultValue={value}
          placeholder={placeholder}
          type='text'
        />
        <Image
          alt='calendar'
          className='absolute top-2/4 -translate-y-2/4 right-2'
          src={IconCalendar}
        />
      </div>

      {showCalendar && (
        <div
          className={`absolute h-[390px] w-[350px] m-auto z-10 left-0 right-0 top-[100%]`}
        >
          <Calendar
            defaultActiveStartDate={maxDate}
            locale='en'
            maxDate={maxDate}
            onChange={onCalendarSelected}
            value={value}
          />
        </div>
      )}
    </div>
  );
};
