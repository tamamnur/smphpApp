const FormatDate = date => {
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
  // const day = ('0'+ date.getDate()).slice(-2);
  return day + '-' + month + '-' + date.getFullYear();
};
export default FormatDate;
