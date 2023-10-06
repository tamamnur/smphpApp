import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';
const {width} = Dimensions.get('window');

const InfoProject = props => {
  return (
    <View style={styles.container}>
      <View style={{width: width * 0.23}}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={{width: width * 0.7}}>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    </View>
  );
};

export default InfoProject;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 4,
    padding: 2,
    color: BiruKu,
    height: 25,
    textAlignVertical: 'center',
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 2,
    height: 25,
    padding: 2,
    paddingHorizontal: 5,
    color: BiruKu,
    textAlignVertical: 'center',
  },
});
