import i18n from 'i18next';

const mthShortName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const addZero = (value) => {
  return value < 10 ? '0' + value : value;
};

export const formatOnlyDate = (value) => {
  const date = new Date(value);

  return {
    year: date.getFullYear(),
    month: addZero(date.getMonth()),
    day: addZero(date.getDate()),
    monthShort: mthShortName[date.getMonth()],
  };
};

export const convertTimeStampToDateTime = (value, format12Hours = false) => {
  if (value.toString().length === 10) {
    value *= 1000;
  }

  const date = new Date(value);

  return {
    year: date.getFullYear(),
    month: addZero(date.getMonth() + 1),
    day: addZero(date.getDate()),
    monthShort: mthShortName[date.getMonth()],
    hours: format12Hours
      ? addZero(date.getHours()) % 12 || 12
      : addZero(date.getHours()),
    minutes: addZero(date.getMinutes()),
    seconds: addZero(date.getSeconds()),
    ampm: date.getHours() >= 12 ? 'pm' : 'am',
  };
};

export const convertTimeStampToDate = (value) => {
  const date = convertTimeStampToDateTime(value);

  return `${date.day} ${date.monthShort} ${date.year}, ${date.hours}:${date.minutes}`;
};

export const convertDateToTimeStamp = (value) => {
  const date = new Date(value);

  return Math.floor(date.getTime() / 1000) * 1000;
};

export const getDurationSince = (st) => {
  const nowTime = new Date();
  const sinceTime = st ? new Date(st) : nowTime;
  const inTotalSec = Math.floor(
    (nowTime.getTime() - sinceTime.getTime()) / 1000
  );
  const hh = Math.floor(inTotalSec / 3600) || 0;
  const ss = inTotalSec % 60;
  const mm = Math.floor((inTotalSec / 60) % 60);
  return [hh, ('0' + mm).slice(-2), ('0' + ss).slice(-2)].join(':');
};
export function formatDateToDash(inputDateStr) {
  const inputDate = new Date(inputDateStr);

  if (isNaN(inputDate)) {
    return i18n.t('invalidDate');
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');
  const seconds = String(inputDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export function formatDateToDashOnly(inputDateStr, seperator = '-') {
  const inputDate = new Date(inputDateStr);

  if (isNaN(inputDate)) {
    return i18n.t('invalidDate');
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');

  return `${year}${seperator}${month}${seperator}${day}`;
}

export const getDefaultDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);

  return [startDate, endDate];
};

export const getCurrentFormattedDateTime = () => {
  const date = new Date();
  const [year, month, day, hour, minutes] = [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
    date.getHours().toString().padStart(2, '0'),
    date.getMinutes().toString().padStart(2, '0'),
  ];

  return `${year}-${month}-${day} ${hour}:${minutes}`;
};

export const formatDateCN = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  const day = date.getDate();

  return `${year}年${month}月${day}日`
}
