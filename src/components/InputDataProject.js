import { Text, View, StyleSheet, StatusBar, TextInput, SliderBase, SliderComponent } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { BiruKu } from '../utils/constant';

// const InputDataProject = ({label, placeholder}) => {
  const InputDataProject = (props) => {
        return(
          <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
                <TextInput placeholder={props.placeholder}style={styles.txtInput}
                onChangeText={props.onChangeText}
                value={props.value}
                ref={props.ref}
                />
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
    fontSize: 14,
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
    marginHorizontal: 10,
    width: 250,
    fontSize: 15
  }
});