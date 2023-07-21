import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { BiruKu } from '../utils/constant';

const StagesFAB = (props) => {
  const [stages, setStages] = useState();
  return (
    <View style={styles.area}>
      <Picker style={styles.picked}
        mode='dropdown'
        selectedValue={stages} 
        onValueChange={(label, index)=>{
          setStages(label)
          props.onValueChange(label)
          }}>
            <Picker.Item style={styles.pickerItem} label="Select an option" />
            <Picker.Item style={styles.pickerItem} label="Layouting" value ="Layouting" />
            <Picker.Item style={styles.pickerItem} label="Mechanic" value ="Mechanic" />
            <Picker.Item style={styles.pickerItem} label="Wiring" value ="Wiring" />
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