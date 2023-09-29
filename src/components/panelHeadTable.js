import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { BiruKu } from '../utils/constant';
const width = Dimensions.get('window').width
const PanelHeadTable = () => {
  return (
    <View style={styles.wrappHead}>
      <Text style={styles.headProjectPanel}>Project Name</Text>
      <Text style={styles.headProjectPanel}>Panel Name</Text>
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
      headProjectPanel: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        color: BiruKu,
        textAlignVertical: 'center',
        textAlign: 'center',
        marginRight: -1,
        borderWidth: 1,
        borderColor: BiruKu,
        height: 30,
        width: width*0.365
      },
      headUpdate: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        color: BiruKu,
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingHorizontal: 2,
        borderWidth: 1,
        borderColor: BiruKu,
        height: 30,
        width: width*.2,
      },
    
});