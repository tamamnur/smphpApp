import { Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Button, Platform, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { BiruKu } from '../utils/constant'
import DateTimePicker from '@react-native-community/datetimepicker'

export const DateClick = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'android');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' +(temDate.getMonth()+1) + '/' + temDate.getFullYear();
    setText(fDate)

    console.log(fDate)
  }

  const showMode = (currentMode) =>{
    setShow(true);
    setMode(currentMode);
  }

  return (
    <View style={{flex: 1,alignItems: 'center', justifyContent:'center'}}>
      <Text>{text}</Text>
      <View style={{margin : 10}}>
        <Button title='Select Date' onPress={() => showMode('date')}/>
      </View>
      {show && (
        <DateTimePicker 
        testID='dateTimePicker'
        value={date}
        mode={mode}
        display='default'
        onChange={onChange}
        />
      )}
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,alignItems: 'center', justifyContent:'center'
  // },

})

{/*

*/}

{/* 
const DateClick = (props) => {
  const [defaultDate, ] = useState
  const [date, setDate] = useState(moment());
  const [show, setShow] = useState(false);
  
  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate));
  }
  const onCancelPress = () => {
    setDate(moment(defaultDate));
    setShow(false);
  } 
  const onClick = (e, selectedDate) => {
    setShow(false);
    if(selectedDate){
      setDate(moment(selectedDate));
      props.onDateChange(selectedDate);
    }
  }
  
  const renderDatePicker = () => {
    return(
      <DatePicker
        timeZoneOffsetInMinutes={0}
        value={new Date(setDate)}
        mode="date"
        minDate={new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))}
        maxDate={new Date(moment().subtract(18, 'years').format('YYYY-MM-DD'))}
        onChange={onClick}
        />
    )
  }
  
  return (
    <TouchableOpacity
        activeOpacity={0}
        onPress={() => setShow(true)}>
        <View>
          <Text style={styles.dateStyle}>{date.format('MMMM Do, YYYY')}</Text>
          <Modal 
          transparent={true}
            // animationType="none"
            visible={show}
            supportedOrientations={['portrait']}
            onRequestClose={()=> setShow(false)}>
              <View style={{flex:1}}>
                <TouchableHighlight
                style={{flex:1,alignItems:'flex-end', flexDirection:'row'}}
                activeOpacity={1}
                visible={show}
                onPress={()=> setShow(false)}>
                  <View
                    underlayColor={'#FFF'}
                    style={{flex:1, borderTopColor: '#E9E9E9', borderTopWidth:1}}
                    onPress={() => console.log('datepicker clicked')}
                    > 

                    <View style={{overflow: 'hidden'}}>
                      <View style={{ marginTop: 20}}>
                        {renderDatePicker}
                      </View>
                      
                    </View>
                  </View>
                </TouchableHighlight>
              </View>

          </Modal>
        </View>
        
        <View style={styles.dateStyle}><Text>
           {DateTimePicker().format('DD - MMM - YYYY')} 
         </Text>
          </View>
          // {moment().format('DD - MMM - YYYY')} 
          // ().format('DD - MMM - YYYY ')}
        </TouchableOpacity>
        )
      };
      
      DateClick.defaultProps ={moment 
}; 

export default DateClick

const styles = StyleSheet.create({
  dateStyle:{
        borderColor: BiruKu,
        borderWidth: 1,
        borderRadius: 5,    
        height: 35,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginVertical: 6,
        width: 240,
        color: '#000'
    }
})
*/}

{/**

export const DateClick= (props) => {
  const [date, setDate] = useState(new Date(moment));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode} 
          onChange={onChange}
        />
      )}
    </View>
  );
};
*/}