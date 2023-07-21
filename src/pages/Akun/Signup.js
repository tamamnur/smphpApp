
import { Text, ScrollView, StyleSheet, View, Image, ToastAndroid } from 'react-native'
import React, { useState, useEffect, Component, useContext } from 'react'
import { IconBack, LogoForSignUp, LogoSmpHP } from '../../assets'
import Button from '../../components/Button'
import { BiruKu } from '../../utils/constant'
import InputData from '../../components/InputData'
import Division from '../../components/Division'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const isValidObjField = (obj) => {
    return Object.values(obj).every(value => value.trim())
  } 
  
  const updateError = (error, stateUpdate) => {
    stateUpdate(error)
    setTimeout(() => {
      stateUpdate('')
    }, 3000) 
  }
  
  const isValidEmail = (value) => {
    const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    return regx.test(value)
  }

const Signup = (props) => {
    const navigation = useNavigation();
    const [regisInfo, setRegisInfo] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        division: '',
      })
    
      const [error, setError] = useState('');
      const { division, displayName, email, password, confirmPassword} = regisInfo;
      const handleOnchangeText = (value, fieldName) => {
        setRegisInfo (prevState => ({
            ...prevState, [fieldName]: value
        }))
      } 
    
      const isValidForm = () => {
        if(!isValidObjField(regisInfo)) return updateError('Required all fields!', setError)
        if(!displayName.trim() || displayName.length < 4 ) return updateError ('Invalid fullname', setError)
        if(!isValidEmail(email)) return updateError('Invalid email', setError)    
        if(!email.trim() || email.length < 4 ) return updateError ('Invalid email', setError)
        if(!password.trim() || password.length < 6 ) return updateError ('Password is too short', setError)
        if(password !== confirmPassword ) return updateError ('Password confirmation does not match', setError)
        return true;
      }
      const submitForm =()=> {
        console.log(regisInfo)
        { isValidForm() ? handleSignup() : error} 
      }    

    const handleSignup = () => {
        auth() 
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                user.updateProfile({
                    displayName: displayName,
                    division: division
                })
                return firestore().collection('User').doc(user.uid).set({
                    division: regisInfo.division
                })
            })
            .then(() => {
                navigation.replace('SecuredNav');
                ToastAndroid.show('User account created & signed in!', ToastAndroid.TOP)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    return updateError ("That's email address is already in use", setError)
                }
                if (error.code === 'auth/invalid-email') {
                    return updateError ("That's email address is invalid")
                }
                console.error(error);
            });
        }

    return (
      <ScrollView >
        <View style={{flexDirection: 'row', marginVertical: 30, marginHorizontal: 30}}>
            <LogoSmpHP style={{marginLeft: 180 }}/>
        </View>

        <Text style={styles.title}>REGISTER </Text>
            
        <Text style={styles.subTitle}>Division </Text>
            <Division onValueChange={(value) => handleOnchangeText (value, 'division')}/>
            <InputData label="Fullname" onChangeText={(value) => handleOnchangeText(value, "displayName")}/>
            <InputData label="Email" onChangeText={(value) => handleOnchangeText(value, "email")}/>
            <InputData label="Password" secureTextEntry onChangeText={(value) => handleOnchangeText(value, "password")}/>
            <InputData label="Confirm Password" secureTextEntry onChangeText={(value) => handleOnchangeText(value, "confirmPassword")}/> 
         <Button  text="Create Account"  color={BiruKu} onPress={submitForm} />
        {error ? (
            <Text style={{color: 'red', fontSize: 14, textAlign: 'center', marginTop: 20}}>
            {error} 
            </Text> 
        ) : null}
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