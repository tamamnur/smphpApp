import { Text, View, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { BiruKu } from '../utils/constant';

const InputData = (props) => {
  // const InputData = ({label, placeholder, secureTextEntry}) => {
  
        return(
          <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
              value={props.value}
              onChangeText={props.onChangeText}
              placeholder={props.placeholder} 
              secureTextEntry={props.secureTextEntry}
              style={styles.txtInput}/>
          </View>
        );
      };

export default InputData;

const styles=StyleSheet.create({
  container:{
    marginHorizontal: 50,
    width: 296,
    flex: 1,
    alignContent: 'center'
  },
  label:{
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginTop:10,
    color: BiruKu
  },
  txtInput:{
    borderWidth: 1,
    borderColor: BiruKu,
    padding: 10,
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
    borderRadius: 5,
    height: 40
  }
});