import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {BiruKu} from '../utils/constant';
import DateTimePicker from '@react-native-community/datetimepicker';

const PickedDateEdit = props => {
  const [show, setShow] = useState(false);
  const selectDate = props.value === 'Select Date' ? null : new Date(props.value);
  const FormatDate = selected => {
    if (!selected) {return 'Select Date'}
    const monthString = month => {
      const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return monthName[month - 1];
    };
    const day = selected.getDate().toString().padStart(2, '0');
    const month = selected.getMonth() + 1;
    const year = selected.getFullYear();
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return `${day}-${monthString(month)}-${year}`;
    } else {return 'Select Date'}
  };
  const onChange = (event, selected) => {
    setShow(false);
    if (selected) {
      const dateValue = new Date(selected);
      props.onChangeText(dateValue);
    }
  };
  return (
    <View style={{
      marginHorizontal: 10,
      marginVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <View style={{width: '30%'}}>
        <Text style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 14,
          marginVertical: 4,
          padding: 2,
          color: BiruKu,
          height: 32,
          textAlignVertical: 'center',
        }}>Date PO</Text>
      </View>
      <View style={{width: '70%'}}>
        <TouchableOpacity activeOpacity={0} onPress={() => setShow(true)}>
          <Text style={{
            fontFamily: 'Poppins-SemiBoldItalic',
            fontSize: 14,
            borderWidth: 1,
            borderColor: BiruKu,
            borderRadius: 3,
            height: 32,
            paddingVertical: 4,
            paddingHorizontal: 6,
            color: 'orange',
            textAlignVertical: 'center',
          }}>{selectDate ? FormatDate(selectDate) : 'Select Date'}</Text>
        </TouchableOpacity>
        {show ? (<DateTimePicker value={selectDate || new Date()} 
          mode="date" onChange={onChange}/>) : null}
      </View>
    </View>
  );
};

export default PickedDateEdit;