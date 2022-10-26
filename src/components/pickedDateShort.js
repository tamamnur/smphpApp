import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment/moment'
import { IconCalendar } from '../assets'

const PickedDateShort = (props) => {
    const [date, setDate] = useState(moment);
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(moment(selectedDate));
    };

    const showMode = (currentMode) => {
        setMode(currentMode);
        setShow(false);
        // if (Platform.OS === 'android') {
        // }
    };

    const showDatePicker = () => {
        showMode('date');
    };


  return (
    <View style={{alignSelf: 'center'}}>
        <TouchableOpacity
            activeOpacity={0}
            onPress={()=> setShow(true)}
            >
            <Text style={{color: '#000', alignSelf: 'center'}}>
                {date.format("DD-MM-YYYY")}
                </Text>
            <Modal
                transparent={true}
                animationType='slide'
                visible={show}
                supportedOrientations={['portrait']}
                onRequestClose={() => setShow(false)}
                >
                    <View style={{flex: 1}}>
                        <TouchableOpacity
                        style={{ flex:1, alignItems: 'flex-end', flexDirection: 'row'}} 
                        activeOpacity={1} visible={show} 
                        onPress ={() => setShow(false)}
                        >
                            <View
                            style={{ marginTop: 20}} >
                                <DateTimePicker
                                timeZoneOffsetInMinutes={0}
                                value={new Date(date)} mode='date'
                                minDate={new Date(moment().subtract(120, 'years').format('DD-MM-YYYY'))}
                                maxDate={new Date(moment().subtract(80, 'years').format('DD-MM-YYYY'))}
                                onChange={onChange}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
            </Modal>
        </TouchableOpacity>
    </View>
  )
}

export default PickedDateShort

const styles = StyleSheet.create({})