import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {BiruKu} from '../utils/constant';

const PanelItemOnForm = ({panelId, panelName, selected, onValueChange, onToggle}) => (
  <View
    style={{
      flexDirection: 'row',
      marginLeft: 20,
      marginTop: 2,
      paddingVertical: -5,
    }}>
    <CheckBox
      tintColors={{true: BiruKu, false: BiruKu}}
      disabled={false}
      value={selected}
      onValueChange={() => onToggle(panelId)}
      // onValueChange={onValueChange}
    />
    <Text
      style={{
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: BiruKu,
        marginVertical: 2,
        marginHorizontal: 2,
        paddingTop: 4,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: BiruKu,
        width: '85%',
      }}>
      {panelName}
    </Text>
  </View>
);

export default PanelItemOnForm;