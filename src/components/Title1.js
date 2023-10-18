import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';

const Title1 = ({TxtTitle, SubTitle}) => {
  return (
    <View>
      <Text style={styles.TxtTitle}>{TxtTitle}</Text>
      {/* <Text style={styles.SubTitle}>{SubTitle}</Text> */}
    </View>
  );
};

export default Title1;
const styles = StyleSheet.create({
  TxtTitle: {
    marginTop: 25,
    marginHorizontal: 30,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: BiruKu,
  },
  SubTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: BiruKu,
  },
});