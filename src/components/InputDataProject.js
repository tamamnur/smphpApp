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
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    marginBottom:5,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'right'    
  },
  txtInput:{
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 5,    
    height: 35,
    padding: 10,
    marginVertical: 8,
    width: 240,
    marginHorizontal: 10,
    width: 250,
  }
});