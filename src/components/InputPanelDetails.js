import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useNavigation} from 'react'
import InputDataProject from './InputDataProject'
import PickedDateShort from './pickedDateShort'
import { BiruKu } from '../utils/constant'

const InputPanelDetails = (props) => {
    return (
        <View style={styles.wrapper}>
            <View >
                <TextInput 
                    placeholder='Nomor'
                    style={styles.nomor}
                    />
            </View>
            <View style={styles.name}>
                <TextInput 
                    placeholder='Panel Name'
                    />
            </View>
            <View>
                <TextInput 
                    placeholder='Qty'
                    style={styles.qty}
                />
            </View>
            <View style={{alignContent: 'center'}}>
                <Text
                placeholder= 'Date'
                style={styles.dueDate}
                >
                <PickedDateShort />
                </Text>
            </View> 
        </View>
    )
}

    export default InputPanelDetails
    
    const styles = StyleSheet.create({
        wrapper:{flexDirection: 'row'},
        nomor:{borderWidth:1, borderColor: BiruKu, width: 26, textAlign: 'center', height: 40},
        name: {borderWidth:1, borderColor: BiruKu, width: 185, textAlign: 'left', paddingHorizontal: 5, height: 40},
        qty: {borderWidth:1, borderColor: BiruKu, width: 35, textAlign: 'center', height: 40},
        dueDate: {borderWidth:1, borderColor: BiruKu, width: 105, paddingHorizontal: 10, height: 40, paddingVertical: 10},
    })