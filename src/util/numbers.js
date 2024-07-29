import { Unit } from '@/config/User/setting';

export const formatCredit = (num = 0, showUnit = true) => {
  const formattedCredit = num.toLocaleString('en-PH', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return showUnit ? `${formattedCredit} ${Unit}` : formattedCredit;
};
export const formatCreditWholeNum = (num = 0, showUnit = false) => {
  const formattedCredit = num.toLocaleString('en-PH', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
  return showUnit ? `${formattedCredit} ${Unit}` : formattedCredit;
};

export const getFollowerCount = (num = 0) => {
  return num > 1000 ? `${(num / 1000).toFixed(1)}K` : `${num}`;
};
