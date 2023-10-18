import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';

const InfoProjectL = props => {
  return (
    <View style={styles.container}>
      <View style={{width: '29%'}}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={{width: '66%'}}>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    </View>
  );
};

export default InfoProjectL;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    padding: 10,
    color: BiruKu,
    height: 45,
    textAlignVertical: 'center',
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    paddingLeft: 10,
    textAlignVertical: 'center',
    borderWidth: 1.5,
    borderColor: BiruKu,
    borderRadius: 5,
    height: 45,
    color: BiruKu,
  },
});