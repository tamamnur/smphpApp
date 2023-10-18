import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React,{useState}  from 'react';

const InputDataUserPassword = (props) => {
  const [text, setText] = useState
  const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry || false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      {text === '' && (
        <Text style={styles.placeholder}>{props.placeholder}</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(inputText) => {
            setText(inputText);
            if (props.onChangeText) {
              props.onChangeText(inputText);
            }
          }}
          placeholder=""
          placeholderTextColor={'gray'}
          secureTextEntry={secureTextEntry}
          style={styles.txtInput}
          value={props.value}
        />
        {props.secureTextEntryToggle && (
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.toggleButton}>
            <Text>{secureTextEntry ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: '90%',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    color: 'blue', // Sesuaikan dengan warna yang Anda inginkan
    width: '100%',
  },
  placeholder: {
    fontFamily: 'Poppins-Italic',
    color: 'gray',
    marginTop: 5, // Sesuaikan sesuai kebutuhan Anda
    textAlign: 'left', // Gaya ini akan membuat teks rata kiri
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  txtInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue', // Sesuaikan dengan warna yang Anda inginkan
    color: 'blue', // Sesuaikan dengan warna yang Anda inginkan
    padding: 8,
    fontFamily: 'Poppins-Regular', // Ganti dengan 'Poppins-Regular' jika tidak ingin italic ketika ada teks
    marginBottom: 5,
    borderRadius: 5,
    height: 40,
  },
  toggleButton: {
    marginLeft: 10,
    padding: 5,
  },
});

export default InputDataUserPassword;