import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BiruKu} from '../utils/constant';

export const HeadPO = () => {
  return (
    <View style={styles.wrappHead}>
      <Text style={styles.headProject}>Project Name</Text>
      <Text style={styles.headPanel}>Panel Name</Text>
      <Text style={styles.headStatus}>Order</Text>
      <Text style={styles.headStatus}>Schedule</Text>
      <Text style={styles.headStatus}>Realized</Text>
    </View>
  );
};

export const HeadSD = () => {
  return (
    <View style={styles.wrappHead}>
      <Text style={styles.headProject}>Project Name</Text>
      <Text style={styles.headPanel}>Panel Name</Text>
      <Text style={styles.headStatus}>Submit</Text>
      <Text style={styles.headStatus}>Revisi</Text>
      <Text style={styles.headStatus}>Approve</Text>
    </View>
  );
};

export const HeadFA = () => {
  return (
    <View style={styles.wrappHead}>
      <Text style={[styles.headProject, {width: '28%'}]}>Project Name</Text>
      <Text style={[styles.headProject, {width: '32%'}]}>Panel Name</Text>
      <Text style={[styles.headStatus,{width: '20%'}]}>Start</Text>
      <Text style={[styles.headStatus,{width: '22%'}]}>Finish</Text>
    </View>
  );
};

export const HeadEnd = () => {
  return (
    <View style={styles.wrappHead}>
      <Text style={[styles.headProject, {width: '28%'}]}>Project Name</Text>
      <Text style={[styles.headProject, {width: '32%'}]}>Panel Name</Text>
      <Text style={[styles.headStatus,{width: '20%'}]}>Tested</Text>
      <Text style={[styles.headStatus,{width: '21%'}]}>Delivery</Text>
    </View>
  );
};
const height = Dimensions.get('window').height
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
    fontSize: height*.015,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: -1,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: '25%',
  },
  headPanel: {
    fontFamily: 'Poppins-Medium',
    fontSize: height*.015,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: -1,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: '29%',
  },
  headStatus: {
    fontFamily: 'Poppins-Medium',
    // fontSize: 13,
    fontSize: height*.0135,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: 2,
    marginRight: -1,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: '16%',
  },
});