import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';

const InfoProject = props => {
  return (
    <View style={styles.container}>
      <View style={{width: '26%'}}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={{width: '74%'}}>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    </View>
  );
};

export default InfoProject;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    padding: 2,
    color: BiruKu,
    height: 33,
    textAlignVertical: 'center',
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 3,
    height: 33,
    paddingHorizontal: 5,
    paddingTop: 2,
    color: BiruKu,
    textAlignVertical: 'center',
  },
});