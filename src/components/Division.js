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
        onValueChange={(label, value)=>{
          setDivision(label)
          props.onValueChange(label)
          }}>
            <Picker.Item label="---" />
            <Picker.Item label="Admin" value ="Admin" />
            <Picker.Item label="Drafter" value ="Drafter" />
            <Picker.Item label="Logistics" value ="Logistik" />
            <Picker.Item label="Production" value ="Produksi" />
            <Picker.Item label="Sales" value ="Sales" />
            <Picker.Item label="Direktur" value ="Direktur" />
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