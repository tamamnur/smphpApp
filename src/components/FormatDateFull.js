const FormatDateFull = date => {
  const monthString = month => {
    const monthName = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return monthName[month - 1];
  };
  const getMonth = date.getMonth() + 1;
  const month = monthString(getMonth);
  const day = date.getDate().toString().padStart(2, '0');
  return day + '-' + month + '-' + date.getFullYear();
};
export default FormatDateFull;
