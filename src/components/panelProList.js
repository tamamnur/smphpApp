import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../utils/constant';
import { names, status } from '../utils/fontStyles';

const PanelProList = props => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 7, marginBottom: -1}}>
      <View style={{width: '28%', borderWidth: 1, borderColor: BiruKu}}>
        <TouchableOpacity onPress={()=> navigation.navigate(
          'ProjectStatus', {id: props.idProject})}>
          <Text style={names}>{props.projectName}</Text>
        </TouchableOpacity>
      </View>  
      <View style={{width: '32%', borderWidth: 1, borderColor:BiruKu,marginLeft:-.5}}>
        <TouchableOpacity onPress={() => navigation.navigate(
          'PanelStatus', {monitoringId: props.monitoringId,
          panelName: props.panelName, projectName: props.projectName})}>
          <Text style={names}>{props.panelName}</Text>
        </TouchableOpacity>  
      </View>
      <Text style={[status, {width: '20%', marginHorizontal:-1}]}>{props.start}</Text>
      <Text style={[status, {width: '21%'}]}>{props.end}</Text>
    </View>
  );
};
export default PanelProList;