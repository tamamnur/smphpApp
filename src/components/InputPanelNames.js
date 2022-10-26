import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState, useNavigation} from 'react'
import InputDataProject from './InputDataProject'
import { IconAdd } from '../assets'
import InputPanelDetails from './InputPanelDetails'
import { BiruKu } from '../utils/constant'

const InputPanelNames = (props) => {
    const [formQty, setFormQty] = useState(1);
    const forms = [...new Array(formQty)];
    
    return (
        <View style={styles.wrapper}>
            {
            forms.map((item, index) => {
                return (
                <View>
                    <InputPanelDetails key={index.toString()} />
                </View> 
                )
                })
            }
            <TouchableOpacity style={styles.iconAdd}>
                <IconAdd onPress={() => setFormQty((prev) => prev + 1)}/>
            </TouchableOpacity>
            
        </View>
    )
    }

    export default InputPanelNames
    
    const styles = StyleSheet.create({
        iconAdd:{marginTop: 8},
    })