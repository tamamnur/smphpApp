import {Text, View, StyleSheet,} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';

const Title2 = ({TxtTitle, SubTitle}) => {
  return (
    <View>
      <Text style={styles.TxtTitle}>{TxtTitle}</Text>
      <Text style={styles.SubTitle}>{SubTitle}</Text>
    </View>
  );
};

export default Title2;

const styles = StyleSheet.create({
  TxtTitle: {
    marginTop: 25,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: BiruKu,
  },
  SubTitle: {
    marginBottom: 8,
    marginTop: -5,
    textAlign: 'center',
    fontFamily: 'Poppins-MediumItalic',
    fontSize: 15,
    color: BiruKu,
  },
});