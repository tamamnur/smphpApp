import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {BiruKu} from '../utils/constant';

const StagesPODetail = props => {
  const [stagesPODetail, setStagesPODetail] = useState('');
  const handleValueChange = label => {
    setStagesPODetail(label);
    if (props.onValueChange) {
      props.onValueChange(label);
    }
  };

  return (
    <View style={styles.area}>
      <Picker
        style={{marginTop: -12,marginLeft: -9}}
        mode="dropdown"
        selectedValue={stagesPODetail}
        onValueChange={handleValueChange}>
        <Picker.Item style={styles.pickerItem} label="Select a Stages" value={null} />
        <Picker.Item style={styles.pickerItem} label="Purchase Order" value="Order" />
        <Picker.Item style={styles.pickerItem} label="Schedule" value="Schedule" />
        <Picker.Item style={styles.pickerItem} label="Realization" value="Realized" />
      </Picker>
    </View>
  );
};

export default StagesPODetail;

const styles = StyleSheet.create({
  area: {
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BiruKu,
    marginVertical: 1,
    marginLeft: 5,
    marginRight: -5,
    height: 33,
  },
  pickerItem: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: BiruKu,
  },
});