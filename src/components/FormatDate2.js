const FormatDate2 = date => {
  const monthString = month => {
    const monthName = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Ags',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];
    return monthName[month - 1];
  };
  const getMonth = date.getMonth() + 1;
  const month = monthString(getMonth);
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2)
  return day + '-' + month + '-' + year;
};
export default FormatDate2;
