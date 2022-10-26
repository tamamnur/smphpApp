import { StyleSheet, Text, View, Image } from 'react-native'
import React,{ Component }from 'react'
import { LogoForSignUp } from '../../assets'
import { BiruKu } from '../../utils/constant'
import InputData from '../../components/TextInput'
import Button from '../../components/Button'

export default class ResetPassword extends Component {
    render(){
        return(
            <View style={styles.pages}>
                <View style={{alignItems: 'flex-end', marginTop: 55, marginEnd: 40}}>
                    <Image source ={LogoForSignUp} /></View>                            
                <Text style={styles.title}>
                    RESET PASSWORD
                </Text>
                <InputData label="Fullname" />
                <InputData label="Username" />
                <InputData label="New Password"/>
                <InputData label="Confirm New Password"/>
                <Button text='Reset Password' color={BiruKu}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages:{
    },
    title:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: BiruKu,
        marginLeft: 35,
        marginVertical: 20
    },

})