import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {BiruKu, Ral11} from '../utils/constant';

const InfoProjectInput = props => {
  return (
    <View style={styles.container}>
      <View style={{width: '30%'}}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={{width: '70%'}}>
        <TextInput
          style={styles.value}
          value={props.value}
          onChangeText={props.onChangeText}
          ref={props.ref}
        />
      </View>
    </View>
  );
};

export default InfoProjectInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
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