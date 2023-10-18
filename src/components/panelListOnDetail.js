import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../utils/constant';

const PanelListOnDetail = props => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 20, borderWidth: 0}}>
      <Text style={styles.pnomor}>{props.pnomor}</Text>
      <Text style={styles.pname}>{props.pname}</Text>
    </View>
  );
};
export default PanelListOnDetail;

const styles = StyleSheet.create({
  pname: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    marginVertical: 2,
    marginHorizontal: 2,
    paddingTop: 2,
    paddingLeft: 10,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: '90%',
  },
  pnomor: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    paddingTop: 2,
    marginVertical: 2,
    // marginLeft: 20,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 30,
    textAlign: 'center',
  },
});
