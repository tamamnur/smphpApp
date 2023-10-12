import {Text, TouchableOpacity, View, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BiruKu, Darkred } from '../utils/constant';
const {width} = Dimensions.get('window');

const PickedDateEdit = (props) => {
  const [date] = useState(new Date());
  const [selectDate, setSelectDate] = useState(props.value);
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
    <View style={styles.container}>
    <View style={{width: width * 0.3}}>
      <Text style={styles.label}>Date PO</Text>
    </View>
    <View style={{width: width * 0.63}}>
    <TouchableOpacity activeOpacity={0} onPress={() => setShow(true)}>
      <Text style={styles.value}>{selectDate}</Text>
    </TouchableOpacity>
    {show ? <DateTimePicker value={date} mode="date" onChange={onChange} /> : null}
    </View>  
  </View>
  );
};

export default PickedDateEdit;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginVertical: 4,
    padding: 2,
    color: BiruKu,
    height: 32,
    textAlignVertical: 'center',
  },
  value: {
    fontFamily: 'Poppins-SemiBoldItalic',
    fontSize: 14,
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 3,
    height: 32,
    paddingVertical: 4,
    paddingHorizontal: 6,
    color: 'blue',
    textAlignVertical: 'center',
  },
})