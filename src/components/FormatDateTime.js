const FormatDateTime = timestamp => {
  if (timestamp) {
    const date = new Date(timestamp);
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = dayName[date.getDay()];
    const monthString = month => {
      const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 
      'Jun', 'Jul','Ags', 'Sep', 'Okt', 'Nov', 'Des'];
      return monthName[month - 1];
    };
    const getMonth = date.getMonth() + 1;
    const month = monthString(getMonth);
    const dates = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2)
    return `${days}, ${dates} ${month} ${year} at ${hour}:${minute}`;
  } else {return 'N/A'}
};
export default FormatDateTime;
