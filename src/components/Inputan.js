import { Text, View, StyleSheet, StatusBar, TextInput, SliderBase, SliderComponent } from 'react-native'
import React from 'react';
import { BiruKu } from '../utils/constant';

const Inputan = ({label}) => {
        return(
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
                <TextInput style={styles.txtInput}/>
          </View>
        );
      };

export default Inputan;

const styles=StyleSheet.create({
  container:{
    justifyContent: 'flex-end',    
    flexDirection: 'row',
  },
  label:{
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: BiruKu,
    textAlignVertical: 'center'
  },
  txtInput:{
    borderWidth: 1,
    borderColor: BiruKu,
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    paddingLeft: 15,
    paddingBottom: 2,
    borderRadius: 5,
    height: 30,
    width: 250,
    textAlignVertical: 'bottom'
  }
});