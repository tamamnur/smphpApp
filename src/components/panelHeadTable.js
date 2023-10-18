import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';

const PanelHeadTable = () => {
  return (
    <View style={styles.wrappHead}>
      <Text style={styles.headProject}>Project Name</Text>
      <Text style={styles.headPanel}>Panel Name</Text>
      <Text style={styles.headUpdate}>Update</Text>
    </View>
  );
};

export default PanelHeadTable;

const styles = StyleSheet.create({
  wrappHead: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 2,
    borderColor: BiruKu,
    borderBottomWidth: 1,
  },
  headProject: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: -1,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: '30%',
  },
  headPanel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: -1,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: '40%',
  },
  headUpdate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: '30%',
  },
});