import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment/moment'

const PickedDateFull = (props) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
        props.onChangeText(selectedDate)
        setShow(false);
        // console.log(selectedDate)
    };

  return (
    <View>
        <TouchableOpacity
            // activeOpacity={5}
            onPress={()=> setShow(true)}
            >
            <Text style={{color: '#000'}}>{moment(date).format("DD-MMMM-YYYY")}</Text>
        </TouchableOpacity>

        {
            show ? (
                <DateTimePicker
                    value={date} 
                    mode='date'
                    onChange={onChange}
                    />
            ) : null
        }
    </View>
  )
}

export default PickedDateFull

const styles = StyleSheet.create({})