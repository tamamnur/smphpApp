import {Text, View, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {BiruKu} from '../utils/constant';
import { Icon } from 'react-native-vector-icons/Octicons';

const InputDataSign = props => {
  const [text, setText] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry || false)
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      {text === '' ? (
        <Text style={styles.placeholder}>{props.placeholder}</Text>
      ) : null}
      <TextInput
        onChangeText={inputText => {
          setText(inputText);
          if (props.onChangeText) {
            props.onChangeText(inputText);
          }
        }}
        // placeholder={props.placeholder}
        placeholder=""
        placeholderTextColor={'gray'}
        secureTextEntry={props.secureTextEntry}
        style={styles.txtInput}
        value={props.value}
      />
    </View>
  );
};

export default InputDataSign;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: '90%',
    // flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
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
  },
  placeholder: {
    fontFamily: 'Poppins-Italic',
    alignSelf: 'flex-start',
    marginTop: -32,
    // marginBottom: -20,
    marginHorizontal: 30,
    width: '87%',
    color: 'gray',
    top: 33,
    // borderWidth: 1
  },
});
