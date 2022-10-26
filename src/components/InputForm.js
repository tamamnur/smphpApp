import { Text, View, ScrollView, Image, StatusBar, TextInput, SliderBase, SliderComponent } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { BiruKu } from '../utils/constant';

const InputForm = props => {
    return(
        <View>
            
            <Text style={{fontWeight: 'bold', color: BiruKu}}>
            {props.text}</Text>

            <TextInput value={props.email} 
          style={{backgroundColor: '#EDEDED', 
          borderRadius:5,
          borderWidth: 1.5,
          borderColor: BiruKu,
          marginHorizontal: 35,
          marginTop: -20,
          paddingHorizontal: 15,
          paddingVertical: 8,
          elevation: 9,
          fontSize: 12
        }}
          onChangeTect ={text => props.setEmail(text)}
          secureTextEntry={props.secureTextEntry}
          />  
        </View>

    );
}

export default FormInput;