import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BiruKu } from '../utils/constant';

const PickedDateFull = props => {
  const [date] = useState(new Date());
  const [selectDate, setSelectDate] = useState('Select Date');
  const [show, setShow] = useState(false);

  const FormatDate = selected => {
    const monthString = month => {
      const monthName = 
      [ 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return monthName[month-1];
    }
    const day = selected.getDate().toString().padStart(2,'0');
    return day+'-'+monthString(selected.getMonth()+1)+'-'+selected.getFullYear();
  }
  const onChange = (event, selected) => {
    if (selected) {
      const dateValue = FormatDate(selected);
      setSelectDate(dateValue);
      setShow(false);
      props.onChangeText(selected);   
    } else {
      setShow(false);
    }
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <TouchableOpacity activeOpacity={0} onPress={() => setShow(true)}>
        <Text
          style={{color: BiruKu, fontSize: 16, marginTop: 2}}>
          {selectDate}
        </Text>
      </TouchableOpacity>
      {show ? <DateTimePicker value={date} mode="date" onChange={onChange} /> : null}
    </View>
  );
};

export default PickedDateFull;