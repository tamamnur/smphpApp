import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {BiruKu} from '../utils/constant';

const StagesFABDetail = props => {
  const [stagesFABDetail, setStagesFABDetail] = useState('Select an option');

  return (
    <View style={styles.area}>
      <Picker
        style={styles.picked}
        mode="dropdown"
        // itemStyle={{transform: [{ scaleX: 20 }, { scaleY: 50 }]}}
        selectedValue={stagesFABDetail}
        onValueChange={(label, index) => {
          setStagesFABDetail(label);
          props.onValueChange(label);
        }}>
        {/* <Picker.Item style={styles.pickerItem} label="Select an option" /> */}
        <Picker.Item style={styles.pickerItem} label="Start" value="Start" />
        <Picker.Item style={styles.pickerItem} label="Finish" value="Finish" />
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
  pickerItem: {fontSize: 14,fontFamily: 'Poppins-Medium',color: BiruKu},
});