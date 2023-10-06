import React from 'react';
import {View, TextInput} from 'react-native';
import {BiruKu} from '../utils/constant';

const SearchBar = ({value, onChangeText}) => {
  return (
    <View>
      <TextInput
        placeholder="Search by project or panel name..."
        placeholderTextColor={'grey'}
        value={value}
        onChangeText={onChangeText}
        style={{
          borderWidth: 1,
          borderColor: BiruKu,
          borderRadius: 6,
          backgroundColor: '#F7F7F8',
          paddingHorizontal: 8,
          paddingVertical: 1,
          marginHorizontal: 15,
          marginBottom: 5,
          height: 35,
          color: BiruKu,
          fontFamily: 'Poppins-Medium',
          fontSize: 13,
        }}
      />
    </View>
  );
};

export default SearchBar;