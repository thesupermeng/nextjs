export const formatDate = (date) => {
  if (!date) {
    return '';
  }
  const newDate = new Date(date);
  const day = newDate.getDate();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthIndex = newDate.getMonth();
  const year = newDate.getFullYear();

  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const formattedDate = `${day} ${
    monthNames[monthIndex]
  } ${year} ${hours}:${minutes.toString().padStart(2, '0')}`;
  return formattedDate;
};
