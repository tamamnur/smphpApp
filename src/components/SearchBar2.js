import React from 'react';
import {View, TextInput} from 'react-native';
import {BiruKu} from '../utils/constant';

const SearchBar2 = ({value, onChangeText, placeholder}) => {
  return (
    <View>
      <TextInput
        // placeholder="Search by project or customer name..."
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        value={value}
        onChangeText={onChangeText}
        style={{
          borderWidth: 2,
          borderColor: BiruKu,
          borderRadius: 16,
          backgroundColor: '#F7F7F8',
          paddingHorizontal: 12,
          paddingVertical: 1.5,
          marginHorizontal: 15,
          marginBottom: 3,
          height: 43,
          color: BiruKu,
          fontFamily: 'Poppins-Medium',
          fontSize: 15.5,
        }}
      />
    </View>
  );
};

export default SearchBar2;