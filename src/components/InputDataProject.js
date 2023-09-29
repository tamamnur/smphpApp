import {Text, View, StyleSheet, TextInput, Dimensions} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';

const InputDataProject = props => {
  const {width} = Dimensions.get('screen');
  const containerWidth = width * 0.9;
  const labelWidth = containerWidth * 0.2;
  const inputWidth = containerWidth * 0.8;
  return (
    <View style={[styles.container, {width: containerWidth}]}>
      <Text style={[styles.label, {width: labelWidth}]}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={[styles.txtInput, {width: inputWidth}]}
        onChangeText={props.onChangeText}
        value={props.value}
        ref={props.ref}
      />
    </View>
  );
};

export default InputDataProject;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
    color: BiruKu,
    textAlignVertical: 'center',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: BiruKu,
    color: BiruKu,
    borderRadius: 5,
    height: 35,
    padding: 10,
    marginVertical: 5,
    fontSize: 15,
  },
});