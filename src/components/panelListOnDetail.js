import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BiruKu} from '../utils/constant';

const PanelListOnDetail = props => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 20}}>
      <Text style={[styles.panelTxt,{width:30, textAlign:'center'}]}>{props.pnomor}</Text>
      <TouchableOpacity style={{width: '90%'}} 
        onPress={()=> navigation.navigate('PanelStatus', {
          monitoringId: props.monitoringId ? props.monitoringId : null,
          projectName: props.projectName,
          pname: props.pname
          })}>
        <Text style={[styles.panelTxt, {paddingLeft: 6}]}>{props.pname}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PanelListOnDetail;

const styles = StyleSheet.create({
  panelTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    paddingTop: 2,
    marginVertical: 2,
    marginRight:-1,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
  },
});