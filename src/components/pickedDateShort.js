import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {BiruKu} from '../utils/constant';


const PickedDateShort = props => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState('Select Date');

  const onChange = (event, selectedDate) => {
    const FormatDate = date => {
        console.log(event(FormatDate));
      
        const monthString = month => {
          const monthName = [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des', ];
          return monthName[month - 1];
        };
        const getMonth = date.getMonth() + 1;
        const month = monthString(getMonth);
    
        return event.getDate() + '-' + month + '-' + event.getFullYear();
    };
    // setDate(selectedDate)
    const dateValue = FormatDate(selectedDate);
    setSelectDate(dateValue);
    setShow(false);
    props.onChangeText(dateValue);
    // const dateValue = event.getDate()+'-'+(event.getMonth()+1)+'-'+event.getFullYear();
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <TouchableOpacity activeOpacity={0} onPress={() => setShow(true)}>
        <Text
          style={{color: 'black', fontSize: 21, marginTop: 5, marginLeft: 8}}>
          {selectDate}
        </Text>
      </TouchableOpacity>
      {show ? (
        <DateTimePicker value={date} mode="date" onChange={onChange} />
      ) : null}
    </View>
  );
};

export default PickedDateShort;
