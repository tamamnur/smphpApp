import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React,{ Component }from 'react'
import { LogoSmpHP, IconBack } from '../../assets'
import { BiruKu } from '../../utils/constant'
import InputData from '../../components/InputData'
import Button from '../../components/Button'

export default class ResetPassword extends Component {
    render(){
        return(
            <ScrollView >
                <View style={{flexDirection: 'row', marginHorizontal: 20, marginVertical: 30}}>
                    <IconBack onPress={()=> this.props.navigation.navigate('Akun')}/>
                    <LogoSmpHP style={{marginLeft: 200 }}/>
                </View>
                <Text style={styles.title}>RESET PASSWORD</Text>
                
                <InputData label="Fullname" />
                <InputData label="Username" />
                <InputData label="New Password"/>
                <InputData label="Confirm New Password"/>
                <Button text='Reset Password' color={BiruKu}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: BiruKu,
        marginLeft: 35,
        marginVertical: 20
    },

})