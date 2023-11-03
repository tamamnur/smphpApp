import React from 'react';
import {View, TextInput} from 'react-native';
import {BiruKu} from '../utils/constant';

const SearchBarOnStatus = ({value, onChangeText}) => {
  return (
    <View>
      <TextInput
        placeholder="Search by panel name..."
        placeholderTextColor={'grey'}
        value={value}
        onChangeText={onChangeText}
        style={{
          borderBottomWidth:1,
          borderColor: BiruKu,
          backgroundColor: '#F7F7F8',
          paddingBottom: -3,
          marginHorizontal: 15,
          marginBottom: 3,
          height: 30,
          color: BiruKu,
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
        }}
      />
    </View>
  );
};

export default SearchBarOnStatus;