import { StyleSheet, View, Text } from 'react-native'
import React, { Component } from 'react'
// import DatePicker from 'react-native-date-picker'
import { BiruKu } from '../utils/constant';

export class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {date : new Date()};
    }
  render() {
    return (
      <View style={styles.dateSty}>
        <Text style={styles.DateKlik}>
        {/* <DatePicker  
        date={this.state.date}
        mode="date"
        fontSize={8}
        height={30}
        textColor={BiruKu}
        onDateChange={(date) => this.setState({date})}
        />
        */}
        </Text>
      </View>
    )
  }
}

export default DateInput

const styles = StyleSheet.create({
    dateSty:{fontSize: 8, alignItems: 'flex-end'},
    DateKlik:{
        fontFamily: 'Poppins-Regular',
        fontSize: 8
    }
})