import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { BiruKu } from '../utils/constant';

const StagesPODetail = (props) => {
    const [stagesPODetail, setStagesPODetail] = useState();

  return (
    <View style={styles.area}>
      <Picker style={styles.picked}
        mode='dropdown'
        itemStyle={{transform: [{ scaleX: .5 }, { scaleY: .1 }]}}
        selectedValue={stagesPODetail} 
        onValueChange={(label, index)=>{
          setStagesPODetail(label)
          props.onValueChange(label)
          }}>
            <Picker.Item style={styles.pickerItem} label="Select an option" />
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