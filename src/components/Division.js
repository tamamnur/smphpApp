import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { BiruKu } from '../utils/constant';

const Division = (props) => {
    const [division, setDivision] = useState();

  return (
    <View style={styles.area}>
      <Picker style={styles.picked}
        selectedValue={division} 
        onValueChange={(label, index)=>{
          setDivision(label)
          props.onValueChange(label)
          }}>
            <Picker.Item label="---" value ="" />
            <Picker.Item label="Admin" value ="admin" />
            <Picker.Item label="Drafter" value ="drafter" />
            <Picker.Item label="Logistics" value ="logistik" />
            <Picker.Item label="Production" value ="produksi" />
            <Picker.Item label="Sales" value ="sales" />
            <Picker.Item label="Direktur" value ="direktur" />
      </Picker>
    </View>
  )
}

export default Division

const styles = StyleSheet.create({
    area:{
        backgroundColor: '#EDEDED', 
        borderRadius:5,
        borderWidth: 1,
        borderColor: BiruKu,
        marginHorizontal: 48,
        marginTop: 5,
        marginBottom: 5, 
        elevation: 1,
        height: 40,
        fontSize: 13,
        justifyContent: 'center'
    },
    picked:{
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    }
})