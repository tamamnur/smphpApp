import { View, ScrollView, Text, StatusBar, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { LogoCubicle } from '../../assets'
import InputData from '../../components/InputData'
import Button from '../../components/Button'
import SignMenu from '../../components/SignMenu'
import { BiruKu, WarnaPutih } from '../../utils/constant'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

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

const Login = (props) => {
  const navigation = useNavigation();
  // const [email, setEmail] = useState('drafter@mail.com');
  // const [password,setPassword] = useState('drafter');

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('');
  const {email, password} = userInfo;
  const handleOnchangeText = (value, fieldName) => {
    setUserInfo ({...userInfo, [fieldName]: value})
  } 

  const isValidForm = () => {
    if(!isValidObjField(userInfo)) return updateError('Required all fields!', setError)
    if(!email.trim() || email.length < 3 ) return updateError ('Invalid email or username', setError)
    if(!isValidEmail(email)) return updateError('Invalid email or username', setError)    
    if(!password.trim() || password.length < 5 ) return updateError ('Password is too short', setError)
    return true;
  }
  const submitForm =()=> {
    { isValidForm() ? handleLogin() : error} 
  }

const handleLogin = () => {
  auth()
  .signInWithEmailAndPassword(email, password )
  .then(userCredentials => {
    const user = userCredentials.user;
    console.log('Login Success', user);
    navigation.replace('SecuredNav')
    toastLoginSuccess()
  })
  .catch(error => {
    if (error.code === 'auth/user-not-found') {
      return updateError ("Sorry, Email address didn't work, please try again", setError)      
      } else {
      return updateError ("Sorry, Password authentication didn't work, please try again", setError);
    } 
    })
}

const toastLoginSuccess = () => {
  ToastAndroid.show(
    "Login Success !", 
    ToastAndroid.LONG);
  }
  
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF', width: 400}}>
      <StatusBar backgroundColor={WarnaPutih} barStyle="dark" />
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100, marginBottom: 20}}>
        <LogoCubicle/>
      </View>
          {error ? (
              <Text style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
                {error} </Text> 
          ) : null}
        <InputData 
          placeholder='Username' 
          onChangeText={(value) => handleOnchangeText(value, "email")}
          />
        <InputData 
          placeholder='Password'
          onChangeText={(value) => handleOnchangeText(value, "password")}
          secureTextEntry/>

        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.forgotPs}> Forgot Password ?</Text>
        </TouchableOpacity>
      <Button text="Sign In" color={BiruKu} 
          onPress={submitForm} 
        />
      <View style={styles.wrapperSign}>
      </View>
        <TouchableOpacity style={styles.signUpTO}
        onPress={()=>navigation.navigate('Signup')}
        >
          <Text style={styles.signUp}>Sign Up
            </Text></TouchableOpacity>
    </ScrollView>

    );
}

export default Login;

 const styles = StyleSheet.create({
  forgotPs:{
    fontSize: 14, fontFamily: 'Poppins-Regular', color: BiruKu, 
    marginHorizontal: 60, marginTop: 5, marginBottom: -10,
    textAlign: 'right'},
  signUpTO:{
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: BiruKu,
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: 55,
    paddingHorizontal: 10,
    paddingVertical: 14,
    elevation: 10,
    borderRadius: 10
  },
  signUp:{
    color:BiruKu, textAlign:'center', fontWeight: 'bold', fontSize: 18
  }
})