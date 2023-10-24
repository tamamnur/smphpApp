import {Text, View, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {BiruKu} from '../utils/constant';
import { Icon } from 'react-native-vector-icons/Octicons';

const InfoDataUser = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <Text style={styles.txtInput}>{props.value}</Text>
    </View>
  );
};

export default InfoDataUser;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: '90%',
    alignContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    marginBottom: 10,
    color: BiruKu,
    width: '100%',
  },
  txtInput: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: BiruKu,
    color: BiruKu,
    padding: 8,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
    borderRadius: 5,
    height: 40,
    width: '90%',
  }
});
