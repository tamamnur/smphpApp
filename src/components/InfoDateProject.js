import {StyleSheet, Text, TextInput, View} from 'react-native';
import PickedDateFull from './pickedDateFull';
import React from 'react';
import {BiruKu} from '../utils/constant';

const InfoDateProject = ({label, onChangeText, onDateChange}) => {
  const handleDateChange = (value) => {

  }
  return (
    <View style={styles.container}>
      <View style={{width: '30%'}}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={{width: '70%'}}>
        {/* <Text style={styles.value} onChangeText={onChangeText}> */}
        <Text style={styles.value}>
          <PickedDateFull onChangeText={onDateChange} />
        </Text>
      </View>
    </View>
  );
};

export default InfoDateProject;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginVertical: 4,
    padding: 2,
    color: BiruKu,
    height: 40,
    textAlignVertical: 'center',
  },
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 3,
    height: 40,
    paddingVertical: 4,
    paddingHorizontal: 6,
    color: BiruKu,
    textAlignVertical: 'center',
  },
});