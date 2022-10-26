import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = props => {
    return (
        <TouchableOpacity style={{
            backgroundColor: props.color,
            
            paddingVertical: 15,
            marginTop: 35,
            marginHorizontal: 20,
            marginHorizontal: 55,
            paddingHorizontal: 10,
            paddingVertical: 14,
            elevation: 10,
            borderRadius: 10
          }}>
            <Text style={{
            color:'#FFF', textAlign:'center', fontWeight: 'bold', fontSize: 18        
          }}>{props.text}</Text>
          
          </TouchableOpacity>
    );
};

export default Button;