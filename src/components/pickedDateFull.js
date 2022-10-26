import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment/moment'
import { IconCalendar } from '../assets'

const PickedDateFull = (props) => {
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
    <View>
        <TouchableOpacity
            activeOpacity={0}
            onPress={()=> setShow(true)}
            >
            <Text style={{color: '#000'}}>{date.format("DD-MMMM-YYYY")}</Text>
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
                                minDate={new Date(moment().subtract(120, 'years').format('DD-MMM-YYYY'))}
                                maxDate={new Date(moment().subtract(80, 'years').format('DD-MMM-YYYY'))}
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

export default PickedDateFull

const styles = StyleSheet.create({})