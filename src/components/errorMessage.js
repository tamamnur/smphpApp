import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ErrorMessage = (props) => {
  return (
    <View style={{marginHorizontal: 25}}>
        <Text style={{color: 'red', fontSize: 14, textAlign: 'center', marginBottom: -15}}>
        {props.txt}
        </Text>
    </View>
  );
};

export default ErrorMessage;