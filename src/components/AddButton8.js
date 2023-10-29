import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BiruKu, bgSoft} from '../utils/constant';
const AddButton8 = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: bgSoft,
      }}>
      <View><Icon name="plus-circle-outline" size={35} color={BiruKu} /></View>
      <View><Text
        style={{
          color: BiruKu,
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          paddingLeft: 10,
        }}>
        {props.text}
      </Text></View>
    </TouchableOpacity>
  );
};

export default AddButton8;
