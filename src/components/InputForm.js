import {Text, View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';

const InputForm = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{props.label} </Text>
      </View>
      <View>
        <TextInput
          style={styles.style_values}
          onChangeText={props.onChangeText}
        />
      </View>
    </View>
  );
};

export default InputForm;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    marginBottom: 13,
    padding: 10,
    color: BiruKu
  },
  style_values: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: BiruKu,
    borderRadius: 5,
    marginBottom: 15,
    height: 45,
    width: 230,
    padding: 10,
    color: BiruKu  },
});