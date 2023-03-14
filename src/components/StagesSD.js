import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { BiruKu } from '../utils/constant';

const StagesSD = (props) => {
    const [stages, setStages] = useState();

  return (
    <View style={styles.area}>
      <Picker style={styles.picked}
        selectedValue={stages} 
        onValueChange={(label, index)=>{
          setStages(label)
          props.onValueChange(label)
          }}>
            <Picker.Item label="Select an option" />
            <Picker.Item label="Submission" value ="Submission" />
            <Picker.Item label="Revision" value ="Revision" />
            <Picker.Item label="Approval" value ="Approval" />
      </Picker>
    </View>
  )
}

export default StagesSD

const styles = StyleSheet.create({
    area:{
        backgroundColor: '#EDEDED', 
        borderRadius:5,
        borderWidth: 1,
        borderColor: BiruKu,
        marginTop: 5,
        marginBottom: 5, 
        elevation: 1,
        height: 40,
        fontSize: 11,
      },
      picked:{
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
        marginTop:-10
    }
})