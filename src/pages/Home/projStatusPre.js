import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {BiruKu} from '../../utils/constant';

const StatusPre = (props) => {
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 9}}>
      <Text style={styles.tableNo}>{props.nomorPanel}</Text>
      <Text style={styles.tablePanelName}>{props.panelName}</Text>
      <Text style={styles.tableStatus}>{props.first}</Text>
      <Text style={styles.tableStatus}>{props.second}</Text>
      <Text style={styles.tableStatus}>{props.third}</Text>
    </View> 
  );
};

export default StatusPre;

const styles = StyleSheet.create({
  tableNo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 2,
    paddingVertical: 5,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 25,
    height: 30,
    textAlign: 'center',
  },
  tablePanelName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 2,
    paddingLeft: 10,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 145,
    height: 30,
    textAlignVertical: 'center',
  },
  tableStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 9,
    marginVertical: 2,
    marginLeft: -1,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 69,
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  TableStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 9,
    marginVertical: 2,
    marginLeft: -1,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 69,
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});