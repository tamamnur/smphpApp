import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { BiruKu } from '../utils/constant';

const StagesSD = (props) => {
    const [stages, setStages] = useState("Select an option");

  return (
    <View style={styles.area}>
      <Picker style={styles.picked}
        mode='dropdown'
        itemStyle={{transform: [{ scaleX: .5 }, { scaleY: .1 }]}}
        selectedValue={stages} 
        onValueChange={(label)=>{
          setStages(label)
          props.onValueChange(label)
          }}>
            <Picker.Item style={styles.pickerItem0} label="Select an option" />
            <Picker.Item style={styles.pickerItem} label="Submit" value ="Submit" />
            <Picker.Item style={styles.pickerItem} label="Submit Revision" value ="Resubmit" />
      </Picker>
    </View>
  )
}

export default StagesSD

const styles = StyleSheet.create({
    area:{
        // backgroundColor: '#EDEDED', 
        borderRadius:5,
        borderWidth: 1,
        borderColor: BiruKu,
        marginVertical: 1,
        marginLeft: 5, 
        marginRight: -5, 
        height: 33,
        // fontSize: 13,
      },
      picked:{
        // fontSize: 13,
        // fontFamily: 'Poppins-Medium',
        marginTop:-13,
        marginLeft: -9
    },
    pickerItem:{
      fontSize: 17,
      // fontFamily: 'Poppins-Medium',
      color: BiruKu
    },
    pickerItem0:{
      // fontSize: 15,
      fontFamily: 'Poppins-Italic',
      color: BiruKu
    }
})