
import { Text, ScrollView, StyleSheet, View, Image, ToastAndroid } from 'react-native'
import React, { useState, useEffect, Component, useContext } from 'react'
import { IconBack, LogoForSignUp, LogoSmpHP } from '../../assets'
import Button from '../../components/Button'
import { BiruKu } from '../../utils/constant'
import { Picker } from '@react-native-picker/picker' 
import CheckBox, { CheckBoxComponent }  from '@react-native-community/checkbox'
import InputData from '../../components/InputData'
import Division from '../../components/Division'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from './AuthProvider'

const Signup = (props) => {
    const navigation = useNavigation();
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    
    const [division, setDivision] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onNameChange = (value) => {
        setName(value)
    }

    const onEmailChange = (value) => {
        setEmail(value)
    }
    const onPasswordChange = (value) => {
        setPassword(value)
    }

    const onDivisionChange = (value) => {
        setDivision(value)
    }

    const handleSignup = () => {
        auth() 
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                navigation.replace('SecuredNav');
                ToastAndroid.show('User account created & signed in!', ToastAndroid.SHORT)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!', error);
                }
                if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
                }
                console.error(error);
            });
        }

    return (
      <ScrollView >
        <View style={{flexDirection: 'row', marginVertical: 30, marginHorizontal: 30}}>
            <IconBack onPress={()=> navigation.navigate('Login')}/>
            <LogoSmpHP style={{marginLeft: 180 }}/>
        </View>

        <Text style={styles.title}>REGISTER </Text>
        <Text style={styles.subTitle}>Division </Text>
        <Division onValueChange={onDivisionChange}/>
            <InputData label="Fullname" onChangeText={onNameChange}/>
            <InputData label="Username" onChangeText={onEmailChange}/>
            <InputData label="Password" onChangeText={onPasswordChange} secureTextEntry={true}/>

        <View style={styles.checkBox}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
        <Text style={styles.Term}> I agree to all the Terms and Privacy Policy </Text>
        </View>
    
         <Button 
            text="Create Account" 
            color={BiruKu}
            onPress = {handleSignup}
        />
       </ScrollView>
    )}

export default Signup;

const styles = StyleSheet.create({
    title:{
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 20,
        color: BiruKu,
        marginHorizontal: 35,
        marginVertical: 0
    },
    subTitle:{
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: BiruKu,
        marginStart: 50,
        marginTop: 10    
    },
    area:{
        backgroundColor: '#EDEDED', 
        borderRadius:5,
        borderWidth: 1.5,
        borderColor: BiruKu,
        marginHorizontal: 48,
        marginTop: 5,
        marginBottom: 20, 
        elevation: 9,
        height: 45,
        fontSize: 13,
        justifyContent: 'center'
    },
    pickStyl:{
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    },
    checkBox:{
        marginHorizontal: 45,
        marginTop: 10,
        flexDirection:'row'
    },
    Term:{
        color: BiruKu,
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 5

    }
})