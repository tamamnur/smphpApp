import { Text, View, StyleSheet, StatusBar, TextInput, SliderBase, SliderComponent } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { BiruKu } from '../utils/constant';

const InputDataProject = ({label, placeholder}) => {
  
        return(
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
                <TextInput placeholder={placeholder}style={styles.txtInput}/>
          </View>
        );
      };

export default InputDataProject;

const styles=StyleSheet.create({
  container:{
    justifyContent: 'flex-end',    
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  label:{
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginBottom:5,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'right'    
  },
  txtInput:{
    borderWidth: 1.5,
    borderColor: BiruKu,
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 12,
    padding: 15,
    borderRadius: 5,
    height: 45,
    width: 256,
    alignItems: 'flex-end'
  }
});