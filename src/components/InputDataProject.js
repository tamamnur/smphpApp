import {Text, View, StyleSheet, TextInput, Dimensions} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';

const InputDataProject = props => {
  const {width} = Dimensions.get('window');
  const containerWidth = width * 0.85;
  const labelWidth = containerWidth * 0.23;
  const inputWidth = containerWidth * 0.75;
  return (
    <View style={[styles.container, {width: containerWidth}]}>
      <Text style={[styles.label, {width: labelWidth}]}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={[styles.txtInput, {width: inputWidth}]}
        onChangeText={props.onChangeText}
        value={props.value}
        ref={props.ref}
        key={props.key}
      />
    </View>
  );
};

export default InputDataProject;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
    textAlignVertical: 'center',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: BiruKu,
    color: 'blue',
    borderRadius: 5,
    height: 35,
    padding: 5,
    fontSize: 13,
    fontFamily: 'Poppins-MediumItalic'
  },
});