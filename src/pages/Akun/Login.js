import { View, ScrollView, Text, StatusBar, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { LogoCubicle } from '../../assets'
import InputData from '../../components/InputData'
import Button from '../../components/Button'
import SignMenu from '../../components/SignMenu'
import { BiruKu, WarnaPutih } from '../../utils/constant'
// import { AuthContext } from '../../Config/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

const Login = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('drafter@mail.com');
  const [password,setPassword] = useState('drafter');

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
      alert("Sorry, Email address didn't work, please try again", error);
      }
      else {
      alert("Sorry, Password authentication didn't work, please try again", error);
    // } if (error.code === 'Given-String-is-empty-or-null') {
    } if (!valid) {
      alert('Please field email and password correctly', error)
    }
    console.log(error)})
}

const toastLoginSuccess = () => {
  ToastAndroid.show(
    "Login Success !", 
    ToastAndroid.SHORT);
  }
  

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF', width: 400}}>
      <StatusBar backgroundColor={WarnaPutih} barStyle="dark" />
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100, marginBottom: 20}}>
        <LogoCubicle/>
      </View>
      
        <InputData 
          placeholder='Username' 
          value={email}
          onChangeText={text => setEmail(text)}
          />
        <InputData 
          placeholder='Password'
          value={password}
          onChangeText={text=> setPassword(text)}
          secureTextEntry/>

        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.forgotPs}> Forgot Password ?</Text>
        </TouchableOpacity>
      <Button text="Sign In" color={BiruKu} 
          onPress={handleLogin} 
          // onPress={toastLoginSuccess}
          // onPress={()=> {handleLogin} ({toastLoginSuccses}) }
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
  // wrapperSign:{ marginHorizontal: 60, marginTop: 10,},
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