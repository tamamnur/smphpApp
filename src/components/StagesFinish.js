import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { BiruKu } from '../utils/constant';

const StagesFinish = (props) => {
  const [stages, setStages] = useState("Select an option");
  const handleValueChange = (label) => {
    setStages(label);
    if(props.onValueChange) {
      props.onValueChange(label)
    }
  }
  return (
    <View style={styles.area}>
      <Picker style={styles.picked}
        mode='dropdown'
        selectedValue={stages} 
        onValueChange={handleValueChange}>
            <Picker.Item style={styles.pickerItem} label="Select an option" value={null} />
            <Picker.Item style={styles.pickerItem} label="Tested" value ="Tested" />
            <Picker.Item style={styles.pickerItem} label="Sent" value ="Sent" />
      </Picker>
    </View>
  )
}

export default StagesFinish

const styles = StyleSheet.create({
    area:{
      backgroundColor: '#EDEDED', 
      borderRadius:5,
      borderWidth: 1,
      borderColor: BiruKu,
      marginVertical: 1,
      marginLeft: 5, 
      marginRight: -5, 
      elevation: 1,
      height: 33,
    },
    picked:{
      marginTop:-10,
        marginLeft: -8
    },
    pickerItem:{
      fontSize: 14,
      fontFamily: 'Poppins-Medium',
      color: BiruKu
    },
})