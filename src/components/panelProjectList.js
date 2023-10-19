import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../utils/constant';

const PanelProjectList = props => {
  const navigation = useNavigation();
  return (
    <View
      style={{flexDirection: 'row', marginHorizontal: 7, marginBottom: -1}}>
      <Text style={styles.projectName}>{props.projectName}</Text>
      <Text style={styles.panelName}>{props.panelName}</Text>
      <Text style={styles.status}>{props.status}</Text>
    </View>
  );
};
export default PanelProjectList;

const styles = StyleSheet.create({
  projectName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: BiruKu,
    textAlignVertical: 'center',
    paddingLeft: 8,
    marginRight: -1,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 28,
    width: '30%'
  },
  panelName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: BiruKu,
    textAlignVertical: 'center',
    paddingLeft: 8,
    marginRight: -1,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 28,
    width: '40%'
  },
  status: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: BiruKu,
    height: 28,
    width: '30%'
  },
});