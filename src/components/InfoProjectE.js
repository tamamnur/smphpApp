import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';
// const {width} = Dimensions.get('window');

const InfoProjectT = props => {
  return (
    <View style={styles.container}>
      <View style={{width: '30%'}}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={{width: '70%'}}>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    </View>
  );
};

export default InfoProjectT;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
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
    color: BiruKu,
    textAlignVertical: 'center',
  },
});
