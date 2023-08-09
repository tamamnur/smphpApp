import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { BiruKu } from '../utils/constant';

const StagesPODetail = (props) => {
    const [stagesPODetail, setStagesPODetail] = useState('');
    const handleValueChange = (label) => {
      setStagesPODetail(label);
      if (props.onValueChange) {
        props.onValueChange(label);
      }
    }

  return (
    <View style={styles.area}>
      <Picker 
        style={styles.picked}
        mode='dropdown'
        selectedValue={stagesPODetail} 
        onValueChange={handleValueChange}
        >
        {/* onValueChange={(label)=>{setStagesPODetail(label)
          props.onValueChange(label)
        }} */}
            <Picker.Item style={styles.pickerItem} label="Select an option" value={null}/>
            <Picker.Item style={styles.pickerItem} label="Purchase Order" value ="Order" />
            <Picker.Item style={styles.pickerItem} label="Schedule" value ="Schedule" />
            <Picker.Item style={styles.pickerItem} label="Realization" value ="Realized" />
      </Picker>
    </View>
  )
}

export default StagesPODetail

const styles = StyleSheet.create({
    area:{
        backgroundColor: '#EDEDED', 
        borderRadius:5,
        borderWidth: 1,
        borderColor: BiruKu,
        marginVertical: 1,
        marginLeft: 5,
        marginRight:-5,
        elevation: 1,
        height: 33,
      },
      picked:{
        marginTop:-10,
        marginLeft:-8
    },
    pickerItem:{
      fontSize:14,
      fontFamily:'Poppins-Medium',
      color: BiruKu
    }
})