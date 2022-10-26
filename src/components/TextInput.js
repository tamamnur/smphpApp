import { Text, View, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { BiruKu } from '../utils/constant';

const InputData = ({label, placeholder, secureTextEntry}) => {
  
        return(
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput placeholder={placeholder} secureTextEntry={secureTextEntry}
              style={styles.txtInput}/>
          </View>
        );
      };

export default InputData;

const styles=StyleSheet.create({
  container:{
    marginHorizontal: 35
  },
  label:{
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom:5,
    color: BiruKu
  },
  txtInput:{
    borderWidth: 1.5,
    borderColor: BiruKu,
    padding: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginBottom: 15,
    borderRadius: 5,
    height: 45
  }
});