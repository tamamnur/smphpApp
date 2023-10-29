import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: props.bgColor,
        paddingVertical: 15,
        marginTop: 35,
        marginHorizontal: 20,
        marginHorizontal: 55,
        paddingHorizontal: 10,
        paddingVertical: 14,
        elevation: 10,
        borderRadius: 10,
      }}>
      <Text
        style={{
          color: props.fontColor,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
