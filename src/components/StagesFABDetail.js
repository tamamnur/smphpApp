import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {BiruKu} from '../utils/constant';
import { area, pickerItem } from '../utils/fontStyles';

const StagesFABDetail = props => {
  const [stagesFABDetail, setStagesFABDetail] = useState('');
  const handleValueChange = (label) => {
    setStagesFABDetail(label);
    if (props.onValueChange) {
      props.onValueChange(label);
    }
  }
  return (
    <View style={area}>
      <Picker
        style={styles.picked}
        mode="dropdown"
        selectedValue={stagesFABDetail}
        onValueChange={handleValueChange}>
        <Picker.Item style={pickerItem} label="Select an option" />
        <Picker.Item style={pickerItem} label="Start" value="Start" />
        <Picker.Item style={pickerItem} label="Finish" value="Finish" />
      </Picker>
    </View>
  );
};

export default StagesFABDetail;

const styles = StyleSheet.create({
  area: {
    backgroundColor: '#EDEDED', borderRadius: 5,
    borderWidth: 1, borderColor: BiruKu,
    marginVertical: 1, marginLeft: 5,marginRight: -5,
    elevation: 1, height: 33},
  picked: {marginTop: -10,marginLeft: -8},
  pickerItem: {fontSize: 17,fontFamily: 'Poppins-Medium',color: BiruKu},
});