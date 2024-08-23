import {Text, View, StyleSheet,} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';
import { BigTitle, subTitle, title } from '../utils/fontStyles';

const Title2 = ({TxtTitle, SubTitle}) => {
  return (
    <View style={{marginBottom: 8}}>
      <Text style={title}>{TxtTitle}</Text>
      <Text style={title}>{SubTitle}</Text>
    </View>
  );
};

export default Title2;