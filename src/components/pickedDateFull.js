import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment, {now} from 'moment/moment';

const PickedDateFull = props => {
  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState('Select Date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    props.onChangeText(selectedDate);
    setShow(false);
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <TouchableOpacity activeOpacity={0} onPress={() => setShow(true)}>
        <Text style={{color: '#000'}}>
          {setDate}
          {/* {moment(date).format('DD-MMM-YYYY')} */}
        </Text>
      </TouchableOpacity>

      {show ? (
        <DateTimePicker value={date} mode="date" onChange={onChange} />
      ) : null}
    </View>
  );
};

export default PickedDateFull;

const styles = StyleSheet.create({});