import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { BiruKu } from '../utils/constant';
import { area, pickerItem } from '../utils/fontStyles';

const StagesFAB = (props) => {
  const [stages, setStages] = useState();
  return (
    <View style={area}>
      <Picker style={styles.picked}
        mode='dropdown'
        selectedValue={stages} 
        onValueChange={(label, index)=>{
          setStages(label)
          props.onValueChange(label)
          }}>
            <Picker.Item style={pickerItem} label="Select a Proccess" />
            <Picker.Item style={pickerItem} label="Layouting" value ="Layouting" />
            <Picker.Item style={pickerItem} label="Mechanic" value ="Mech" />
            <Picker.Item style={pickerItem} label="Wiring" value ="Wiring" />
      </Picker>
    </View>
  )
}
export default StagesFAB
const styles = StyleSheet.create({
  area: {
    backgroundColor: '#EDEDED',
    borderRadius: 5, borderWidth: 1, borderColor: BiruKu,
    marginVertical: 1, marginLeft: 5, marginRight: -5,
    elevation: 1, height: 33 },
  picked: {marginTop: -10,marginLeft: -8},
  pickerItem: {fontSize: 14,fontFamily: 'Poppins-Medium',color: BiruKu},
})