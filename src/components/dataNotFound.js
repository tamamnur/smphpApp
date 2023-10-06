import {Text, View} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';

const DataNotFound = () => {
  return (
    <View><Text
       style={{
          fontFamily: 'Poppins-Italic', fontSize: 14,
          textAlign: 'center', marginHorizontal: 7,
          paddingVertical: 50, color: BiruKu,
          borderColor: BiruKu, borderWidth: 1, 
        }}>
        No matching result found.
    </Text></View>
  );
};

export default DataNotFound;