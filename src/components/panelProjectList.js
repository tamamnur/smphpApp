import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../utils/constant';

const PanelProjectList = props => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 7, marginBottom: -1}}>
      <View style={{width: '30%', borderWidth: 1, borderColor: BiruKu}}>
        <TouchableOpacity onPress={()=> navigation.navigate(
          'ProjectStatus', {id: props.idProject})}>
          <Text style={styles.names}>{props.projectName}</Text>
        </TouchableOpacity>
      </View>  
      <View style={{width: '40%', borderWidth: 1, borderColor: BiruKu, marginLeft: -1}}>
        <TouchableOpacity onPress={() => navigation.navigate(
          'PanelStatus', {monitoringId: props.monitoringId,
          panelName: props.panelName, projectName: props.projectName})}>
          <Text style={styles.names}>{props.panelName}</Text>
        </TouchableOpacity>  
      </View>
      <Text style={styles.status}>{props.status}</Text>
    </View>
  );
};
export default PanelProjectList;

const styles = StyleSheet.create({
  names: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: BiruKu,
    textAlignVertical: 'center',
    paddingLeft: 8,
    marginRight: -1,
    height: 28,
  },
  status: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: BiruKu,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: BiruKu,
    height: 30,
    width: '30%'
  },
});