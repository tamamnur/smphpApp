import React from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../utils/constant';
const width = Dimensions.get('window').width
const PanelProjectList = props => {
  const navigation = useNavigation();
  return (
    <View
      style={{flexDirection: 'row', marginHorizontal: 7, marginBottom: -1}}>
      <Text style={styles.panelProject}>{props.projectName}</Text>
      <Text style={styles.panelProject}>{props.panelName}</Text>
      <Text style={styles.status}>{props.status}</Text>
      {/* <Text style={styles.status}>{getIdMonitoring ? status: 'No Data'}</Text> */}
    </View>
  );
};
export default PanelProjectList;

const styles = StyleSheet.create({
  panelProject: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: BiruKu,
    textAlignVertical: 'center',
    paddingLeft: 8,
    marginRight: -1,
    borderWidth: 1,
    borderColor: BiruKu,
    height: 28,
    width: width*0.365
    // width: 140,
  },
  status: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: BiruKu,
    height: 28,
    width: width*0.2
    // width: 80,
  },
});
