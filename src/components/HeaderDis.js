import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {IconBack, LogoSmpHP} from '../assets';
import {useNavigation} from '@react-navigation/native';
const HeaderD = () => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
      <TouchableOpacity onPress={() => navigation.replace('Discover')}>
      <View style={{marginTop: 22, marginHorizontal: 20}}>
        <IconBack  />
      </View>
      </TouchableOpacity>
      <View style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 10}}>
        <LogoSmpHP />
      </View>
    </View>
  );
};

export default HeaderD;
