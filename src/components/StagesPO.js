import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {BiruKu} from '../utils/constant';
import { area, pickerItem } from '../utils/fontStyles';

const StagesPO = props => {
  const [stages, setStages] = useState('');
  return (
    <View style={area}>
      <Picker
        style={{marginTop: -12,marginLeft: -9}}
        mode="dropdown"
        selectedValue={stages}
        onValueChange={(label, index) => {
          setStages(label);
          props.onValueChange(label);
        }}>
        <Picker.Item style={pickerItem} label="Select a Material" />
        <Picker.Item style={pickerItem} label="Construction" value="Construction" />
        <Picker.Item style={pickerItem} label="Busbar Cu" value="Busbar" />
        <Picker.Item style={pickerItem} label="Component" value="Component" />
      </Picker>
    </View>
  );
};
export default StagesPO;
// const styles = StyleSheet.create({
//   area: {
//     backgroundColor: '#EDEDED',
//     borderRadius: 5, borderWidth: 1, borderColor: BiruKu,
//     marginVertical: 1, marginLeft: 5, marginRight: -5,
//     elevation: 1, height: 33 },
//   pickerItem: {fontSize: 16,fontFamily: 'Poppins-Medium',color: BiruKu},
// });